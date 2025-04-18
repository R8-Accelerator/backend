module.exports = {
  register({ strapi }) {
    // Extend the user-permissions plugin
    strapi.plugin('users-permissions').service('permission').extend({
      async checkPermission(ctx, permission) {
        const { user } = ctx.state;
        
        // Get the role's permissions
        const role = await strapi.query('plugin::users-permissions.role').findOne({
          where: { id: user.role.id },
          populate: ['permissions'],
        });

        // Check if the permission exists and if it's an "own data only" permission
        const hasPermission = role.permissions.some(p => 
          p.action === permission && p.subject === permission.split('.')[0]
        );

        if (!hasPermission) {
          return false;
        }

        // Check if it's an "own data only" permission
        const isOwnDataOnly = role.permissions.some(p => 
          p.action === permission && 
          p.subject === permission.split('.')[0] &&
          p.ownDataOnly === true
        );

        if (isOwnDataOnly) {
          // For find operations, filter by user ID
          if (permission.includes('find')) {
            ctx.query.filters = {
              ...ctx.query.filters,
              user: user.id,
            };
          }
          // For update/delete operations, check if the user owns the record
          else if (permission.includes('update') || permission.includes('delete')) {
            const record = await strapi.query(permission.split('.')[0]).findOne({
              where: { id: ctx.params.id },
            });
            
            if (!record || record.user.id !== user.id) {
              return false;
            }
          }
        }

        return true;
      },
    });
  },
}; 