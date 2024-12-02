import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login as loginService,
  logout as logoutService,
  LoginType,
} from "@/services/authenticate";

/**
 * Représentation de l'état d'authentification.
 *
 * Cet état décrit si un utilisateur est connecté ou non et conserve également des informations
 * sur d'éventuelles erreurs rencontrées lors de l'authentification ou de la déconnexion.
 */
interface AuthState {
  /**
   * Indique si un utilisateur est actuellement connecté.
   * - `true` : L'utilisateur est connecté.
   * - `false` : L'utilisateur est déconnecté.
   */
  isAuthenticated: boolean;

  /**
   * Message d'erreur si un problème survient lors de la connexion ou de la déconnexion.
   * Par exemple : "Mot de passe incorrect" ou "Erreur réseau".
   */
  error: string | null;
}

/**
 * L'état initial du système d'authentification.
 *
 * - Par défaut, aucun utilisateur n'est connecté (`isAuthenticated` est `false`).
 * - Aucun message d'erreur n'est présent (`error` est `null`).
 */
const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
};

/**
 * Action pour connecter un utilisateur (processus de connexion).
 *
 * Cette action demande au système de vérifier les identifiants de l'utilisateur (par exemple, 
 * un nom d'utilisateur et un mot de passe) et de confirmer s'ils sont valides.
 *
 * @param {LoginType} param0 - Les informations fournies par l'utilisateur pour se connecter :
 *   - `username` : Le nom d'utilisateur de la personne.
 *   - `password` : Le mot de passe correspondant.
 *
 * @returns {Promise<boolean>} 
 *   - Retourne `true` si la connexion réussit.
 *   - En cas d'échec, retourne un message d'erreur expliquant pourquoi la connexion a échoué.
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }: LoginType, { rejectWithValue }) => {
    try {
      // Vérifie les identifiants de connexion en appelant un service externe.
      await loginService({ username, password });
      return true; // Connexion réussie.
    } catch (error: any) {
      // Retourne un message d'erreur si la connexion échoue.
      return rejectWithValue(error.message || "Une erreur inconnue est survenue");
    }
  }
);

/**
 * Action pour déconnecter un utilisateur (processus de déconnexion).
 *
 * Cette action permet à un utilisateur de quitter son compte en toute sécurité.
 * Cela supprime l'accès à ses informations personnelles et réinitialise son état de connexion.
 *
 * @returns {Promise<void>} 
 *   - Retourne `void` lorsque la déconnexion est réussie.
 *   - En cas d'échec, retourne un message d'erreur expliquant pourquoi la déconnexion a échoué.
 */
export const performLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Appelle un service pour gérer le processus de déconnexion.
      await logoutService();
    } catch (error: any) {
      // Retourne un message d'erreur si la déconnexion échoue.
      return rejectWithValue(error.message || "Une erreur inconnue est survenue");
    }
  }
);

/**
 * Gestionnaire de l'état d'authentification (appelé "slice").
 *
 * Ce gestionnaire organise les actions et règles permettant de gérer :
 * - La connexion d'un utilisateur.
 * - La déconnexion d'un utilisateur.
 * - La gestion des erreurs en cas de problème.
 *
 * Il contient également les informations sur l'état actuel d'un utilisateur
 * (par exemple, s'il est connecté ou déconnecté).
 */
const authSlice = createSlice({
  /**
   * Le nom de la "slice" (section) dans l'état global.
   */
  name: "auth",

  /**
   * L'état initial utilisé au démarrage de l'application.
   */
  initialState,

  /**
   * Actions de base (synchrones) qui modifient directement l'état.
   */
  reducers: {
    /**
     * Réinitialise manuellement l'état de déconnexion.
     *
     * Cela force le système à considérer l'utilisateur comme déconnecté,
     * par exemple en cas de déconnexion forcée ou après un échec.
     */
    resetLogout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  /**
   * Actions supplémentaires (asynchrones) utilisées pour gérer
   * les processus de connexion et déconnexion.
   */
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null; // Efface les erreurs avant de tenter une connexion.
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuthenticated = true; // Connexion réussie.
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false; // Connexion échouée.
        state.error = action.payload as string; // Sauvegarde le message d'erreur.
      })
      .addCase(performLogout.fulfilled, (state) => {
        state.isAuthenticated = false; // Déconnexion réussie.
        state.error = null; // Efface les éventuelles erreurs.
      })
      .addCase(performLogout.rejected, (state, action) => {
        state.error = action.payload as string; // Sauvegarde le message d'erreur.
      });
  },
});

/**
 * Action exportée pour réinitialiser manuellement l'état de déconnexion.
 */
export const { resetLogout } = authSlice.actions;

/**
 * Exportation par défaut du gestionnaire d'authentification.
 */
export default authSlice.reducer;
