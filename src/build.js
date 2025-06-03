const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname);
const OUTPUT_FILE = path.join(__dirname, "dist", "renovolt-plugin.js");
const FILES_ORDER = [
  "core.js",
  "styles.js",
  "settings.js",
  "decorations.js",
  "config-panel.js",
  "button.js",
  "commands.js",
  "observer.js",
];

const processFile = (content) => {
  return content
    .replace(/`/g, "\\`")
    .replace(/import\s*.+from\s*.+;?/g, "")
    .replace(/export\s*\{[^}]*\};?/g, "")
    .replace(/\n+/g, "\n")
    .trim();
};

let bundle = "";
FILES_ORDER.forEach((file) => {
  const content = fs.readFileSync(path.join(SRC_DIR, file), "utf8");
  bundle += `// ${file}\n${processFile(content)}\n\n`;
});

const pluginCode = `// Revolt Renovolt - Built ${new Date().toISOString()}
const RenovoltPlugin = {
  format: 1,
  version: "0.1.1",
  namespace: "community",
  id: "renovolt",
  entrypoint: \`(state) => {
${bundle
  .split("\n")
  .map((line) => `    ${line}`)
  .join("\n")}
    const renovoltInstance = init();
    return {
      onUnload: () => {
        if (renovoltInstance.cleanup) renovoltInstance.cleanup();
        delete window.openRenovolt;
        delete window.renovoltObserver;
        delete window.renovoltDecoratorTimeout;
      }
    };
  }\`
};

// Auto-install
if (typeof state !== 'undefined' && state.plugins) {
  state.plugins.add(RenovoltPlugin);
  console.log('ʀᴇɴᴏᴠᴏʟᴛ | Plugin installed!');
}
`;

if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
  fs.mkdirSync(path.dirname(OUTPUT_FILE));
}
fs.writeFileSync(OUTPUT_FILE, pluginCode);
console.log(`✓ Build complete: ${OUTPUT_FILE}`);
