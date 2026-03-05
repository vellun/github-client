import { auth } from "config/firebase";
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { rootStore } from "store/RootStore";

export default class AuthService {
  static async login() {
    const provider = new GithubAuthProvider();
    provider.addScope("repo");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const credential = GithubAuthProvider.credentialFromResult(result);

      let token = "";
      if (credential?.accessToken !== undefined) {
        token = credential?.accessToken;
      }

      rootStore.auth.login(token, {
        id: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        avatar: user.photoURL,
      });
    } catch (error) {
      console.error("Popup error:", error);
    }
  }

  static logout() {
    signOut(auth)
      .then(() => {
        rootStore.auth.logout();
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }
}
