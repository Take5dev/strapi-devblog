'use strict';

const likePost = require('../routes/like-post');

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
    // Solution 1
    // async find(ctx) {
    //     const { data, meta } = await super.find(ctx);
    //     if (ctx.state.user) {
    //         return { data, meta };
    //     }

    //     console.log(data);
    //     const filteredData = data.filter((post) => !post.attributes.premium);
    //     return { data: filteredData, meta };
    // }

    // Solution 2
    // async find(ctx) {
    //     //const qp = await this.sanitizeParams(ctx);
    //     const isRequestingNonPremium = ctx.query.filters?.premium === false;
    //     if (ctx.state.user || isRequestingNonPremium) {
    //         const { data, meta } = await super.find(ctx);
    //         return { data, meta };
    //     }

    //     const { query } = ctx;
    //     const findOptions = {
    //         ...query,
    //         filters: {
    //             ...query.filters,
    //             premium: false
    //         }
    //     };
    //     console.log(findOptions)

    //     const { results, pagination } = await strapi.service('api::post.post').find(findOptions);
    //     const sanitizedResults = await this.sanitizeOutput(results, ctx);

    //     return this.transformResponse(sanitizedResults, { pagination });
    // }

    // Solution 3
    async find(ctx) {
        const isRequestingNonPremium = ctx.query.filters?.premium === false;
        if (ctx.state.user || isRequestingNonPremium) {
            const { data, meta } = await super.find(ctx);
            return { data, meta };
        }

        const { results, pagination } = await strapi.service('api::post.post').findPublic(ctx);
        const sanitizedResults = await this.sanitizeOutput(results, ctx);

        return this.transformResponse(sanitizedResults, { pagination });
    },

    async findOne(ctx) {
        return await super.findOne(ctx);

        if (ctx.state.user) {
            return await super.findOne(ctx);
        }
        const { id } = ctx.params;
        const { query } = ctx;

        const results = await strapi.service('api::post.post').findOnePublic(id, query);
        const sanitizedResults = await this.sanitizeOutput(results, ctx);

        return this.transformResponse(sanitizedResults);
    },

    async likePost(ctx) {
        // not needed: access is restricted by admin panel permissions
        // if(!ctx.state.user) return ctx.forbidden("You must be authentificated to like a post");

        const user = ctx.state.user;
        const postId = ctx.params.id;
        const { query } = ctx;

        const results = await strapi.service('api::post.post').likePost({ userId: user.id, postId, query });
        const sanitizedResults = await this.sanitizeOutput(results, ctx);

        return this.transformResponse(sanitizedResults);
    }
}));
