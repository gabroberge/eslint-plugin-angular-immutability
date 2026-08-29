#!/usr/bin/env bash
# Configure GitHub repository security and branch protection for master + dev.
# Requires: gh auth login (repo + admin:repo_hook scopes as needed)
set -euo pipefail

REPO="${1:-gabroberge/eslint-plugin-angular-immutability}"
if [[ $# -le 1 ]]; then
	BRANCHES=(master dev)
else
	shift
	BRANCHES=("$@")
fi

protect_branch() {
	local branch="$1"
	echo "→ Applying branch protection on ${branch}…"
	gh api --method PUT "repos/${REPO}/branches/${branch}/protection" \
		--input - <<EOF
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["commitlint", "oxfmt", "packages"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": null,
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": false
}
EOF
}

echo "→ Repository: $REPO (branches: ${BRANCHES[*]})"

echo "→ Enabling Dependabot vulnerability alerts…"
gh api --method PUT "repos/${REPO}/vulnerability-alerts" >/dev/null

echo "→ Enabling Dependabot security update PRs…"
gh api --method PUT "repos/${REPO}/automated-security-fixes" >/dev/null

echo "→ Setting Actions workflow token to read-only by default…"
gh api --method PUT "repos/${REPO}/actions/permissions/workflow" \
	--input - <<'EOF'
{
  "default_workflow_permissions": "read",
  "can_approve_pull_request_reviews": false
}
EOF

echo "→ Enabling secret scanning + push protection…"
gh api --method PATCH "repos/${REPO}" --input - <<'EOF'
{
  "security_and_analysis": {
    "secret_scanning": { "status": "enabled" },
    "secret_scanning_push_protection": { "status": "enabled" }
  },
  "has_discussions": false,
  "has_projects": false,
  "allow_squash_merge": true,
  "allow_merge_commit": false,
  "allow_rebase_merge": false,
  "delete_branch_on_merge": true
}
EOF

echo "→ Restricting Actions to GitHub-owned + explicit allowlist…"
gh api --method PUT "repos/${REPO}/actions/permissions" --input - <<'EOF'
{
  "enabled": true,
  "allowed_actions": "selected",
  "github_owned_allowed": true,
  "verified_allowed": false
}
EOF

gh api --method PUT "repos/${REPO}/actions/permissions/selected-actions" --input - <<'EOF'
{
  "github_owned_allowed": true,
  "verified_allowed": false,
  "patterns_allowed": [
    "oven-sh/setup-bun@*",
    "changesets/action@*",
    "changesets/action/*@*"
  ]
}
EOF

for branch in "${BRANCHES[@]}"; do
	protect_branch "$branch"
done

echo ""
echo "Done. Optional / UI-only:"
echo "  • Settings → Actions → Fork PR workflows → require approval for outside contributors"
echo "  • Branch protection → require PR before merge (solo maintainer: optional)"
echo "  • Branch protection → enforce for administrators (stricter lockdown)"
echo ""
gh api "repos/${REPO}" -q '"Visibility: " + .visibility + " | Issues: " + (.has_issues|tostring)'
