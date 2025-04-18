'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // Register a policy to check if a user is accessing their own data
    strapi.policy.register({
      name: 'plugin::own-data-only.isOwner',
      plugin: 'own-data-only',
      handler: (ctx) => {
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
      }
    });
  },
};
