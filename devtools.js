function init() {
  chrome.devtools.inspectedWindow.eval(
    `
    (() => {
      document.addEventListener('__SWR_STORE__', (event) => {
        const { data, key } = event.detail;
        console.log(data, key);
        if (!window.__SWR_STORE__) {
          console.log('__SWR_STORE__');
          window.__SWR_STORE__ = new Map();
        }
        window.__SWR_STORE__.set(key, data);
      });
    })();
    `,
    () => {
      chrome.devtools.panels.create('swr-store', '', 'panel.html');
    },
  );
}

init();

