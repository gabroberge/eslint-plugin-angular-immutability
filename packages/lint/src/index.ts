import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

import packageJson from "../package.json";
import preferImmutableResource, { RULE_NAME as PREFER_IMMUTABLE_RESOURCES } from "./rules/prefer-immutable-resource.js";
import preferProtectedOutputs, { RULE_NAME as PREFER_PROTECTED_OUTPUTS } from "./rules/prefer-protected-outputs.js";
import { createRuleName } from "./utils/create-rule-name.js";

const plugin: FlatConfig.Plugin = {
	configs: {
		recommended: {}
	},
	meta: {
		name: packageJson.name,
		version: packageJson.version
	},
	processors: {},
	rules: {
		[PREFER_IMMUTABLE_RESOURCES]: preferImmutableResource,
		[PREFER_PROTECTED_OUTPUTS]: preferProtectedOutputs
	}
};

plugin.configs = {
	recommended: {
		plugins: {
			"angular-immutability": plugin
		},
		rules: {
			[createRuleName(PREFER_IMMUTABLE_RESOURCES)]: "error",
			[createRuleName(PREFER_PROTECTED_OUTPUTS)]: "error"
		}
	}
};

export default plugin;
