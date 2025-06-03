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
