import githubLogo from "assets/icons/github-logo.svg";
import cn from "classnames";
import { Button } from "components/Button";
import { Text } from "components/Text";
import { auth } from "config/firebase";
import { routesConfig } from "config/routes";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { rootStore } from "store/RootStore";
import styles from "./LoginPage.module.scss";

export const LoginPage = observer(() => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const provider = new GithubAuthProvider();
    provider.addScope("repo");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      await rootStore.auth.login(token, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        avatarURL: user.photoURL,
      });

      navigate(routesConfig.repositories.create());
    } catch (error) {
      console.error("Popup error:", error);
    }
  };

  return (
    <div className={cn("flex-container", styles.root)}>
      <div className={cn("flex-container", styles.root__form)}>
        <img src={githubLogo} alt="GitHub User Logo" width="47px" height="47px" />
        <Text className={styles.root__title} tag="h1" weight="bold" color="primary">
          GitHub Authorization
        </Text>
        <Button onClick={handleLogin}>Log in</Button>
      </div>
    </div>
  );
});
