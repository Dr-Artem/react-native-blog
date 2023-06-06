export const selectAllPosts = (state) => state.post.allPosts;
export const selectComments = (state, id) => {
    const post = state.post.allPosts.find((post) => post.id === id);
    return post ? post.comments : [];
};
