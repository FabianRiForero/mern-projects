import React, { useState, createContext, useContext, useEffect } from 'react'
import { createPostsRequests, deletePostRequest, getPostRequest, getPostsRequests, updatePostRequest } from '../api/posts';

export const postContext = createContext();

export const usePosts = () => {
    const context = useContext(postContext);
    return context;
}

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const res = await getPostsRequests();
        setPosts(res.data);
    }
    const createPost = async post => {
        const res = await createPostsRequests(post);
        setPosts(prev => [...prev, res.data]);
    }
    const getPost = async id => {
        const res = await getPostRequest(id);
        return res.data;
    }
    const updatePost = async (id, post) => {
        const res = await updatePostRequest(id, post);
        setPosts(posts.map(post => post.id === parseInt(id) ? res.data : post));
    }
    const deletePost = async id => {
        const res = await deletePostRequest(id);
        if(res.status === 204){
            setPosts(posts.filter(post => post.id !== parseInt(id)))
        }
    }

    useEffect(() => {
        getPosts();
    }, [])
    return (
        <postContext.Provider value={{ posts, getPosts, createPost, getPost, updatePost, deletePost }}>{children}</postContext.Provider>
    )
}