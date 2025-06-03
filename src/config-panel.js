const createConfigPanel = () => {
  const currentSettings = {
    selectedFrame: "neon-blue",
    selectedBackground: "gradient",
    badges: ["dev"],
  };

  const getSettings = () => currentSettings;

  console.log("ʀᴇɴᴏᴠᴏʟᴛ | Creating Renovolt config panel");

  const overlay = document.createElement("div");
  overlay.className = "renovolt-overlay";

  const panel = document.createElement("div");
  panel.className = "renovolt-panel";
  panel.innerHTML = `
    <div class="panel-header">
      <h2>Customize your profile</h2>
      <button class="close-btn">×</button>
    </div>
    
    <div class="panel-content">
      <div class="avatar-preview-section">
        <div class="avatar-preview">
          <div class="avatar-img"></div>
          <div class="decoration-overlay neon-blue"></div>
        </div>
        <div class="mini-avatars">
          <div class="mini-avatar">
            <div class="mini-avatar-img"></div>
            <div class="online-indicator"></div>
          </div>
          <div class="mini-avatar">
            <div class="mini-avatar-img"></div>
            <div class="online-indicator"></div>
          </div>
          <div class="mini-avatar">
            <div class="mini-avatar-img"></div>
          </div>
        </div>
      </div>

      <div class="decorations-section">
        <h3>Basic decorations</h3>
        <div class="decorations-grid">
          <div class="decoration-item active">
            <div class="decoration-preview none">
              <span class="no-decoration-icon">⌀</span>
            </div>
            <span class="decoration-label">None</span>
          </div>
          
          <div class="decoration-item">
            <div class="decoration-preview neon-blue">
              <div class="neon-effect"></div>
            </div>
            <span class="decoration-label">Neon Blue</span>
          </div>
          
          <div class="decoration-item">
            <div class="decoration-preview fire-ring">
              <div class="fire-effect"></div>
            </div>
            <span class="decoration-label">Fire Ring</span>
          </div>
          
          <div class="decoration-item">
            <div class="decoration-preview cyberpunk">
              <div class="cyber-effect"></div>
            </div>
            <span class="decoration-label">Cyberpunk</span>
          </div>
          
          <div class="decoration-item">
            <div class="decoration-preview minimal">
              <div class="minimal-border"></div>
            </div>
            <span class="decoration-label">Minimal</span>
          </div>
          
          <div class="decoration-item">
            <div class="decoration-preview galaxy">
              <div class="galaxy-effect"></div>
            </div>
            <span class="decoration-label">Galaxy</span>
          </div>
        </div>
      </div>

      <div class="exclusive-section">
        <h3>Collection 1</h3>
        <div class="decorations-grid premium-grid">
          <div class="decoration-item">
            <div class="decoration-preview premium-rainbow">
              <div class="premium-effect-1"></div>
            </div>
            <span class="decoration-label">Rainbow</span>
          </div>
          
          <div class="decoration-item">
            <div class="decoration-preview premium-holographic">
              <div class="premium-effect-2"></div>
            </div>
            <span class="decoration-label">Holographic</span>
          </div>
          
          <div class="decoration-item">
            <div class="decoration-preview premium-plasma">
              <div class="premium-effect-3"></div>
            </div>
            <span class="decoration-label">Plasma</span>
          </div>

          <div class="decoration-item">
            <div class="decoration-preview premium-void">
              <div class="premium-effect-4"></div>
            </div>
            <span class="decoration-label">Void</span>
          </div>
        </div>
      </div>

      <div class="shop-section">
        <h3>Collection 2</h3>
        <div class="decorations-grid exclusive-grid">
          <div class="decoration-item">
            <div class="decoration-preview exclusive-diamond">
              <div class="exclusive-effect-1"></div>
            </div>
            <span class="decoration-label">Diamond</span>
          </div>
          
          <div class="decoration-item">
            <div class="decoration-preview exclusive-crystal">
              <div class="exclusive-effect-2"></div>
            </div>
            <span class="decoration-label">Crystal</span>
          </div>
          
          <div class="decoration-item">
            <div class="decoration-preview exclusive-aurora">
              <div class="exclusive-effect-3"></div>
            </div>
            <span class="decoration-label">Aurora</span>
          </div>

          <div class="decoration-item">
            <div class="decoration-preview exclusive-nebula">
              <div class="exclusive-effect-4"></div>
            </div>
            <span class="decoration-label">Nebula</span>
          </div>
        </div>
      </div>

      <div class="animated-section">
        <h3>Animated Collection</h3>
        <div class="decorations-grid animated-grid">
          <div class="decoration-item">
            <div class="decoration-preview animated-pulse">
              <div class="animated-effect-1"></div>
            </div>
            <span class="decoration-label">Pulse</span>
          </div>
          
          <div class="decoration-item">
            <div class="decoration-preview animated-orbit">
              <div class="animated-effect-2"></div>
            </div>
            <span class="decoration-label">Orbit</span>
          </div>
          
          <div class="decoration-item">
            <div class="decoration-preview animated-wave">
              <div class="animated-effect-3"></div>
            </div>
            <span class="decoration-label">Wave</span>
          </div>

          <div class="decoration-item">
            <div class="decoration-preview animated-spark">
              <div class="animated-effect-4"></div>
            </div>
            <span class="decoration-label">Spark</span>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <button class="cancel-btn">Cancel</button>

      <button class="apply-btn">Apply</button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  panel.querySelector(".close-btn").addEventListener("click", () => {
    overlay.remove();
    panel.remove();
  });

  overlay.addEventListener("click", () => {
    overlay.remove();
    panel.remove();
  });

  const decorationItems = panel.querySelectorAll(".decoration-item");
  decorationItems.forEach((item) => {
    item.addEventListener("click", () => {
      decorationItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      const previewOverlay = panel.querySelector(".decoration-overlay");
      const label = item.querySelector(".decoration-label").textContent;

      previewOverlay.className = "decoration-overlay";

      if (label !== "None") {
        const className = label.toLowerCase().replace(/\s+/g, "-");
        previewOverlay.classList.add(className);
      }
    });
  });
};
