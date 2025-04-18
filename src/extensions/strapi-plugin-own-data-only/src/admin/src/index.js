'use strict';

module.exports = {
  type: 'admin',
  
  /**
   * Register the plugin's admin panel UI components
   */
  register(app) {
    // Register the plugin's icon in the main navigation
    app.addMenuLink({
      to: '/settings/own-data-only',
      icon: 'lock',
      intlLabel: {
        id: 'own-data-only.plugin.name',
        defaultMessage: 'Own Data Only',
      },
      Component: async () => {
        const component = await import('./pages/App');
        return component;
      },
      permissions: [{ action: 'plugin::own-data-only.settings.read', subject: null }],
    });

    // Extend the permissions form with our custom field
    app.registerHook('Admin/Roles/PluginsAndSettings/permissions/inject-column', ({ permissions, layout }) => {
      // Only add the field to the users-permissions plugin
      if (permissions.plugin !== 'users-permissions') {
        return { permissions, layout };
      }

      // Add our custom field to the layout
      const newLayout = [...layout];
      newLayout.push({
        key: 'ownDataOnly',
        name: 'Own data only',
        cellFormatter: async () => {
          const component = await import('./components/OwnDataOnlyField');
          return component.default;
        },
      });

      return {
        permissions,
        layout: newLayout,
      };
    });
  },

  /**
   * Bootstrap the plugin's admin panel UI
   */
  bootstrap(app) {
    // Add translations
    app.addReducers((state) => {
      const nextState = { ...state };
      return nextState;
    });
  },
};
