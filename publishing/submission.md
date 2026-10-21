# Zed registry submission — macOS Glass 0.5.0

Release date: 22 October 2026. These instructions describe registry submission;
tagging the source release and publication in Zed's registry are separate steps.

The user confirmed the manual review on 22 October 2026 and authorized release.
The theme palettes and font preset have not changed since that review. Final
release changes concern documentation, changelog, and validation automation.

Preparation checks on 22 October 2026: seven Bun tests and official theme schema
validation passed. GitHub reports the repository as public. The ID
`macos-glass-theme` is absent from the registry's current `main`; this does not
reserve it or guarantee acceptance.

## Submission files

- Extension manifest: [`../extension.toml`](../extension.toml).
- Theme payload: [`../themes/macos-glass.json`](../themes/macos-glass.json),
  containing macOS Glass Light and macOS Glass Dark only.
- License: [`../LICENSE`](../LICENSE), MIT with original and current attribution.
- Release notes: [`../CHANGELOG.md`](../CHANGELOG.md).
- Registry entry: [`registry-entry.toml`](registry-entry.toml), to merge into
  `zed-industries/extensions`' top-level `extensions.toml`.
- The typography preset is optional user configuration documented in the README;
  the extension does not install fonts, icons, servers, or executable code.

## Before submission

1. Review and commit the intended release files, including the theme, preset,
   tests, changelog, workflow, and publishing files. Review tracked files as well
   as new files; local agent state is not part of the theme payload.
2. Run `bun test` and the schema validation command in `DEVELOPMENT`.
3. Publish the reviewed commit on a branch of
   `https://github.com/adeze/zed-theme-macos-glass`. Confirm the repository is
   publicly accessible. Registry review requires a reachable branch commit;
   a tag alone is insufficient.
4. Install the dev extension from that exact commit and manually review both
   appearances. The current working files were reviewed on macOS 27 with the
   font preset; this does not replace checking the eventual release commit.
5. Recheck ID availability and Zed's publishing requirements at submission time.

The existing seven tests cover the meaningful automated checks for this theme.
A broader suite is not required merely to publish. Manual review must still
cover the final manifest ID, both appearances, selections, command palette,
diagnostics, and terminal text/ANSI colors. Also verify system appearance
switching and the documented opaque override. Record any remaining limits,
including the reported blur issue, rather than claiming native glass support.

## Tags, release notes, and automation

Use `v0.5.0` as the annotated release tag, pointing to the final verified commit.
Before making that commit, replace the changelog's Unreleased marker with the
date the tagged release is cut. Keep registry publication status distinct from
the tag: publishing still depends on Zed's registry PR being accepted and merged.
Existing tags through `v0.4.0` belong to the inherited Classic history; do not
move or recreate them.

Once release is authorized, push the reviewed branch and tag. An optional GitHub
Release can use the changelog entry as its notes; neither a tag nor a GitHub
Release submits the theme to Zed. Record the commit and manual results in the
registry PR draft below. Recheck availability of the intended tag before use.

The `Validate release` GitHub Actions workflow automatically runs tests and schema
validation on pushes and pull requests. It also supports **Run workflow** for a
selected branch once present on the default branch. It has read-only repository
permissions and does not create tags, releases, or PRs.

Registry PR creation and later version updates can be automated separately using
a workflow with access to a registry fork. That is not configured here: first
submission still requires reviewing the submodule commit and registry diff.
Zed's own infrastructure automates packaging/publication after registry merge.
See [manual workflow dispatch](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow).

## Registry change

In a separate checkout of a personal fork of `zed-industries/extensions`, add
the extension as an HTTPS Git submodule at `extensions/macos-glass-theme`.
Pin the submodule to the reviewed, publicly reachable release commit. Do not
use this theme repository's inherited `upstream` remote: that points to Classic.

Merge `registry-entry.toml` into the registry's `extensions.toml`. Its version
must match `extension.toml` at the pinned commit. Git's submodule operation will
produce this `.gitmodules` entry:

```ini
[submodule "extensions/macos-glass-theme"]
    path = extensions/macos-glass-theme
    url = https://github.com/adeze/zed-theme-macos-glass
```

Run the registry's documented sorting and validation tasks. Review the gitlink,
`.gitmodules`, and `extensions.toml` changes, then open a PR adding this extension
only. Zed publishes after that PR is accepted and merged. No upload archive,
npm package, Rust crate, or WebAssembly binary is needed for this theme.

## Draft PR

Title: `Add macOS Glass theme v0.5.0`

Body:

> Adds macOS Glass Light and Dark: macOS 27 Liquid Glass-inspired palettes with
> translucent chrome, layered tabs, blue accents, and opaque editing surfaces.
> These are custom palettes maintained by adeze; Classic themes are not bundled.
>
> The extension uses Zed's existing blur support, not native Liquid Glass
> refraction. The README documents the reported macOS 27 blur limitation and an
> opaque fallback. An optional macOS font preset is documented for manual use.
>
> License: MIT; derived from Jason Lee's macOS Classic with attribution retained.
> Local preparation checks passed: Bun tests and official theme JSON schema.

Before sending, add the actual release commit and its manual verification
results to the draft. Do not claim unperformed checks.

## Sources

- [Zed publishing guide](https://zed.dev/docs/extensions/publishing/publishing-guide).
- [Publishing prerequisites](https://zed.dev/docs/extensions/publishing/prerequisites).
- [Accepted licenses](https://zed.dev/docs/extensions/publishing/license-requirements).

Checked 22 October 2026. No external submission is automated by this repository.
