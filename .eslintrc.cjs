const path = require("path");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    createDefaultProgram: true,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["@typescript-eslint", "import", "prettier", "react", "react-hooks"],
  rules: {
    "no-console": "warn",
    "no-duplicate-imports": ["error", { includeExports: true }],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        alphabetize: {
          order: "asc",
        },
        pathGroups: [
          {
            pattern: "./**/*.scss",
            group: "sibling",
            position: "after",
          },
        ],
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [
        ".ts",
        ".tsx",
        ".scss",
        ".svg",
        ".png",
        ".jpg",
      ],
    },
    "import/resolver": {
      typescript: {
        project: path.resolve("./tsconfig.json"),
      },
    },
    "import/external-module-folders": ["node_modules", "node_modules/@types"],
    react: {
      version: "detect",
    },
  },
};
