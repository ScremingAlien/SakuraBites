import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules"],
  },
  {
    files: ["src/**/*.{ts,js}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier,
      import: importPlugin, // ✅ add this
    },
    rules: {
      /* Prettier */
      "prettier/prettier": "error",

      /* Quotes */
      "quotes": ["error", "double", { "avoidEscape": true }],

      /* General */
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-var": "error",
      "prefer-const": "error",

      /* TS-specific */
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      /* Import Order */
      "import/order": [
        "error",
        {
          groups: [["builtin", "external", "internal"]],
          pathGroups: [
            { pattern: "express", group: "external", position: "before" },
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
    }

  }
);
