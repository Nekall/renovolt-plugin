
// Revolt Renovolt Plugin v0.0.1
// Generated automatically - Do not edit directly

(function() {
  'use strict';

  // === CSS STYLES ===
  const CSS_CONTENT = `
/* === backgrounds.css === */


/* === badges.css === */


/* === base.css === */


/* === frames.css === */


/* === ui.css === */

`;

  // === HTML TEMPLATES ===
  const HTML_TEMPLATES = {
  "panel": ""
};

  // === STYLE INJECTOR ===
  class StyleInjector {
    constructor() {
      this.styleId = 'renovolt-styles';
    }

    injectStyles() {
      // Remove existing styles
      const existing = document.getElementById(this.styleId);
      if (existing) existing.remove();

      // Inject new styles
      const style = document.createElement('style');
      style.id = this.styleId;
      style.textContent = CSS_CONTENT;
      document.head.appendChild(style);
    }

    removeStyles() {
      const existing = document.getElementById(this.styleId);
      if (existing) existing.remove();
    }
  }

  // === MAIN PLUGIN CODE ===
  
// === config/plugin-config.js ===
export const PLUGIN_CONFIG = {
  version: "0.1.1",
  namespace: "community",
  id: "renovolt",
  name: "Renovolt",
  description:
    "Customize your Revolt profile with frames, backgrounds, and badges",
};


// === core/ProfileDetector.js ===
export class ProfileDetector {
  constructor() {
    this.selectors = [
      "[data-user-id]",
      ".member",
      ".message-author",
      ".user-profile",
      ".user-card",
    ];
  }

  findProfiles() {
    const profiles = [];

    this.selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.classList.contains("renovolt-processed")) {
          profiles.push(el);
        }
      });
    });

    return profiles;
  }

  cleanDecorations() {
    document.querySelectorAll(".renovolt-processed").forEach((el) => {
      el.classList.remove("renovolt-processed");

      // Remove frame classes
      el.classList.remove("renovolt-frame-neon-blue", "renovolt-frame-minimal");

      // Remove background classes
      el.classList.remove("renovolt-bg-gradient", "renovolt-bg-cyberpunk");

      // Remove badges
      const badges = el.querySelector(".renovolt-badges");
      if (badges) badges.remove();
    });
  }
}


// === core/SettingsManager.js ===

// === config/default-settings.js ===
export const DEFAULT_SETTINGS = {
  selectedFrame: "neon-blue",
  selectedBackground: "gradient",
  badges: ["dev"],
};

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


// === components/ConfigPanel.js ===


// === components/Button.js ===

// Import styles
/**
 * Renovolt Plugin - Main Entry Point
 */
class RenovoltCore {
  constructor() {
    this.logger = new Logger("ʀᴇɴᴏᴠᴏʟᴛ");
    this.styleInjector = new StyleInjector();
    this.profileDetector = new ProfileDetector();
    this.settingsManager = new SettingsManager();
    this.observer = null;
    this.button = null;
    this.configPanel = null;
  }

  /**
   * Initialize the plugin
   */
  init() {
    this.logger.info("Initializing Renovolt...");

    try {
      // Inject base styles
      this.styleInjector.injectStyles();

      // Create UI components
      this.button = new RenovoltButton(() => this.openConfigPanel());
      this.configPanel = new ConfigPanel(this.settingsManager, () =>
        this.applyDecorations()
      );

      // Apply initial decorations
      this.applyDecorations();

      // Start observing DOM changes
      this.observer = new Observer(() => this.applyDecorations());

      // Add global command
      window.openRenovolt = () => this.openConfigPanel();

      this.logger.info("Renovolt loaded successfully!");
      this.logger.info("Click the button or type openRenovolt() to configure");

      return true;
    } catch (error) {
      this.logger.error("Failed to initialize Renovolt:", error);
      return false;
    }
  }

  /**
   * Apply decorations to detected profiles
   */
  applyDecorations() {
    try {
      const profiles = this.profileDetector.findProfiles();
      const settings = this.settingsManager.getSettings();

      if (profiles.length === 0) return;

      profiles.forEach((profile) => {
        this.applyDecorationsToProfile(profile, settings);
      });

      this.logger.info(`Decorations applied to ${profiles.length} profiles`);
    } catch (error) {
      this.logger.error("Failed to apply decorations:", error);
    }
  }

