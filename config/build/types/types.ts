export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
  components: string,
  config: string,
  styles: string,
  utils: string,
  App: string,
  assets: string,
  hooks: string,
  api: string,
  store: string,
  meta: string
}

export type BuildMode = "production" | "development";

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
}
