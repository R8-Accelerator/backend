'use strict';

/**
 * invite-code service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::invite-code.invite-code');
