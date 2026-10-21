# macOS Glass for Zed

A macOS 27 Liquid Glass-inspired Zed theme, designed and maintained by
[adeze](https://github.com/adeze/zed-theme-macos-glass). Translucent window chrome,
layered tabs, a blue interface accent, and opaque editing surfaces in light and
dark appearances. System appearance switching is available through the settings below.

## Design

- Translucent window chrome and sidebars, with a cool neutral glass tint.
- Transparent tab and tool bars share the window material; active tabs use a
  subtle translucent highlight. Title and status bars use a matching opaque tint
  to keep window controls readable on macOS 27.
- Opaque editor, terminal, and popovers keep content readable.
- Neutral comments, restrained syntax colors, visible keyboard focus and selections.
- Semantic diagnostics and Git colors; ANSI colors retain their meaning.

Inspired by [Apple's Liquid Glass materials](https://developer.apple.com/design/human-interface-guidelines/materials):
use translucency for navigation while keeping content clear. These are authored
colors, not extracted system color values. The theme requests Zed's window blur;
actual rendering depends on Zed and macOS. A JSON theme cannot add native Liquid
Glass refraction, floating controls, animations, or window shapes.

## Install locally

In Zed, run `zed: install dev extension` from the command palette and select this
repository. Open the theme selector with `cmd-k cmd-t`, then select
**macOS Glass Light** or **macOS Glass Dark**.

Alternatively, copy `themes/macos-glass.json` into `~/.config/zed/themes/` and
restart Zed. See [Zed's local theme documentation](https://zed.dev/docs/themes#local-themes).

For automatic appearance switching, merge this into Zed's user `settings.json`:

```json
{
  "theme": {
    "mode": "system",
    "light": "macOS Glass Light",
    "dark": "macOS Glass Dark"
  }
}
```

The extension ID is `macos-glass`. Only **macOS Glass Light** and
**macOS Glass Dark** are included. If migrating from macOS Classic, replace its
theme names in your settings with the Glass names above.

## macOS typography preset

Merge [presets/macos.json](presets/macos.json) into your Zed user settings for a
consistent macOS setup. This is this project's recommended preset, not an Apple
or Zed standard. Installing the theme alone does not apply font or icon settings.

- UI, agent prose, Markdown prose, and diagrams: `.SystemUIFont`, which resolves
  to SF Pro on macOS. Code, code blocks, agent input, and terminal: built-in Menlo.
- UI text at 16 px, editor text at 15 px, and terminal text at 14 px. Existing
  language-specific settings can override these sizes or fonts.
- Zed's bundled `Zed (Default)` icon theme requires no extra font installation.
  File icons and Zed UI icons are separate from text fonts; this preset does not
  replace them with Apple SF Symbols.

No fonts are bundled or downloaded. Unicode fallback and emoji rendering depend
on Zed, macOS, and installed fonts. Menlo does not cover every Nerd Font or
Powerline symbol used by custom shell prompts; configure those prompts to use
plain Unicode or choose an appropriate terminal font separately. Arbitrary
third-party glyphs are not guaranteed.

See [Zed's font and icon settings](https://zed.dev/docs/visual-customization#fonts).

## Transparency and contrast

The editor and terminal remain opaque so wallpaper cannot interfere with code.
The window background uses an approximately 86% opaque light tint or 80% opaque
dark tint. Title and status bars, editor, terminal, and popovers remain opaque.
Blur availability and system accessibility behavior depend on Zed and the
platform; this theme cannot detect Reduce Transparency or Increase Contrast.

For an explicitly opaque appearance, merge these overrides into user settings:

```json
{
  "theme_overrides": {
    "macOS Glass Light": {
      "background.appearance": "opaque",
      "background": "#F2F5FA"
    },
    "macOS Glass Dark": {
      "background.appearance": "opaque",
      "background": "#181C26"
    }
  }
}
```

If the theme still looks solid, confirm **macOS Glass Light** or **macOS Glass Dark**
is selected, remove conflicting `theme_overrides`, and inspect a sidebar
over a colorful desktop with Zed outside full screen. The code area and popovers
are intentionally opaque. The theme cannot add floating sidebars, rounded tab
geometry, or native Liquid Glass effects; those require changes in Zed itself.

On macOS 27, [Zed issue #64284](https://github.com/zed-industries/zed/issues/64284)
reports that the blurred window material can render without blur. This is a
renderer issue; changing theme colors cannot repair it. If the backdrop appears
sharp or distracting, use the opaque override above.

## Development

See [DEVELOPMENT](DEVELOPMENT) for validation and visual checks.
Theme files use [Zed's current v0.2.0 schema](https://zed.dev/schema/themes/v0.2.0.json).

## Credits and license

macOS Glass is maintained independently by adeze. It originated from
[macOS Classic by Jason Lee](https://github.com/huacnlee/zed-theme-macos-classic)
(version 0.4.0). Classic themes are no longer bundled; the original copyright
notice is preserved in the license. Glass theme design and subsequent changes
© 2026 adeze.

Licensed under [MIT](LICENSE).
