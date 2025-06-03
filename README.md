<p align="center">
  <img src="assets/renovolt-logo.png" alt="Renovolt Logo" width="120" style="border-radius: 16px;">
</p>

# Renovolt Plugin

**Renovolt — Power up your style on Revolt.Chat**

## Version 0.0.1

---

### Installation

1. Open Revolt in your browser.
2. Enable experimental features (Plugin API) in settings.
3. Open the Developer Console (`F12` or `Ctrl+Shift+I`).
4. Copy and paste the entire content of `renovolt-plugin.js`.
5. Press Enter.

### Usage

- Click the Renovolt button (bottom left).
- Or type `openRenovolt()` in the console.
- Customize your profile and click **Apply**.

### Uninstall

```js
state.plugins.unload("community", "renovolt");
```
