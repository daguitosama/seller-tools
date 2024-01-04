/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
    rules: {
        "react/jsx-pascal-case": "off",
        // "@typescript-eslint/no-unused-vars": ["warn", { ignorePatterns: "^_" }],
    },
};
