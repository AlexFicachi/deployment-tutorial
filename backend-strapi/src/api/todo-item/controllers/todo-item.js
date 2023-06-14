'use strict';

/**
 * todo-item controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
    "api::todo-item.todo-item",
    ({ strapi }) => ({
        deleteVulgarity: async (ctx) => {
            const vulgarWords = ["fuck", "shit"]
            return strapi.service("api::todo-item.todo-item").deleteTodoItemsContaining(ctx, vulgarWords);
        },
        deleteCustom: async (ctx) => {
            const vulgarWords = ["e"]
            return strapi.service("api::todo-item.todo-item").deleteTodoItemsContaining(ctx, vulgarWords);
        },
    }),
);
