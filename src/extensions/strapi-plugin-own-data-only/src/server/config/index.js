'use strict';

module.exports = {
  /**
   * Default configuration for the plugin
   */
  default: {
    enabled: true,
  },

  /**
   * Validator function for the plugin configuration
   */
  validator(config) {
    if (typeof config.enabled !== 'boolean') {
      throw new Error('config.enabled must be a boolean');
    }
  },
};
