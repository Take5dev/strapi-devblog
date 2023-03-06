module.exports = {
    routes: [
        {
            auth: true,
            method: "PUT",
            path: "/posts/:id/like",
            handler: "api::post.post.likePost"
        }
    ]
};