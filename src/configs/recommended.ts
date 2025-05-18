import type { ClassicConfig } from "@typescript-eslint/utils/ts-eslint";
import { RULE_NAME as PREFER_IMMUTABLE_RESOURCES } from "../rules/prefer-immutable-resource";
import { createRuleName } from "../utils/create-rule-name";

export const recommended: ClassicConfig.Config = {
	rules: {
		[createRuleName(PREFER_IMMUTABLE_RESOURCES)]: "error",
	},
};
