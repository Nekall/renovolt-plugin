const fs = require("fs");
const path = require("path");

class SimpleBundler {
  constructor() {
    this.srcDir = path.join(__dirname, "../src");
    this.distDir = path.join(__dirname, "../dist");
    this.output = "";
    this.processedFiles = new Set();
  }

  // Ensure dist directory exists
  ensureDistDir() {
    if (!fs.existsSync(this.distDir)) {
      fs.mkdirSync(this.distDir, { recursive: true });
    }
  }

  // Read and process a JavaScript file
  processJSFile(filePath) {
    if (this.processedFiles.has(filePath)) return "";

    this.processedFiles.add(filePath);
    const content = fs.readFileSync(filePath, "utf8");

    // Process imports - convert to inline code
    return content.replace(
      /import\s+.*?from\s+['"`](.*?)['"`];?\s*/g,
      (match, importPath) => {
        if (importPath.startsWith("./") || importPath.startsWith("../")) {
          const resolvedPath = path.resolve(path.dirname(filePath), importPath);
          const jsPath = resolvedPath.endsWith(".js")
            ? resolvedPath
            : resolvedPath + ".js";

          if (fs.existsSync(jsPath)) {
            return `\n// === ${path.relative(
              this.srcDir,
              jsPath
            )} ===\n${this.processJSFile(jsPath)}\n`;
          }
        }
        return ""; // Remove unresolved imports
      }
    );
  }

  // Process CSS files
  processCSS() {
    const cssDir = path.join(this.srcDir, "styles");
    if (!fs.existsSync(cssDir)) return "";

    let allCSS = "";
    const cssFiles = fs.readdirSync(cssDir).filter((f) => f.endsWith(".css"));

    for (const file of cssFiles) {
      const cssPath = path.join(cssDir, file);
      const cssContent = fs.readFileSync(cssPath, "utf8");
      allCSS += `\n/* === ${file} === */\n${cssContent}\n`;
    }

    return allCSS;
  }

  // Process HTML templates
  processHTML() {
    const templatesDir = path.join(this.srcDir, "templates");
    if (!fs.existsSync(templatesDir)) return {};

    const templates = {};
    const htmlFiles = fs
      .readdirSync(templatesDir)
      .filter((f) => f.endsWith(".html"));

    for (const file of htmlFiles) {
      const htmlPath = path.join(templatesDir, file);
      const htmlContent = fs.readFileSync(htmlPath, "utf8");
      const templateName = path.basename(file, ".html");
      templates[templateName] = htmlContent.replace(/\n\s*/g, "").trim();
    }

    return templates;
  }

  // Build the plugin
  build() {
    console.log("🚀 Building Renovolt Plugin (Simple Bundler)...");

    this.ensureDistDir();

    // Process main entry point
    const indexPath = path.join(this.srcDir, "index.js");
    if (!fs.existsSync(indexPath)) {
      console.error("❌ src/index.js not found");
      process.exit(1);
    }

    // Get all CSS
    const cssContent = this.processCSS();

    // Get all HTML templates
    const htmlTemplates = this.processHTML();

    // Process main JS file
    let jsContent = this.processJSFile(indexPath);

    // Remove import statements for CSS and HTML (they're bundled separately)
    jsContent = jsContent.replace(
      /import\s+['"`].*?\.(css|html)['"`];?\s*/g,
      ""
    );

    // Create the final bundle
    const bundle = `
// Revolt Renovolt Plugin v0.0.1
// Generated automatically - Do not edit directly

(function() {
  'use strict';

  // === CSS STYLES ===
  const CSS_CONTENT = \`${cssContent.replace(/`/g, "\\`")}\`;

  // === HTML TEMPLATES ===
  const HTML_TEMPLATES = ${JSON.stringify(htmlTemplates, null, 2)};

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
  ${jsContent}

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
`;

    // Write the bundle
    const outputPath = path.join(this.distDir, "renovolt-plugin.js");
    fs.writeFileSync(outputPath, bundle);

    // Generate installation instructions
    const instructionsPath = path.join(this.distDir, "INSTALL.md");
    const instructions = `# Renovolt Plugin Installation

## Version 0.0.1

### Installation Steps
1. Open Revolt in your browser
2. Enable experimental features (Plugin API) in settings
3. Open Developer Console (F12 or Ctrl+Shift+I)
4. Copy and paste the entire content of \`renovolt-plugin.js\`
5. Press Enter

### Usage
- Click the Renovolt button (bottom left)
- Or type \`openRenovolt()\` in console
- Customize your profile and click Apply

### Uninstall
\`\`\`javascript
state.plugins.unload("community", "renovolt");
\`\`\`

---
Generated on ${new Date().toISOString()}
`;

    fs.writeFileSync(instructionsPath, instructions);

    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
    console.log("✅ Build completed successfully!");
    console.log(`📦 Plugin file: dist/renovolt-plugin.js (${sizeKB}KB)`);
    console.log("📄 Instructions: dist/INSTALL.md");
    console.log("🎉 Ready for distribution!");
  }
}

// Run the build
const bundler = new SimpleBundler();
bundler.build();
