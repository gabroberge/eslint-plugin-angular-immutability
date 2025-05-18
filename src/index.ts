import type { Linter } from "@typescript-eslint/utils/ts-eslint";
import packageJson from "../package.json";
import { recommended } from "./configs/recommended";
import preferImmutableResource, { RULE_NAME as PREFER_IMMUTABLE_RESOURCES } from "./rules/prefer-immutable-resource";
import { createRuleName } from "./utils/create-rule-name";

const plugin = {
	meta: {
		name: packageJson.name,
		version: packageJson.version,
	},
	configs: {
		recommended,
	},
	rules: {
		[createRuleName(PREFER_IMMUTABLE_RESOURCES)]: preferImmutableResource,
	},
	processors: {},
} satisfies Linter.Plugin;

export default plugin;
