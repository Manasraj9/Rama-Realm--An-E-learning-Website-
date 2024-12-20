'use strict';

/**
 * create-course router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::create-course.create-course');
