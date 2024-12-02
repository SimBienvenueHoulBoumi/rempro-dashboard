import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

/**
 * @interface DecodedToken
 * @property {string} sub - Subject (identifiant de l'utilisateur).
 * @property {number} iat - Date de création du token (timestamp).
 * @property {number} exp - Date d'expiration du token (timestamp).
 */
interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
}

/**
 * Middleware pour valider un token JWT.
 * Vérifie si le token est valide, non expiré et redirige en fonction de l'état d'authentification de l'utilisateur.
 *
 * @param {NextRequest} request - La requête entrante de Next.js.
 * @returns {NextResponse} Une réponse Next.js, soit une redirection, soit un passage à la prochaine étape.
 */
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const { pathname } = request.nextUrl;
  const loginPage = "/"; // Page de login

  // Vérifier si le token est présent dans les cookies
  if (!token || !token.value) {
    // Si pas de token, rediriger vers la page de login
    if (pathname === loginPage) {
      return NextResponse.next(); // Ne pas rediriger si déjà sur la page de login
    }

    return NextResponse.redirect(new URL(loginPage, request.url)); // Redirection vers la page de login
  }

  const token_value: string = token.value;

  try {
    const decoded: DecodedToken = jwtDecode(token_value);
    const currentTime = Math.floor(Date.now() / 1000);

    // Vérifier si le token a expiré
    if (decoded.exp < currentTime) {
      // Si le token est expiré, supprimer le cookie
      cookieStore.set("token", "", {
        path: "/",
        maxAge: -1, // Expirer le cookie
      });

      // Rediriger vers la page de login et recharger la page
      return NextResponse.redirect(new URL(loginPage, request.url));
    }

    // Si l'utilisateur est déjà connecté et essaie d'aller sur la page de login, rediriger vers /home
    if (pathname === loginPage) {
      // Rediriger et forcer le rechargement de la page
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next(); // Sinon, continuer avec la requête
  } catch (error) {
    console.error(
      "Erreur lors du décodage ou de la validation du token :",
      error
    );

    // En cas d'erreur de validation du token, rediriger vers la page de login
    if (pathname !== loginPage) {
      return NextResponse.redirect(new URL(loginPage, request.url)); // Rediriger vers la page de login
    }

    return NextResponse.next(); // Continuer si on est déjà sur la page de login
  }
}

/**
 * Configuration du middleware pour correspondre à des chemins spécifiques.
 * @type {{ matcher: string[] }}
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|sitemap.xml|robots.txt|favicon.ico).*)", // Exclure certaines routes de la validation
  ],
};
