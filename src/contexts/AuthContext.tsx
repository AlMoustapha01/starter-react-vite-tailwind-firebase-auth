import React, { useContext, useState, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
  verifyBeforeUpdateEmail,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
  updateProfile,
  deleteUser,
  RecaptchaVerifier,
  PhoneAuthProvider,
  getAuth,
  reauthenticateWithRedirect,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { useToast } from './ToastContext';
import { capitalizeWords } from '../utils/auth';
import { IAuthContext, IAuthProviderProps } from './type';

const AuthContext = React.createContext<IAuthContext>({
  currentUser: null,
  login: (email: string, password: string) => Promise.reject(),
  signup: (email: string, password: string, name: string) => Promise.reject(),
  googleSignin: () => Promise.reject(),
  githubSignin: () => Promise.reject(),
  facebookSignin: () => Promise.reject(),
  logout: () => Promise.reject(),
  resetPassword: (email: string) => Promise.reject(),
  updateEmail: (email: string) => Promise.reject(),
  updateName: (name: string) => Promise.reject(),
  updatePhone: (phone: string) => Promise.reject(),
  updateUserPassword: (password: string) => Promise.reject(),
  reAuthenticate: (password: string) => Promise.reject(),
  deleteCount: () => Promise.reject(),
  getCurrentUserToken: () => Promise.reject(),
});

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<any>();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  // Sign up a new user with email and password
  async function signup(email: string, password: string, name: string): Promise<any> {
    showToast({ severity: 'success', summary: 'Succès', detail: 'Veillez valider votre compte via votre boîte mail ' });
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        return updateInfo(value, name);
      })
      .then(() => {
        showToast({
          severity: 'success',
          summary: 'Succès',
          detail: 'Veillez valider votre compte via votre boîte mail ',
        });
      })
      .catch((error) => {
        console.error(error);

        showToast({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue' });
      });
  }
  // Login with Google
  async function googleSignin(): Promise<any> {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider).then(() => {
      window.location.href = '/dashbord';
    });
  }
  // Login with Facebook
  async function facebookSignin(): Promise<any> {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider).then(() => {
      window.location.href = '/dashbord';
    });
  }
  // Login with Github
  async function githubSignin(): Promise<any> {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider).then((user) => {
      //user.user here

      window.location.href = '/dashbord';
    });
  }
  // Login with email and password
  async function login(email: string, password: string): Promise<any> {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        showToast({ severity: 'success', summary: 'Succès', detail: 'Authentification reussie ' });
        window.location.href = '/dashbord';
      })
      .catch((error) => {
        console.error(error);

        showToast({ severity: 'error', summary: 'Erreur', detail: 'Identifiant incorrect ' });
      });
  }
  // Logout
  async function logout(): Promise<any> {
    return auth.signOut();
  }

  async function verifyProviderBeforeReauthentication(type: string, other?: string) {
    const existed_password_provider = currentUser.providerData.some((elt: any) => elt.providerId == 'password');
    if (existed_password_provider) {
      window.location.href = `/reauthenticate?operation=${type}${other}`;
    } else {
      const provider = currentUser.providerData[0];
      if (provider.providerId.includes('google')) {
        const credential = new GoogleAuthProvider();

        return reauthenticateWithRedirect(currentUser, credential);
      } else if (provider.providerId.includes('facebook')) {
        const credential = new FacebookAuthProvider();

        return reauthenticateWithRedirect(currentUser, credential);
      } else {
        const credential = new GithubAuthProvider();

        return reauthenticateWithRedirect(currentUser, credential);
      }
    }
  }
  async function reAuthenticate(password: string) {
    const credential = EmailAuthProvider.credential(currentUser.email, password);

    return reauthenticateWithCredential(currentUser, credential);
  }
  // Reset password
  async function resetPassword(email: string): Promise<any> {
    return auth.sendPasswordResetEmail(email, { url: 'http://localhost:5173/login' }).then(() => {
      showToast({ severity: 'success', summary: 'Succès', detail: 'Veillez verifier votre addresse' });
    });
  }
  // Update email
  async function updateEmail(email: string): Promise<any> {
    return verifyBeforeUpdateEmail(currentUser, email, { url: 'http://localhost:5173/dashbord/profile' })
      .then(() => {
        showToast({ severity: 'success', summary: 'Succès', detail: 'Veuillez valider votre addresse email' });
      })
      .catch((error) => {
        console.error(error);
        verifyProviderBeforeReauthentication('email', `&new_email=${email}`);
      });
  }

  async function updatePhone(phone: string) {
    try {
      const auth = getAuth();
      if (currentUser.phoneNumber !== phone) {
        const verifier = new RecaptchaVerifier(
          'recaptcha-container',
          {
            callback: (response: any) => console.log('callback', response),
            size: 'invisible',
          },
          auth,
        );
        const phoneProvider = new PhoneAuthProvider(auth);
        const id = await phoneProvider.verifyPhoneNumber(phone, verifier);
        const code = window.prompt('Saisissez le code envoyez par sms') || '';
        const cred = PhoneAuthProvider.credential(id, code);
        await currentUser.updatePhoneNumber(cred);
        console.log('phone number changed', id, cred, currentUser);
        showToast({ severity: 'success', summary: 'Succès', detail: 'Le téléphone a bien été modifié' });
      } else {
        showToast({ severity: 'error', summary: 'Erreur', detail: "Le téléphone n'a pas été modifié" });
      }
    } catch (e) {
      console.error(e);
      showToast({ severity: 'error', summary: 'Erreur', detail: "L'opération a échoué " });
    }
  }

  async function updateName(name: string): Promise<any> {
    return updateProfile(currentUser, {
      displayName: capitalizeWords(name),
    }).then(() => {
      showToast({ severity: 'success', summary: 'Succès', detail: 'Les Nom et prénoms ont bien été mis à jour ' });
    });
  }
  // Update profile
  async function updateInfo(user: firebase.default.auth.UserCredential, name: string): Promise<void | null> {
    if (user.user) {
      await user.user?.updateProfile({
        displayName: name,
      });
      await user.user.sendEmailVerification({ url: 'http://localhost:5173/dashbord' });
    } else {
      return null;
    }
  }
  // Update password
  async function updateUserPassword(password: string): Promise<any> {
    return updatePassword(currentUser, password)
      .then(() => {
        showToast({ severity: 'success', summary: 'Succès', detail: 'Opération reussie ' });
      })
      .catch((error) => {
        console.error(error);
        verifyProviderBeforeReauthentication('password');
      });
  }
  async function deleteCount() {
    return deleteUser(currentUser)
      .then(() => {
        showToast({ severity: 'success', summary: 'Succès', detail: 'Compte supprimé avec succès' });
        window.location.href = '/';
      })
      .catch((error) => {
        console.error(error);
        showToast({ severity: 'error', summary: 'Erreur', detail: "L'opération a échoué" });
        verifyProviderBeforeReauthentication('delete_count');
      });
  }

  async function getCurrentUserToken(): Promise<string | undefined> {
    return auth.currentUser?.getIdToken();
  }

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    googleSignin,
    githubSignin,
    facebookSignin,
    logout,
    resetPassword,
    updateEmail,
    updateUserPassword,
    reAuthenticate,
    updateName,
    updatePhone,
    deleteCount,
    getCurrentUserToken,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
