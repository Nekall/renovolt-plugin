const { execSync } = require("child_process");

console.log("🚀 Starting development mode...");

// Set development environment
process.env.NODE_ENV = "development";

try {
  // Initial build
  console.log("📦 Building for development...");
  execSync("node scripts/build.js", { stdio: "inherit" });

  // Start watching
  console.log("👀 Starting watch mode...");
  execSync("node scripts/watch.js", { stdio: "inherit" });
} catch (error) {
  if (error.signal === "SIGINT") {
    console.log("\n👋 Development mode stopped");
    process.exit(0);
  } else {
    console.error("❌ Development mode failed:", error.message);
    process.exit(1);
  }
}
