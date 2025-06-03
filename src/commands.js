const addCommand = () => {
  window.openRenovolt = createConfigPanel;
  console.info("ʀᴇɴᴏᴠᴏʟᴛ | " + "Command openRenovolt() registered");
};
const cleanupCommands = () => {
  delete window.openRenovolt;
};
