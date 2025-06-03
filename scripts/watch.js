const chokidar = require("chokidar");
const { execSync } = require("child_process");
const path = require("path");

console.log("👀 Watching for changes...");
console.log("Press Ctrl+C to stop");

const srcPath = path.join(__dirname, "../src");

// Initial build
try {
  execSync("node scripts/build.js", { stdio: "inherit" });
} catch (error) {
  console.error("Initial build failed:", error.message);
}

// Watch for changes
const watcher = chokidar.watch(srcPath, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

let buildTimeout;

const triggerBuild = () => {
  clearTimeout(buildTimeout);
  buildTimeout = setTimeout(() => {
    console.log("\n🔄 Files changed, rebuilding...");
    try {
      execSync("node scripts/build.js", { stdio: "inherit" });
      console.log("✅ Rebuild completed\n");
    } catch (error) {
      console.error("❌ Rebuild failed:", error.message);
    }
  }, 300); // Debounce builds
};

watcher
  .on("change", (filePath) => {
    console.log(`📝 Changed: ${path.relative(process.cwd(), filePath)}`);
    triggerBuild();
  })
  .on("add", (filePath) => {
    console.log(`➕ Added: ${path.relative(process.cwd(), filePath)}`);
    triggerBuild();
  })
  .on("unlink", (filePath) => {
    console.log(`➖ Removed: ${path.relative(process.cwd(), filePath)}`);
    triggerBuild();
  });

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n👋 Stopping watch mode...");
  watcher.close();
  process.exit(0);
});
