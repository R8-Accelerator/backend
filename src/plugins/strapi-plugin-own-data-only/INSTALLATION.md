# Installation Guide for Strapi Own Data Only Plugin

This guide will walk you through the process of installing and configuring the "Own Data Only" plugin for Strapi 4.5.3.

## Prerequisites

- Strapi 4.5.3
- Node.js 18.17.0
- NPM >= 9.6.0

## Installation Steps

1. **Extract the plugin files**

   Extract the contents of the `strapi-plugin-own-data-only.zip` file to your Strapi project's `src/plugins` directory. You should have a structure like this:
   
   ```
   your-strapi-project/
   ├── src/
   │   ├── plugins/
   │   │   ├── strapi-plugin-own-data-only/
   │   │   │   ├── src/
   │   │   │   ├── package.json
   │   │   │   └── README.md
   ```

2. **Configure the plugin**

   Create or update your `config/plugins.js` file to enable the plugin:
   
   ```javascript
   module.exports = {
     // ... other plugins
     'own-data-only': {
       enabled: true,
       resolve: './src/plugins/strapi-plugin-own-data-only'
     },
     // ... other plugins
   };
   ```

3. **Install dependencies**

   Navigate to the plugin directory and install its dependencies:
   
   ```bash
   cd src/plugins/strapi-plugin-own-data-only
   npm install
   ```

4. **Rebuild your Strapi admin panel**

   Return to your Strapi project root and rebuild the admin panel:
   
   ```bash
   npm run build
   ```

5. **Restart your Strapi server**

   ```bash
   npm run develop
   ```

## Verifying Installation

After installation, you should see:

1. A new "Own Data Only" entry in the Settings section of your Strapi admin panel
2. When editing roles in the Users & Permissions plugin, you should see a new "Own data only" checkbox next to each permission

## Troubleshooting

If you don't see the "Own data only" checkbox:

1. Make sure you've properly rebuilt the admin panel
2. Clear your browser cache or try in an incognito window
3. Check the Strapi logs for any errors
4. Verify that the plugin is correctly enabled in your `config/plugins.js` file

## Database Changes

This plugin adds a new field `own_data_only` to the `up_permissions` table in your database. This is done automatically when the plugin is first initialized.

## Support

If you encounter any issues with the plugin, please refer to the README.md file for more information or contact the plugin author.
