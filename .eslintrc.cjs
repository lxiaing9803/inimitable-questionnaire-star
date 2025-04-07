module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off", // React 17+ 不需要显式导入 React
    "@typescript-eslint/no-explicit-any": "off", // 允许使用 any 类型
    "react/jsx-uses-react": "error", // 防止未使用的 React 导入
    "react/jsx-uses-vars": "error", // 防止未使用的 JSX 变量
  },
  settings: {
    react: {
      version: "detect", // 自动检测 React 版本
    },
  },
};
