'use strict';

/**
 * investor-startup service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::investor-startup.investor-startup');
