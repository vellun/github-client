import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Input } from 'components/Input';
import { Text } from "components/Text";
import styles from "./RegisterPage.module.scss";
import { Button } from 'components/Button';
import { rootStore } from 'store/RootStore';
import { useNavigate } from 'react-router';

export const RegisterPage = observer(() => {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FFFFF", email, login, password)
    rootStore.auth.register(email, login, password);
    // if (rootStore.auth.user) {
    //   navigate('/');
    // }
  };

  return (
    <div className={styles.register}>
      <Text className={styles.root__title} tag="h1" weight="bold" color="primary">
        Sign up to Github Client
      </Text>
      <form onSubmit={handleSubmit} className={styles.register__form}>
        <Input onChange={(value) => setEmail(value)} placeholder="Email" />
        <Input onChange={(value) => setLogin(value)} placeholder="Login" />
        <Input onChange={(value) => setPassword(value)} placeholder="Password" type="password" />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
});

