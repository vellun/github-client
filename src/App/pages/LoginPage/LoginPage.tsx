import { Button } from "components/Button";
import { Text } from "components/Text";
import { auth } from "config/firebase";
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { observer } from "mobx-react-lite";
import { rootStore } from "store/RootStore";

export const LoginPage = observer(() => {
  const handleLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        rootStore.auth.login(token, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          avatarURL: user.photoURL
        });
      })
      .catch((error) => {
        console.error("Popup error:", error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        rootStore.auth.logout()
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <div>
      <Text>GitHub Authorization</Text>
      <Button onClick={handleLogin}>Log in</Button>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
});
