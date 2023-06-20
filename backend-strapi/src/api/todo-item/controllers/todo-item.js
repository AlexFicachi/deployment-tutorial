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
        find: async (ctx) => {
            const todoItems = await strapi.entityService.findMany('api::todo-item.todo-item', { sort: 'createdAt' });

            return {
                data: todoItems.map(todoItem => ({
                    id: todoItem.id,
                    attributes: todoItem
                }))
            }
        },
    }),
);
