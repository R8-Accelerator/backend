import React from 'react';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginId from './pluginId';
import OwnDataOnlyField from './components/OwnDataOnlyField';

export default {
  register(app) {
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
        cellFormatter: OwnDataOnlyField,
      });

      return {
        permissions,
        layout: newLayout,
      };
    });
  },

  bootstrap(app) {},

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
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
