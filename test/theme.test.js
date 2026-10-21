import { expect, test } from "bun:test";
import { readdir } from "node:fs/promises";

const directory = new URL("../themes/", import.meta.url);
const families = await Promise.all(
  (await readdir(directory)).filter(name => name.endsWith(".json"))
    .map(name => Bun.file(new URL(name, directory)).json()),
);
const glass = families.find(family => family.name === "macOS Glass").themes;
const rgb = color => color.slice(1, 7).match(/../g).map(channel => parseInt(channel, 16) / 255);
const composite = (color, background) => {
  const alpha = color.length === 9 ? parseInt(color.slice(7), 16) / 255 : 1;
  return rgb(color).map((channel, index) => channel * alpha + background[index] * (1 - alpha));
};
const luminance = channels => channels.map(channel => channel <= 0.04045
  ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05)
  / (Math.min(luminance(a), luminance(b)) + 0.05);

test("release manifest and registry submission agree on identity and version", async () => {
  const manifest = Bun.TOML.parse(await Bun.file(new URL("../extension.toml", import.meta.url)).text());
  const registry = Bun.TOML.parse(await Bun.file(new URL("../publishing/registry-entry.toml", import.meta.url)).text());
  expect(manifest.id).toBe("macos-glass-theme");
  expect(manifest.schema_version).toBe(1);
  expect(manifest.name).toBe(families[0].name);
  expect(manifest.version).toMatch(/^\d+\.\d+\.\d+$/);
  expect(manifest.authors).toEqual([families[0].author]);
  expect(manifest.repository).toBe("https://github.com/adeze/zed-theme-macos-glass");
  expect(manifest.description).toBeTruthy();
  expect(registry).toEqual({
    [manifest.id]: { submodule: `extensions/${manifest.id}`, version: manifest.version },
  });
  expect(await Bun.file(new URL("../LICENSE", import.meta.url)).text()).toContain("MIT License");
});

test("macOS preset selects shipped themes and system fonts without extra dependencies", async () => {
  const preset = await Bun.file(new URL("../presets/macos.json", import.meta.url)).json();
  const names = families.flatMap(family => family.themes.map(theme => theme.name));
  for (const appearance of ["light", "dark"]) expect(names).toContain(preset.theme[appearance]);
  expect(preset.theme.mode).toBe("system");
  expect(preset.icon_theme).toBe("Zed (Default)");
  for (const font of [preset.ui_font_family, preset.agent_ui_font_family, preset.mermaid_font_family, preset.markdown_preview.font_family]) {
    expect(font).toBe(".SystemUIFont");
  }
  for (const font of [preset.buffer_font_family, preset.agent_buffer_font_family, preset.markdown_preview.code_font_family, preset.terminal.font_family]) {
    expect(font).toBe("Menlo");
  }
});

test("only Glass light and dark ship with the current schema", () => {
  const names = families.flatMap(family => family.themes.map(theme => theme.name));
  expect(families).toHaveLength(1);
  expect(names.sort()).toEqual(["macOS Glass Dark", "macOS Glass Light"]);
  for (const family of families) {
    expect(family.$schema).toBe("https://zed.dev/schema/themes/v0.2.0.json");
    expect(family.themes.map(theme => theme.appearance).sort()).toEqual(["dark", "light"]);
  }
});

test("Glass colors are valid hex values throughout nested styles", () => {
  function check(value, path) {
    if (Array.isArray(value)) return value.forEach((item, index) => check(item, `${path}.${index}`));
    if (value && typeof value === "object") {
      return Object.entries(value).forEach(([key, item]) => check(item, `${path}.${key}`));
    }
    if (typeof value === "string" && !path.endsWith("background.appearance")) {
      expect(value, path).toMatch(/^#[\da-f]{6}([\da-f]{2})?$/i);
    }
  }
  glass.forEach(theme => check(theme.style, theme.name));
});

test("glass stays in chrome; code, terminal, and popovers stay opaque", () => {
  for (const { style } of glass) {
    expect(style["background.appearance"]).toBe("blurred");
    expect(style.background).toHaveLength(9);
    for (const key of ["editor.background", "editor.gutter.background", "terminal.background", "elevated_surface.background"]) {
      expect(style[key], key).toMatch(/^#[\da-f]{6}$/i);
    }
    expect(style["border.transparent"]).toBe("#00000000");
    expect(style["border.focused"]).toBe(style["text.accent"]);
  }
});

test("code and active selections retain readable text contrast", () => {
  for (const theme of glass) {
    const style = theme.style;
    const selection = composite(style.players[0].selection, rgb(style["editor.background"]));
    for (const background of [rgb(style["editor.background"]), rgb(style["editor.active_line.background"]), selection]) {
      for (const [name, { color }] of Object.entries(style.syntax)) {
        expect(contrast(rgb(color), background), `${theme.name}: ${name}`).toBeGreaterThanOrEqual(4.5);
      }
    }
    for (const background of ["element.selected", "elevated_surface.background"]) {
      for (const foreground of ["text", "text.muted", "text.accent"]) {
        expect(contrast(rgb(style[foreground]), rgb(style[background])), `${theme.name}: ${foreground} on ${background}`)
          .toBeGreaterThanOrEqual(4.5);
      }
    }
    expect(contrast(rgb(style["border.focused"]), rgb(style["editor.background"])), theme.name).toBeGreaterThanOrEqual(3);
  }
});

test("chrome layers preserve glass and readable labels over black and white; ANSI colors retain meaning", () => {
  for (const { name, style } of glass) {
    const alpha = parseInt(style.background.slice(7), 16) / 255;
    expect(alpha).toBeLessThanOrEqual(0.86);
    expect(alpha).toBeGreaterThanOrEqual(0.8);
    const chrome = ["toolbar.background", "tab_bar.background", "tab.inactive_background", "panel.background"];
    for (const key of chrome) expect(style[key], `${name}: ${key}`).toBe("#00000000");
    for (const key of ["title_bar.background", "title_bar.inactive_background", "status_bar.background"]) expect(style[key], `${name}: ${key}`).toBe(style.background.slice(0, 7));
    expect(style["tab.active_background"]).not.toBe(style["tab.inactive_background"]);
    for (const backdrop of [[0, 0, 0], [1, 1, 1]]) {
      const window = composite(style.background, backdrop);
      for (const layer of [...chrome, "title_bar.background", "title_bar.inactive_background", "status_bar.background", "tab.active_background"]) {
        const independent = layer.startsWith("title_bar.") || layer === "status_bar.background";
        const background = composite(style[layer], independent ? backdrop : window);
        for (const key of ["text", "text.muted", "text.accent", "icon"]) {
          expect(contrast(rgb(style[key]), background), `${name}: ${key} on ${layer}`).toBeGreaterThanOrEqual(4.5);
        }
      }
    }
    const blue = rgb(style["terminal.ansi.blue"]);
    const red = rgb(style["terminal.ansi.red"]);
    const cyan = rgb(style["terminal.ansi.cyan"]);
    expect(blue[2]).toBeGreaterThan(blue[0]);
    expect(red[0]).toBeGreaterThan(red[1]);
    expect(cyan[2]).toBeGreaterThan(cyan[0]);
  }
});
