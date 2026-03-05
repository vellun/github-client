import path from "path";
import webpack from "webpack";

import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths } from "./config/build/types/types";

interface EnvVars {
  mode: BuildMode;
  port: number;
}

export default (env: EnvVars) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "main.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),

    components: path.resolve(__dirname, "src", "components"),
    config: path.resolve(__dirname, "src", "config"),
    styles: path.resolve(__dirname, "src", "styles"),
    utils: path.resolve(__dirname, "src", "utils"),
    App: path.resolve(__dirname, "src", "App"),
    assets: path.resolve(__dirname, "src", "assets"),
    hooks: path.resolve(__dirname, "src", "hooks"),
    api: path.resolve(__dirname, "src", "api"),
    store: path.resolve(__dirname, "src", "store"),
    meta: path.resolve(__dirname, "src", "store")
  };
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths: paths,
  });
  return config;
};
