(function (window, document) {
  "use strict";

  async function loadComponent(targetId, componentPath) {
    var target = document.getElementById(targetId);
    if (!target) {
      return Promise.resolve();
    }

    const response = await fetch(componentPath);
      if (!response.ok) {
          throw new Error("Failed to load component: " + componentPath);
      }
      const markup = await response.text();
      target.innerHTML = markup;
  }

  function loadComponents(componentMap) {
    if (!componentMap || typeof componentMap !== "object") {
      return Promise.resolve();
    }

    var entries = Object.keys(componentMap);
    return Promise.all(
      entries.map(function (targetId) {
        return loadComponent(targetId, componentMap[targetId]);
      })
    );
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = function () {
        reject(new Error("Failed to load script: " + src));
      };
      document.body.appendChild(script);
    });
  }

  function loadScriptsSequentially(scriptPaths) {
    if (!Array.isArray(scriptPaths) || scriptPaths.length === 0) {
      return Promise.resolve();
    }

    return scriptPaths.reduce(function (chain, scriptPath) {
      return chain.then(function () {
        return loadScript(scriptPath);
      });
    }, Promise.resolve());
  }

  window.loadComponent = loadComponent;
  window.loadComponents = loadComponents;
  window.loadScript = loadScript;
  window.loadScriptsSequentially = loadScriptsSequentially;
})(window, document);
