# macOS Glass for Zed

A macOS 27 Liquid Glass-inspired theme for [Zed](https://zed.dev).

## Features

- Light and Dark mode
- Translucent chrome and opaque code surfaces

## Usage

Setup auto switch theme in light and dark mode based on the system's appearance.

Open your Zed user settings.json: `~/.config/zed/settings.json`, and add this config:

```json
{
  "theme": {
    "mode": "system",
    "light": "macOS Glass Light",
    "dark": "macOS Glass Dark"
  }
}
```
