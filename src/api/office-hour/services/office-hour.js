'use strict';

/**
 * office-hour service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::office-hour.office-hour');
