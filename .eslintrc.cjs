module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:nuxt/recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
  ],
  plugins: ["eslint-plugin-vitest"],
  rules: {
    "vue/html-self-closing": "off",
    "import/order": "off",
    "vue/multi-word-component-names": "off",
    "vue/singleline-html-element-content-newline": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/html-indent": "off",
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: true,
        ignores: [],
      },
    ],
  },
};
