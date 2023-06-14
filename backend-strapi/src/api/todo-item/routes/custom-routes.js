module.exports = {
    routes: [
        {
            method: "DELETE",
            path: "/delete-vulgarity",
            handler: "todo-item.deleteVulgarity",
        },
        {
            method: "DELETE",
            path: "/delete-custom",
            handler: "todo-item.deleteCustom",
        },
    ],
};
