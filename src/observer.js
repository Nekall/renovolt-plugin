const startObserver = () => {
  const observer = new MutationObserver(() => {
    clearTimeout(window.renovoltDecoratorTimeout);
    window.renovoltDecoratorTimeout = setTimeout(() => applyDecorations(), 500);
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.renovoltObserver = observer;
  return observer;
};
const cleanupObserver = () => {
  window.renovoltObserver?.disconnect();
  delete window.renovoltObserver;
  clearTimeout(window.renovoltDecoratorTimeout);
  delete window.renovoltDecoratorTimeout;
};

const pluginInstance = init();
return {
  onUnload: () => {
    if (pluginInstance.cleanup) pluginInstance.cleanup();
    delete window.openRenovolt;
    delete window.renovoltObserver;
    delete window.renovoltDecoratorTimeout;
  },
};
