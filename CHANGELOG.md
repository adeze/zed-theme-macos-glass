# Changelog

## 0.5.0 — 2026-10-22

First macOS Glass release under adeze's maintenance. Derived from
macOS Classic 0.4.0; the original MIT attribution is retained.

- Add macOS Glass Light and Dark, inspired by macOS 27 Liquid Glass: translucent
  navigation chrome, layered tabs, blue accents, and opaque content surfaces.
- Provide an optional macOS typography preset using the system UI font and Menlo.
  System light/dark switching requires the documented user setting.
- Remove bundled Classic themes. Existing Classic selections must be changed to
  the Glass names; the new extension ID is `macos-glass-theme`.
- Validate theme colors, contrast, surface opacity, ANSI semantics, typography
  preset, and release metadata. Use the official Zed theme JSON schema in CI.
- Document installation, opaque fallback, macOS 27 blur limitations, and proposed
  GPUI/AppKit requirements for native Liquid Glass. Native refraction is not
  implemented by this theme.

Availability in Zed's registry depends on acceptance and merge of its submission PR.
