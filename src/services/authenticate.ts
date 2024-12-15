export type AuthType = {
  username: string;
  password: string;
};

export const login = async ({ username, password }: AuthType) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Permet d'envoyer et de recevoir des cookies
      }
    );
    // Si l'authentification réussit, on ne fait rien de spécial ici
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Permet d'envoyer et de recevoir des cookies
      }
    );

    window.location.href = "/";

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Logout failed");
    }
  } catch (error) {
    throw error; // Propager l'erreur pour qu'elle soit capturée dans le thunk
  }
};


export const register = async ({ username, password }: AuthType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Permet d'envoyer et de recevoir des cookies
      }
    );

    window.location.href = "/";

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Logout failed");
    }
  } catch (error) {
    throw error; // Propager l'erreur pour qu'elle soit capturée dans le thunk
  }
}