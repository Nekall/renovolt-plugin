import { DEFAULT_SETTINGS } from "../config/default-settings.js";

export class SettingsManager {
  constructor() {
    this.storageKey = "renovolt-settings";
  }

  getSettings() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
        : DEFAULT_SETTINGS;
    } catch (error) {
      console.warn("Failed to load settings, using defaults:", error);
      return DEFAULT_SETTINGS;
    }
  }

  saveSettings(settings) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error("Failed to save settings:", error);
      return false;
    }
  }

  resetSettings() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error("Failed to reset settings:", error);
      return false;
    }
  }
}
