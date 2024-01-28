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
  // "plugins": [
  //   "eslint-plugin-typescript",
  // ],

}
