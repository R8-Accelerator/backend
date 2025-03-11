'use strict';

/**
 * cohort-application service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cohort-application.cohort-application');
