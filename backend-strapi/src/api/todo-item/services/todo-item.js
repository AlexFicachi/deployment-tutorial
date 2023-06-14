'use strict';

/**
 * todo-item service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::todo-item.todo-item');


module.exports = createCoreService(
    "api::todo-item.todo-item",
    ({ strapi }) => ({
        deleteTodoItemsContaining: async (ctx, deleteWords) => {
            const vulgarTodoItemIds = []

            const todoItems = await strapi.entityService.findMany('api::todo-item.todo-item');

            for (let todoItem of todoItems) {
                for (let vulgarWord of deleteWords) {
                    if (todoItem.title.includes(vulgarWord)) {
                        vulgarTodoItemIds.push(todoItem.id);
                        break;
                    }
                }
            }

            for (let id of vulgarTodoItemIds) {
                await strapi.entityService.delete('api::todo-item.todo-item', id);
            }


            return "deleted successfully"
        },
    }),
);



