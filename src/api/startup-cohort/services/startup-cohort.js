'use strict';

/**
 * startup-cohort service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::startup-cohort.startup-cohort');
