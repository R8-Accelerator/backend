'use strict';

module.exports = (plugin) => {
  // Add a policy to check if user is accessing their own data
  plugin.policies = {
    ...plugin.policies,
    'own-data-only': (ctx) => {
      // Get the current authenticated user
      const user = ctx.state.user;
      
      // If no user is authenticated, deny access
      if (!user) {
        return false;
      }

      // Get the ID from the URL parameters
      const { id } = ctx.params;
      
      // If no ID is provided, allow the request to proceed
      // This handles cases like find() where we'll filter in the controller
      if (!id) {
        return true;
      }
      
      // Check if the requested ID matches the user's ID
      return user.id.toString() === id.toString();
    },
  };

  // Extend the find controller to filter results based on user ownership
  const defaultFind = plugin.controllers.user.find;
  plugin.controllers.user.find = async (ctx) => {
    // Check if the role has "own data only" permission
    const roleId = ctx.state.user.role.id;
    const permissionService = strapi.plugin('users-permissions').service('permission');
    const permissions = await permissionService.findUserPermissions(roleId);
    
    // Find the permission for the user.find action
    const findPermission = permissions.find(p => 
      p.action === 'find' && 
      p.controller === 'user' &&
      p.ownDataOnly === true
    );
    
    // If "own data only" is enabled, filter results to only show the user's own data
    if (findPermission && findPermission.ownDataOnly) {
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
  const defaultFindOne = plugin.controllers.user.findOne;
  plugin.controllers.user.findOne = async (ctx) => {
    // Check if the role has "own data only" permission
    const roleId = ctx.state.user.role.id;
    const permissionService = strapi.plugin('users-permissions').service('permission');
    const permissions = await permissionService.findUserPermissions(roleId);
    
    // Find the permission for the user.findOne action
    const findOnePermission = permissions.find(p => 
      p.action === 'findOne' && 
      p.controller === 'user' &&
      p.ownDataOnly === true
    );
    
    // If "own data only" is enabled, check if the requested ID matches the user's ID
    if (findOnePermission && findOnePermission.ownDataOnly) {
      if (ctx.params.id.toString() !== ctx.state.user.id.toString()) {
        return ctx.forbidden('You are not allowed to access this resource');
      }
    }
    
    // Call the original findOne controller
    return defaultFindOne(ctx);
  };

  // Similar extension for update controller
  const defaultUpdate = plugin.controllers.user.update;
  plugin.controllers.user.update = async (ctx) => {
    // Check if the role has "own data only" permission
    const roleId = ctx.state.user.role.id;
    const permissionService = strapi.plugin('users-permissions').service('permission');
    const permissions = await permissionService.findUserPermissions(roleId);
    
    // Find the permission for the user.update action
    const updatePermission = permissions.find(p => 
      p.action === 'update' && 
      p.controller === 'user' &&
      p.ownDataOnly === true
    );
    
    // If "own data only" is enabled, check if the requested ID matches the user's ID
    if (updatePermission && updatePermission.ownDataOnly) {
      if (ctx.params.id.toString() !== ctx.state.user.id.toString()) {
        return ctx.forbidden('You are not allowed to access this resource');
      }
    }
    
    // Call the original update controller
    return defaultUpdate(ctx);
  };

  // Similar extension for delete controller
  const defaultDelete = plugin.controllers.user.delete;
  plugin.controllers.user.delete = async (ctx) => {
    // Check if the role has "own data only" permission
    const roleId = ctx.state.user.role.id;
    const permissionService = strapi.plugin('users-permissions').service('permission');
    const permissions = await permissionService.findUserPermissions(roleId);
    
    // Find the permission for the user.delete action
    const deletePermission = permissions.find(p => 
      p.action === 'delete' && 
      p.controller === 'user' &&
      p.ownDataOnly === true
    );
    
    // If "own data only" is enabled, check if the requested ID matches the user's ID
    if (deletePermission && deletePermission.ownDataOnly) {
      if (ctx.params.id.toString() !== ctx.state.user.id.toString()) {
        return ctx.forbidden('You are not allowed to access this resource');
      }
    }
    
    // Call the original delete controller
    return defaultDelete(ctx);
  };

  // Extend the permission model to include the ownDataOnly field
  const extendPermissionModel = async () => {
    const permissionService = strapi.plugin('users-permissions').service('permission');
    
    // Add the ownDataOnly field to the permission model
    if (!permissionService.permission.schema.attributes.ownDataOnly) {
      permissionService.permission.schema.attributes.ownDataOnly = {
        type: 'boolean',
        default: false,
      };
    }
  };

  // Call the function to extend the permission model
  extendPermissionModel();

  return plugin;
};
