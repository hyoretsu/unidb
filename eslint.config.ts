import eslint from "@eslint/js";
import biome from "eslint-config-biome";
import pluginJest from "eslint-plugin-jest";
import tseslint, { type ConfigArray } from "typescript-eslint";

export default tseslint.config([
	{ ignores: ["**/.next/**", "**/build/**", "**/dist/**", "**/node_modules/**", "**/.js", "**/*.jsx"] },
	{
		files: ["**/*.ts", "**/*.tsx"],
		extends: [eslint.configs.recommended, tseslint.configs.strict, tseslint.configs.stylistic],
		languageOptions: {
			parser: tseslint.parser,
		},
		plugins: { "@typescript-eslint": tseslint.plugin },
		rules: {
			"@typescript-eslint/ban-ts-comment": "warn",
			"@typescript-eslint/no-confusing-void-expression": "off",
			"@typescript-eslint/no-deprecated": "warn",
			"@typescript-eslint/no-empty-function": "warn",
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-misused-promises": "warn",
			// Good rule, but sometimes it throws false negatives (`await Promise.all()`)
			"@typescript-eslint/no-unnecessary-condition": "off",
			"@typescript-eslint/no-unsafe-argument": "warn",
			"@typescript-eslint/no-unsafe-assignment": "warn",
			"@typescript-eslint/no-unsafe-call": "warn",
			"@typescript-eslint/no-unsafe-member-access": "warn",
			"@typescript-eslint/no-unsafe-return": "warn",
			"@typescript-eslint/only-throw-error": "warn",
			"@typescript-eslint/prefer-nullish-coalescing": "warn",
			"@typescript-eslint/restrict-template-expressions": "off",
			"@typescript-eslint/use-unknown-in-catch-callback-variable": "warn",
		},
	},
	// Test files
	{
		files: [
			"**/*.spec.js",
			"**/*.spec.ts",
			"**/*.test.js",
			"**/*.test.ts",
			"**/*.spec.jsx",
			"**/*.spec.tsx",
			"**/*.test.jsx",
			"**/*.test.tsx",
		],
		extends: [pluginJest.configs["flat/all"]],
		languageOptions: {
			globals: pluginJest.environments.globals.globals,
		},
		plugins: { jest: pluginJest },
		rules: {
			"jest/no-deprecated-functions": "off",
		},
		settings: {
			jest: {
				globalPackage: "bun:test",
			},
		},
	},
	{
		extends: [biome],
		rules: {
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/require-await": "off",
			"jest/max-nested-describe": "off",
			"jest/no-disabled-tests": "off",
			"jest/no-done-callback": "off",
			"jest/no-duplicate-hooks": "off",
			"jest/no-export": "off",
			"jest/no-focused-tests": "off",
			"jest/no-standalone-expect": "off",
			"sort-imports": "off",
		},
	},
]) as unknown as ConfigArray;
