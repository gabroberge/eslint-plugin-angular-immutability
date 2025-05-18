import type { Linter } from "@typescript-eslint/utils/ts-eslint";
import packageJson from "../package.json";
import preferImmutableResource, { RULE_NAME as PREFER_IMMUTABLE_RESOURCES } from "./rules/prefer-immutable-resource";
import preferProtectedOutputs, { RULE_NAME as PREFER_PROTECTED_OUTPUTS } from "./rules/prefer-protected-outputs";
import { createRuleName } from "./utils/create-rule-name";

const plugin = {
	meta: {
		name: packageJson.name,
		version: packageJson.version,
	},
	configs: {
		recommended: {},
	},
	rules: {
		[PREFER_IMMUTABLE_RESOURCES]: preferImmutableResource,
		[PREFER_PROTECTED_OUTPUTS]: preferProtectedOutputs,
	},
	processors: {},
} satisfies Linter.Plugin;

Object.assign(plugin.configs, {
	recommended: {
		plugins: {
			"angular-immutability": plugin,
		},
		rules: {
			[createRuleName(PREFER_IMMUTABLE_RESOURCES)]: "error",
			[createRuleName(PREFER_PROTECTED_OUTPUTS)]: "error",
		},
	},
});

export default plugin;
