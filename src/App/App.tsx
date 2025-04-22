import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserDetailPage } from "App/pages/UserDetailPage";
import { AllReposPage } from "App/pages/AllReposPage";
import { AllUsersPage } from "App/pages/AllUsersPage";
import { RepoDetailPage } from "App/pages/RepoDetailPage";
import { Layout } from "components/Layout";
import { routesConfig } from "config/routes";
import { useQueryParamsStoreInit } from "store/RootStore/hooks";
import { rootStore } from "store/RootStore/instance";
import "styles/_styles.scss";
import { UserReposPage } from "App/pages/UserReposPage";
import { LoginPage } from "App/pages/LoginPage";
import { RegisterPage } from "App/pages/RegisterPage";

const App = () => {
  useQueryParamsStoreInit();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/repositories" replace />} />
        <Route path={routesConfig.repositories.mask} element={<><InitializeReposQueryParams /><AllReposPage /></>} />
        <Route path={routesConfig.repoDetail.mask} element={<RepoDetailPage />} />
        <Route path={routesConfig.users.mask} element={<><InitializeReposQueryParams /><AllUsersPage /></>} />
        <Route path={routesConfig.userRepos.mask} element={<><InitializeReposQueryParams /><UserReposPage /></>} />
        <Route path={routesConfig.userDetail.mask} element={<UserDetailPage />} />
        <Route path={routesConfig.login.mask} element={<LoginPage />} />
        <Route path={routesConfig.register.mask} element={<RegisterPage />} />
      </Route>
    </Routes>
    )
}

const InitializeReposQueryParams = () => {
  if (rootStore.query.getParam("page") === undefined) {
    const searchParams = rootStore.query.updateQueryParam({ page: 1 });
    rootStore.query.setSearch(searchParams);
  }

  if (rootStore.query.getParam("per_page") === undefined) {
    const searchParams = rootStore.query.updateQueryParam({ per_page: 6 });
    rootStore.query.setSearch(searchParams);
  }

  return null;
};

export default App;

