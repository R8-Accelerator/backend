'use strict';

/**
 * `isOwner` policy
 * Checks if the user is accessing their own data
 */
module.exports = async (ctx, config, { strapi }) => {
  // Get the current authenticated user
  const user = ctx.state.user;
  
  // If no user is authenticated, deny access
  if (!user) {
    return false;
  }

  // Get the ID from the URL parameters
  const { id } = ctx.params;
  
  // If no ID is provided, we need to filter the results in the controller
  if (!id) {
    // Add a filter to only return the current user's data
    ctx.query = {
      ...ctx.query,
      filters: {
        ...ctx.query.filters,
        id: user.id,
      },
    };
    return true;
  }
  
  // Check if the requested ID matches the user's ID
  return user.id.toString() === id.toString();
};
