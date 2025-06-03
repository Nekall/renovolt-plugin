const applyDecorations = () => {
  console.log("ʀᴇɴᴏᴠᴏʟᴛ | Applying decorations...");

  document
    .querySelectorAll("[data-user-id], .member, .message-author")
    .forEach((profile) => {
      if (profile.classList.contains("renovolt-processed")) return;
      profile.classList.add("renovolt-frame-neon-blue");
      profile.classList.add("renovolt-bg-gradient");
      profile.insertAdjacentHTML(
        "beforeend",
        `
      <div class="renovolt-badges">
        <span class="renovolt-badge renovolt-badge-dev">DEV</span>
      </div>
    `
      );

      profile.classList.add("renovolt-processed");
    });
};

const initRenovolt = () => {
  console.log("ʀᴇɴᴏᴠᴏʟᴛ | Starting plugin...");
  const style = document.createElement("style");
  style.textContent = `
    .renovolt-frame-neon-blue {
      border: 2px solid #00aaff !important;
      box-shadow: 0 0 10px #00aaff !important;
      border-radius: 8px !important;
    }
    
    .renovolt-bg-gradient {
      background: linear-gradient(135deg, #667eea, #764ba2) !important;
    }
    
    .renovolt-badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: bold;
      margin-left: 5px;
      color: white;
    }
    
    .renovolt-badge-dev {
      background: #00a8cc;
    }
  `;
  document.head.appendChild(style);
  applyDecorations();

  return {
    cleanup: () => {
      style.remove();
      document.querySelectorAll(".renovolt-processed").forEach((el) => {
        el.classList.remove(
          "renovolt-processed",
          "renovolt-frame-neon-blue",
          "renovolt-bg-gradient"
        );
        el.querySelector(".renovolt-badges")?.remove();
      });
    },
  };
};

if (typeof window !== "undefined") {
  window.renovolt = initRenovolt();
  console.log("ʀᴇɴᴏᴠᴏʟᴛ | ✓ Plugin loaded successfully !");
}
