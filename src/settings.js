let globalSettings = {
  selectedFrame: "neon-blue",
  selectedBackground: "gradient",
  badges: ["dev"],
};

const getSettings = () => globalSettings;

const saveSettings = (newSettings) => {
  globalSettings = { ...globalSettings, ...newSettings };
  console.info("ʀᴇɴᴏᴠᴏʟᴛ | Settings updated:", globalSettings);
};

const findProfileElements = () => {
  const selectors = [
    "[data-user-id]",
    ".message-author",
    ".user-profile",
    ".member-list-item",
  ];

  const profiles = [];
  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(
      selector + ":not(.renovolt-processed)"
    );
    profiles.push(...elements);
  });

  return profiles;
};
