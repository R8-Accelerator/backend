'use strict';

module.exports = {
  /**
   * Service to extend the users-permissions plugin
   */
  async extendUsersPermissions(strapi) {
    // Get the users-permissions plugin
    const usersPermissionsPlugin = strapi.plugins['users-permissions'];
    
    if (!usersPermissionsPlugin) {
      strapi.log.error('The users-permissions plugin is not installed. The own-data-only plugin requires it.');
      return;
    }
    
    // Extend the find controller to filter results based on user ownership
    const defaultFind = usersPermissionsPlugin.controllers.user.find;
    usersPermissionsPlugin.controllers.user.find = async (ctx) => {
      // Check if the role has "own data only" permission
      const roleId = ctx.state.user?.role?.id;
      if (!roleId) {
        return defaultFind(ctx);
      }
      
      // Find the permission for the user.find action
      const permissions = await strapi.query('plugin::users-permissions.permission').findMany({
        where: {
          action: 'find',
          controller: 'user',
          role: roleId,
        },
        select: ['ownDataOnly'],
      });
      
      const findPermission = permissions.find(p => p.ownDataOnly === true);
      
      // If "own data only" is enabled, filter results to only show the user's own data
      if (findPermission) {
        ctx.query = {
          ...ctx.query,
          filters: {
            ...ctx.query.filters,
            id: ctx.state.user.id,
          },
        };
      }
      
      // Call the original find controller
      return defaultFind(ctx);
    };
    
    // Similar extension for findOne controller
    const defaultFindOne = usersPermissionsPlugin.controllers.user.findOne;
    usersPermissionsPlugin.controllers.user.findOne = async (ctx) => {
      // Check if the role has "own data only" permission
      const roleId = ctx.state.user?.role?.id;
      if (!roleId) {
        return defaultFindOne(ctx);
      }
      
      // Find the permission for the user.findOne action
      const permissions = await strapi.query('plugin::users-permissions.permission').findMany({
        where: {
          action: 'findOne',
          controller: 'user',
          role: roleId,
        },
        select: ['ownDataOnly'],
      });
      
      const findOnePermission = permissions.find(p => p.ownDataOnly === true);
      
      // If "own data only" is enabled, check if the requested ID matches the user's ID
      if (findOnePermission) {
        if (ctx.params.id.toString() !== ctx.state.user.id.toString()) {
          return ctx.forbidden('You are not allowed to access this resource');
        }
      }
      
      // Call the original findOne controller
      return defaultFindOne(ctx);
    };
    
    // Similar extension for update controller
    const defaultUpdate = usersPermissionsPlugin.controllers.user.update;
    usersPermissionsPlugin.controllers.user.update = async (ctx) => {
      // Check if the role has "own data only" permission
      const roleId = ctx.state.user?.role?.id;
      if (!roleId) {
        return defaultUpdate(ctx);
      }
      
      // Find the permission for the user.update action
      const permissions = await strapi.query('plugin::users-permissions.permission').findMany({
        where: {
          action: 'update',
          controller: 'user',
          role: roleId,
        },
        select: ['ownDataOnly'],
      });
      
      const updatePermission = permissions.find(p => p.ownDataOnly === true);
      
      // If "own data only" is enabled, check if the requested ID matches the user's ID
      if (updatePermission) {
        if (ctx.params.id.toString() !== ctx.state.user.id.toString()) {
          return ctx.forbidden('You are not allowed to access this resource');
        }
      }
      
      // Call the original update controller
      return defaultUpdate(ctx);
    };
    
    // Similar extension for delete controller
    const defaultDelete = usersPermissionsPlugin.controllers.user.delete;
    usersPermissionsPlugin.controllers.user.delete = async (ctx) => {
      // Check if the role has "own data only" permission
      const roleId = ctx.state.user?.role?.id;
      if (!roleId) {
        return defaultDelete(ctx);
      }
      
      // Find the permission for the user.delete action
      const permissions = await strapi.query('plugin::users-permissions.permission').findMany({
        where: {
          action: 'delete',
          controller: 'user',
          role: roleId,
        },
        select: ['ownDataOnly'],
      });
      
      const deletePermission = permissions.find(p => p.ownDataOnly === true);
      
      // If "own data only" is enabled, check if the requested ID matches the user's ID
      if (deletePermission) {
        if (ctx.params.id.toString() !== ctx.state.user.id.toString()) {
          return ctx.forbidden('You are not allowed to access this resource');
        }
      }
      
      // Call the original delete controller
      return defaultDelete(ctx);
    };
  }
};
