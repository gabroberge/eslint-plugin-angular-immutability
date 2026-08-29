import type { ViteUserConfig } from "vitest/config";
import { defineConfig, mergeConfig } from "vitest/config";

import rootConfig from "../../vitest.config.js";

const config: ViteUserConfig = mergeConfig(rootConfig, defineConfig({}));

export default config;
