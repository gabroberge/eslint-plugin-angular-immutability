# `@gabroberge/eslint-plugin-angular-signals/prefer-immutable-resource`

Use readonly resource types for immutability.

-   Type: suggestion
-   🔧 Supports autofix (`--fix`)

<br>

## Rule Options

The rule does not accept any configuration options.

<br>

## Usage Examples

<br>

<details>
<summary>❌ - Toggle examples of <strong>incorrect</strong> code for this rule</summary>

<br>

#### Default Config

```json
{
	"rules": {
		"@gabroberge/eslint-plugin-angular-signals/prefer-immutable-resource": ["error"]
	}
}
```

#### ❌ Invalid Code

```typescript
public resource = resource({ loader: () => Promise.resolve(1) });
public rxResource = rxResource({ loader: () => of(1) });
```

</details>

<br>

---

<br>

<details>
<summary>✅  - Toggle examples of <strong>correct</strong> code for this rule</summary>

<br>

#### Default Config

```json
{
	"rules": {
		"@gabroberge/eslint-plugin-angular-signals/prefer-immutable-resource": ["error"]
	}
}
```

#### ✅ Valid Code

```typescript
public readonly resource = resource({ loader: () => Promise.resolve(1) });
public readonly rxResource = rxResource({ loader: () => of(1) });
```

</details>

<br>
