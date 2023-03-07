import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000'

export const getPostsRequests = async () => await axios.get('/posts');

export const createPostsRequests = async post => {
  const form = new FormData();
  for (const key in post) {
    form.append(key, post[key]);
  }
  return await axios.post('/posts', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

export const getPostRequest = async id => await axios.get('/posts/' + id);

export const updatePostRequest = async (id, newField) => await axios.put(`/posts/${id}`, newField);

export const deletePostRequest = async id => await axios.delete(`/posts/${id}`);