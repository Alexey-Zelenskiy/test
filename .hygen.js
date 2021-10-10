const componentsRoot = 'src/components';
const screensRoot = 'src/screens';
const hooksRoot = 'src/hooks';

const capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const buildComponentName = (filename) =>
  capitalizeString(
    filename
      .toLowerCase()
      .replace(/(-[a-zA-Z])/g, (m, x) => x[1].toUpperCase()),
  );

module.exports = {
  helpers: {
    // Hook
    hookPath: () => hooksRoot,
    buildHookName: (name) => `use${buildComponentName(name)}`,
    buildHookFileName: (name) => `use-${name.toLowerCase()}`,
    // Component
    componentPath: (p) => (p ? `${componentsRoot}/${p}` : componentsRoot),
    buildComponentName: (name) => `${buildComponentName(name)}`,
    buildComponentFileName: (name) => `${name.toLowerCase()}`,
    // Screen
    screenPath: () => screensRoot,
    buildScreenName: (name) => `${buildComponentName(name)}Screen`,
    buildScreenFileName: (name) => `${name.toLowerCase()}-screen`,
  },
};
