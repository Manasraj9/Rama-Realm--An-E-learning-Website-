'use strict';

/**
 * learner-data service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::learner-data.learner-data');
