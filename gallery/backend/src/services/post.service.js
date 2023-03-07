import Post from '../database/models/Post.js';

export default {
    findAllPosts: async () => {
        const posts = await Post.findAll();
        return posts;
    },
    findPostById: async (id) => {
        const post = await Post.findByPk(id);
        return post;
    },
    insertPost: async (data = {}) => {
        const post = await Post.create({ ...data });
        return post;
    },
    removePostById: async (id) => {
        const post = await Post.destroy({ where: { id } });
        return post;
    },
    updatePostById: async (id, data = {}) => {
        const post = await Post.update({ ...data }, { where: { id } });
        return post;
    }
}