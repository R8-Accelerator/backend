'use strict';

/**
 * startup controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::accelerator.accelerator');