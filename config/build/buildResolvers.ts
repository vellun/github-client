import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function buildResolvers(
  options: BuildOptions
): Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      // "@": options.paths.src,
      "components": options.paths.components,
      "config": options.paths.config,
      "styles": options.paths.styles,
      "utils": options.paths.utils,
      "App": options.paths.App,
      "assets": options.paths.assets,
      "hooks": options.paths.hooks,
      "api": options.paths.api,
      "store": options.paths.store,
      "meta": options.paths.store,
    },
  };
}
