export default {
	"**/*.{ts,json}": ["oxfmt --no-error-on-unmatched-pattern"],
	"**/*.ts": "tsc-files --noEmit -p tsconfig.eslint.json"
};
