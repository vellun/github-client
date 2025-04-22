import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Input } from 'components/Input';
import styles from "./LoginPage.module.scss";
import { rootStore } from 'store/RootStore';
import { Button } from 'components/Button';

export const LoginPage = observer(() => {
  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // });
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    rootStore.auth.login(login, password);
    // if (authStore.user) {
    //   history.push('/'); // Перенаправление на главную страницу после успешной регистрации
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
        <Input onChange={(value) => setLogin(value)} placeholder="Login" />
        <Input onChange={(value) => setPassword(value)} placeholder="Password" type="password" />
        <Button type="submit">Sign in</Button>
    </form>
  );
});