  /**
   * Apply decorations to a single profile
   */
  applyDecorationsToProfile(profile, settings) {
    // Mark as processed
    profile.classList.add("renovolt-processed");

    // Apply frame
    if (settings.selectedFrame && settings.selectedFrame !== "none") {
      profile.classList.add(`renovolt-frame-${settings.selectedFrame}`);
    }

    // Apply background
    if (settings.selectedBackground && settings.selectedBackground !== "none") {
      profile.classList.add(`renovolt-bg-${settings.selectedBackground}`);
    }

    // Apply badges
    if (settings.badges && settings.badges.length > 0) {
      this.applyBadges(profile, settings.badges);
    }
  }

  /**
   * Apply badges to a profile
   */
  applyBadges(profile, badges) {
    let badgeContainer = profile.querySelector(".renovolt-badges");

    if (!badgeContainer) {
      badgeContainer = document.createElement("div");
      badgeContainer.className = "renovolt-badges";
      profile.appendChild(badgeContainer);
    }

    badgeContainer.innerHTML = badges
      .map(
        (badge) =>
          `<span class="renovolt-badge renovolt-badge-${badge}">${badge}</span>`
      )
      .join("");
  }

  /**
   * Open configuration panel
   */
  openConfigPanel() {
    if (this.configPanel) {
      this.configPanel.show();
    }
  }

  /**
   * Cleanup and unload the plugin
   */
  unload() {
    this.logger.info("Unloading Renovolt...");

    try {
      // Disconnect observer
      if (this.observer) {
        this.observer.disconnect();
      }

      // Remove UI components
      if (this.button) {
        this.button.remove();
      }

      if (this.configPanel) {
        this.configPanel.remove();
      }

      // Remove styles
      this.styleInjector.removeStyles();

      // Clean existing decorations
      this.profileDetector.cleanDecorations();

      // Remove global command
      delete window.openRenovolt;
      delete window.profileDecoratorTimeout;

      this.logger.info("Renovolt unloaded successfully");
    } catch (error) {
      this.logger.error("Error during unload:", error);
    }
  }
}

// Create plugin instance
const renovoltCore = new RenovoltCore();

// Export plugin configuration for Revolt
const RenovoltPlugin = {
  format: 1,
  version: PLUGIN_CONFIG.version,
  namespace: PLUGIN_CONFIG.namespace,
  id: PLUGIN_CONFIG.id,
  entrypoint: `(state) => {
    const core = ${renovoltCore.constructor.toString()};
    const instance = new core();
    
    const success = instance.init();
    
    if (!success) {
      console.error('Failed to initialize Renovolt plugin');
      return { onUnload: () => {} };
    }

    return {
      onUnload: () => instance.unload()
    };
  }`,
};

// For build system
if (typeof module !== "undefined" && module.exports) {
  module.exports = RenovoltPlugin;
}

// For browser environment
if (typeof window !== "undefined") {
  window.RenovoltPlugin = RenovoltPlugin;
}


  // === PLUGIN EXPORT ===
  window.RenovoltPlugin = RenovoltPlugin;

  // === AUTO-INSTALLATION ===
  console.log('ʀᴇɴᴏᴠᴏʟᴛ | Plugin v0.0.1 ready for installation!');

  if (typeof state !== 'undefined' && state.plugins) {
    try {
      state.plugins.add(RenovoltPlugin);
      state.plugins.load("community", "renovolt");
      console.log('ʀᴇɴᴏᴠᴏʟᴛ | Plugin installed and loaded successfully!');
      console.log('ʀᴇɴᴏᴠᴏʟᴛ | Use openRenovolt() or click the button to configure');
    } catch (error) {
      console.error('ʀᴇɴᴏᴠᴏʟᴛ | Installation failed:', error);
    }
  } else {
    console.log('ʀᴇɴᴏᴠᴏʟᴛ | Plugin API not available');
    console.log('ʀᴇɴᴏᴠᴏʟᴛ | Please enable experimental features in Revolt settings');
    console.log('ʀᴇɴᴏᴠᴏʟᴛ | Then run: state.plugins.add(RenovoltPlugin); state.plugins.load("community", "renovolt");');
  }

})();
