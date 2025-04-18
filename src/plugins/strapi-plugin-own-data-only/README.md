# Strapi Own Data Only Plugin

This plugin adds an "own data only" permission field to the Users & Permissions plugin in Strapi, allowing you to restrict users to only access their own data.

## Features

- Adds an "Own Data Only" checkbox next to permissions in the Roles section
- Restricts users to only access, modify, or delete their own data when enabled
- Works with existing Strapi permissions system
- Compatible with Strapi 4.5.3

## Requirements

- Strapi 4.5.3
- Node.js 18.17.0
- NPM >= 9.6.0

## Installation

1. Copy the plugin folder to your Strapi project's `src/plugins` directory
2. Add the plugin to your `config/plugins.js` file:

```javascript
module.exports = {
  // ...
  'own-data-only': {
    enabled: true,
    resolve: './src/plugins/strapi-plugin-own-data-only'
  },
  // ...
}
```

3. Restart your Strapi server

## Usage

1. Go to Settings > Roles in your Strapi admin panel
2. Select a role (e.g., "Authenticated")
3. In the permissions section, you'll see a new "Own Data Only" checkbox next to the standard permissions (find, findOne, update, delete)
4. Check this box for any permission you want to restrict to only the user's own data
5. Save your changes

## How It Works

When the "Own Data Only" permission is enabled for a role:

- For `find` operations, the results are automatically filtered to only include the current user's data
- For `findOne`, `update`, and `delete` operations, the user can only access their own record
- If a user attempts to access another user's data, they will receive a 403 Forbidden error
