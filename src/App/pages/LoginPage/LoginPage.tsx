import { Button } from "components/Button";
import { Text } from "components/Text";
import { auth } from "config/firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { observer } from "mobx-react-lite";
import { rootStore } from "store/RootStore";
import styles from "./LoginPage.module.scss";
import { apiUrls } from "config/apiUrls";
import { useNavigate } from "react-router-dom";

export const LoginPage = observer(() => {
  const navigate = useNavigate();

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
          avatarURL: user.photoURL,
        });
      })
      .catch((error) => {
        console.error("Popup error:", error);
      });

    navigate(apiUrls.users.userByLogin(rootStore.auth.user.));
  };

  return (
    <div className={styles.root}>
      <Text>GitHub Authorization</Text>
      <Button onClick={handleLogin}>Log in</Button>
    </div>
  );
});
