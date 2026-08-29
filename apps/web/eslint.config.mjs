import angularImmutability from "@gabroberge/eslint-plugin-angular-immutability";
import tseslint from "typescript-eslint";

export default [
	{
		linterOptions: {
			reportUnusedDisableDirectives: "error"
		}
	},
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tseslint.parser
		},
		...angularImmutability.configs.recommended
	}
];
