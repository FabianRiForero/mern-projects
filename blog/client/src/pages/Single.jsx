import React, { useContext, useEffect, useState } from 'react'
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split('/')[2];

  const { currentUser } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    dataFetch();
  }, [postId]);

  const getText = html => {
    const doc = new DOMParser().parseFromString(html,'text/html');
    return doc.body.textContent;
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`/upload/${post?.img}`} alt="img" />
        <div className="user">
          {post.userImg && <img src={post?.userImg} alt="img" />}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post?.username && <div className="edit">
            <Link to={`/write?edit=${post.id}`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" onClick={handleDelete} />
          </div>}
        </div>
        <h1>{post?.title}</h1>
        <p>{getText(post?.desc)}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}

export default Single