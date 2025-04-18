'use strict';

const usersPermissionsService = require('./services/users-permissions');

module.exports = ({ strapi }) => {
  // Extend the permission model to include the ownDataOnly field
  const extendPermissionModel = async () => {
    try {
      // Get the permission model
      const permissionModel = strapi.getModel('plugin::users-permissions.permission');
      
      // Add the ownDataOnly field to the permission model if it doesn't exist
      if (!permissionModel.attributes.ownDataOnly) {
        // Use the schema builder to add the field
        await strapi.db.schema.updateTable('up_permissions', (table) => {
          table.boolean('own_data_only').defaultTo(false);
        });
        
        // Update the model definition
        permissionModel.attributes.ownDataOnly = {
          type: 'boolean',
          default: false,
        };
        
        strapi.log.info('Added ownDataOnly field to permission model');
      }
    } catch (error) {
      strapi.log.error('Error extending permission model:', error);
    }
  };
  
  // Extend the Users & Permissions plugin
  const extendUsersPermissionsPlugin = async () => {
    try {
      await usersPermissionsService.extendUsersPermissions(strapi);
      strapi.log.info('Extended Users & Permissions plugin with own data only functionality');
    } catch (error) {
      strapi.log.error('Error extending Users & Permissions plugin:', error);
    }
  };
  
  return {
    async register() {
      // Register the plugin's policies
      strapi.policy.register({
        name: 'plugin::own-data-only.isOwner',
        plugin: 'own-data-only',
        handler: require('./policies/isOwner'),
      });
    },
    
    async bootstrap() {
      // Extend the permission model
      await extendPermissionModel();
      
      // Extend the Users & Permissions plugin
      await extendUsersPermissionsPlugin();
    },
  };
};
