'use strict';

module.exports = ({ strapi }) => ({
  /**
   * Extend the permission service to handle the ownDataOnly field
   */
  async updatePermission(params) {
    const { role, action, controller, plugin, ownDataOnly } = params;
    
    // Find the existing permission
    const permission = await strapi.query('plugin::users-permissions.permission').findOne({
      where: {
        action,
        controller,
        role: role.id,
        plugin,
      },
    });
    
    // If permission exists, update it with the ownDataOnly field
    if (permission) {
      return strapi.query('plugin::users-permissions.permission').update({
        where: { id: permission.id },
        data: { ownDataOnly },
      });
    }
    
    // If permission doesn't exist, create it
    return strapi.query('plugin::users-permissions.permission').create({
      data: {
        action,
        controller,
        role: role.id,
        plugin,
        ownDataOnly,
      },
    });
  },
  
  /**
   * Get all permissions for a role with the ownDataOnly field
   */
  async getPermissions(params) {
    const { role } = params;
    
    return strapi.query('plugin::users-permissions.permission').findMany({
      where: { role: role.id },
      select: ['action', 'controller', 'plugin', 'ownDataOnly'],
    });
  },
});
