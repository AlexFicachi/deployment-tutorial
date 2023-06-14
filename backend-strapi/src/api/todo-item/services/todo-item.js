'use strict';

/**
 * todo-item service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::todo-item.todo-item');
