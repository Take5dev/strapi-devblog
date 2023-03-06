'use strict';

/**
 * post service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::post.post', ({ strapi }) => ({
    async findPublic(...args) {
        // Calling the default core controller
        const newQuery = {
            ...args,
            filters: {
                ...args.filters,
                premium: false
            }
        };
        const { results, pagination } = await super.find(this.getFetchParams(newQuery));

        return { results, pagination };
    },

    async findOnePublic(id, ...query) {
        const results = await super.findOne(id, this.getFetchParams(query)); // await strapi.entityService.findOne("api::post.post", id, this.getFetchParams(query));
        return results?.premium ? null : results;
    },

    async likePost(args) {
        const { userId, postId, query } = args;

        const postToLike = await strapi.entityService.findOne("api::post.post", postId, {
            populate: ['likedBy']
        });

        const updatedPost = await strapi.entityService.update("api::post.post", postId, this.getFetchParams({
            data: {
                likedBy: [...postToLike.likedBy, userId]
            },
            ...query
        }));
        return updatedPost;
    }
}));
