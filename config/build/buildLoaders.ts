import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions, runtime } from "webpack";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const imageLoader = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: "asset/resource",
  };

  const scssLoader = {
    test: /\.(css|s[ac]ss)$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: /\.module\./,
            namedExport: false,
            localIdentName: isDev ? "[path][name]__[local]" : "[contenthash:base64]",
            exportLocalsConvention: "asIs",
          },
        },
      },
      "sass-loader",
    ],
  };

  const babelLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
    },
  };

  return [imageLoader, babelLoader, fontLoader, scssLoader];
}
