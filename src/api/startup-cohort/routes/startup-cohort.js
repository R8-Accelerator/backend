'use strict';

/**
 * startup-cohort router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::startup-cohort.startup-cohort');
