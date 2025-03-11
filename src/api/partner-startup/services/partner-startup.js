'use strict';

/**
 * partner-startup service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::partner-startup.partner-startup');
