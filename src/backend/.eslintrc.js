module.exports = {
  "root": true,
  "extends": [
    "../../.eslintrc",

  ],
  "parserOptions": {

    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname,
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "ts": true
    }
  },
  "rules": {
    "@typescript-eslint/no-unsafe-return": "off"
  }
  // "plugins": [
  //   "eslint-plugin-typescript",
  // ],

}
