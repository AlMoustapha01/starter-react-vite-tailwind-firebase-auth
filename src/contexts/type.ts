import { User, UserCredential } from "firebase/auth";

export interface IAuthProviderProps {
    children: JSX.Element;
}

export interface IAuthContext {
    currentUser: User | null | undefined;
    login: (email: string, password: string) => Promise<UserCredential>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    googleSignin: () => Promise<UserCredential>;
    githubSignin: () => Promise<UserCredential>;
    facebookSignin: () => Promise<UserCredential>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateEmail: (email: string) => Promise<void>;
    updatePhone: (phone: string) => Promise<void>;
    updateUserPassword: (password: string) => Promise<void>;
    reAuthenticate: (password: string) => Promise<UserCredential>;
    updateName: (name: string) => Promise<void>;
    deleteCount: () => Promise<void>;
    getCurrentUserToken: () => Promise<string | undefined>;
  }
  