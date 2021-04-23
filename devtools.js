function init() {
  chrome.devtools.inspectedWindow.eval(
    `
    (() => {
      const store = new Map();
      window.__SWR_STORE__ = store;
      console.log('SWR_STORE');
      document.addEventListener('__SWR_STORE__', (event) => {
        const { data, key } = event.detail;
        store.set(key, data);
      });
    })();
    `,
    () => {
      chrome.devtools.panels.create('swr-store', '', 'panel.html');
    },
  );
}

init();

