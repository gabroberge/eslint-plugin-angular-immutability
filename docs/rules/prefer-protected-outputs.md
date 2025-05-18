# `@gabroberge/eslint-plugin-angular-signals/prefer-protected-outputs`

Enforce protected accessibility for `@Output` properties and `OutputEmitterRef` types.

- Type: suggestion

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
    "@gabroberge/eslint-plugin-angular-signals/prefer-protected-outputs": ["error"]
  }
}
```

#### ❌ Invalid Code

```typescript
public outputEvent = output();
private outputEvent = output();
readonly outputEvent = output();
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
    "@gabroberge/eslint-plugin-angular-signals/prefer-protected-outputs": ["error"]
  }
}
```

#### ✅ Valid Code

```typescript
protected outputEvent = output();
protected readonly outputEvent = output();
```

</details>

<br>
