'use strict';

/**
 * create-course controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::create-course.create-course');
