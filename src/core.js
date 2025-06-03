const init = () => {
  console.info("ʀᴇɴᴏᴠᴏʟᴛ | Initializing...");

  injectBaseStyles();
  createRenovoltButton();
  applyDecorations();
  startObserver();
  addCommand();

  console.info("ʀᴇɴᴏᴠᴏʟᴛ | Ready! Click the button or type openRenovolt()");

  return {
    cleanup,
    applyDecorations,
    createConfigPanel,
  };
};
const cleanup = () => {
  console.info("ʀᴇɴᴏᴠᴏʟᴛ | " + "Unloading Renovolt...");
  cleanupStyles();
  cleanupButton();
  //cleanupDecorations();
  cleanupObserver();
  cleanupCommands();
};
