import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
	{
		ignores: ["apps/**", "commitlint.config.mjs", "eslint.config.mjs", "lint-staged.config.mjs"]
	},
	eslint.configs.recommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			sourceType: "module",
			parserOptions: {
				project: ["tsconfig.eslint.json"],
				tsconfigRootDir: import.meta.dirname,
				createDefaultProgram: false
			}
		}
	},
	{
		rules: {
			"@typescript-eslint/consistent-type-definitions": "error",
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{
					prefer: "type-imports",
					fixStyle: "separate-type-imports"
				}
			],
			"@typescript-eslint/dot-notation": "off",
			"@typescript-eslint/explicit-function-return-type": [
				"error",
				{
					allowExpressions: true
				}
			],
			"@typescript-eslint/explicit-member-accessibility": [
				"error",
				{
					accessibility: "explicit",
					overrides: {
						constructors: "no-public"
					}
				}
			],
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "interface",
					format: ["PascalCase"],
					custom: {
						regex: "^I[A-Z]",
						match: false
					}
				},
				{
					selector: "variable",
					format: ["camelCase"]
				},
				{
					selector: "variable",
					modifiers: ["const"],
					format: ["PascalCase", "camelCase", "UPPER_CASE"],
					leadingUnderscore: "allow",
					trailingUnderscore: "allow"
				}
			],
			"@typescript-eslint/no-extraneous-class": [
				"error",
				{
					allowWithDecorator: true
				}
			],
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-shadow": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_"
				}
			],
			"@typescript-eslint/prefer-enum-initializers": "error",
			"@typescript-eslint/prefer-readonly": "error",
			"@typescript-eslint/promise-function-async": "error",
			"@typescript-eslint/require-array-sort-compare": "error",
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					allowNumber: true
				}
			],
			"@typescript-eslint/return-await": "error",
			"@typescript-eslint/sort-type-constituents": "error",
			"@typescript-eslint/strict-boolean-expressions": "error",
			"@typescript-eslint/switch-exhaustiveness-check": "error",
			"@typescript-eslint/unbound-method": [
				"error",
				{
					ignoreStatic: true
				}
			],
			curly: "error",
			"lines-between-class-members": [
				"error",
				{
					enforce: [{ blankLine: "always", prev: "*", next: "method" }]
				}
			],
			"preserve-caught-error": "error"
		}
	},
	{
		files: ["**/*.ts"],
		plugins: { perfectionist },
		rules: {
			"perfectionist/sort-classes": "error",
			"perfectionist/sort-interfaces": "error",
			"perfectionist/sort-modules": "error",
			"perfectionist/sort-objects": "error",
			"perfectionist/sort-switch-case": "error"
		}
	},
	{
		files: ["**/*.{spec,e2e-spec}.ts"],
		plugins: { vitest },
		extends: [vitest.configs.all],
		settings: {
			vitest: {
				typecheck: true
			}
		},
		rules: {
			"vitest/consistent-test-filename": [
				"warn",
				{
					pattern: ".*\\.spec\\.ts$"
				}
			],
			"vitest/no-hooks": ["error", { allow: ["beforeEach", "afterEach"] }]
		}
	}
);
