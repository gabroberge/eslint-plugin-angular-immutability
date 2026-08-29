import type { ViteUserConfig } from "vitest/config";
import { defineConfig } from "vitest/config";

const config: ViteUserConfig = defineConfig({
	test: {
		environment: "node",
		globals: false,
		include: ["src/**/*.spec.ts"],
		isolate: false,
		passWithNoTests: true,
		pool: "threads"
	}
});

export default config;
