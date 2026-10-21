# Zed registry submission — macOS Glass 0.5.0

Prepared locally; not submitted or published. These instructions describe the
later release, not actions performed during preparation.

Preparation checks on 22 October 2026: seven Bun tests and official theme schema
validation passed. GitHub reports the repository as public. The ID
`macos-glass-theme` is absent from the registry's current `main`; this does not
reserve it or guarantee acceptance.

## Submission files

- Extension manifest: [`../extension.toml`](../extension.toml).
- Theme payload: [`../themes/macos-glass.json`](../themes/macos-glass.json),
  containing macOS Glass Light and macOS Glass Dark only.
- License: [`../LICENSE`](../LICENSE), MIT with original and current attribution.
- Registry entry: [`registry-entry.toml`](registry-entry.toml), to merge into
  `zed-industries/extensions`' top-level `extensions.toml`.
- The typography preset is optional user configuration documented in the README;
  the extension does not install fonts, icons, servers, or executable code.

## Before submission

1. Review and commit the intended release files, including new untracked theme,
   preset, tests, and publishing files. Exclude local agent state and unrelated
   changes. No release commit or pushed release branch was created during prep.
2. Run `bun test` and the schema validation command in `DEVELOPMENT`.
3. Publish the reviewed commit on a branch of
   `https://github.com/adeze/zed-theme-macos-glass`. Confirm the repository is
   publicly accessible. Registry review requires a reachable branch commit;
   a tag alone is insufficient.
4. Install the dev extension from that exact commit and manually review both
   appearances. The current working files were reviewed on macOS 27 with the
   font preset; this does not replace checking the eventual release commit.
5. Recheck ID availability and Zed's publishing requirements at submission time.

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
