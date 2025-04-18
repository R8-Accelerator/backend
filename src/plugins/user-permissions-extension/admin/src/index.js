import pluginId from './pluginId';

export default {
  register(app) {
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'user-permissions-extension',
      Component: () => null,
    });
  },
  bootstrap() {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: data,
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );
    return Promise.resolve(importedTrads);
  },
}; 