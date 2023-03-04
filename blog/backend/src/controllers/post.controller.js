import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const getPosts = async ({ query }, res) => {
    const { cat } = query;
    const q = `SELECT * FROM posts ${cat ? `WHERE cat = ?` : ''}`;
    db.query(q, [cat], (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
}

export const getPost = async ({ params }, res) => {
    const { id } = params;
    const q = `SELECT u.username, u.img AS userImg, p.id, p.title, p.desc, p.img, p.cat, p.date FROM users AS u INNER JOIN posts AS p ON p.uid = u.id WHERE p.id = ? LIMIT 1`;
    db.query(q, [id], (err, data) => {
        if (err) return res.json(err);
        res.status(200).json(data[0]);
    });
}

export const addPost = async ({ body, cookies }, res) => {
    const { title, desc, img, cat, date } = body;
    const { access_token } = cookies;
    if (!access_token) return res.status(401).json('Not authenticated!')
    jwt.verify(access_token, process.env.JWT_SECRET || 'jwtKey', (err, data) => {
        if (err) return res.status(403).json('Token is not valid!');

        const q = 'INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?,?,?,?,?,?)';
        console.log({ title, desc, img, cat, date });
        db.query(q, [title, desc, img, cat, date, data.id], (err, data) => {
            // console.log(err);
            if (err) return res.status(500).json(err);
            res.json('Post has been created.');
        })
    });
}

export const updatePost = async ({ body ,cookies, params }, res) => {
    const { id } = params;
    const { title, desc, img, cat, date } = body;
    const { access_token } = cookies;
    if (!access_token) return res.status(401).json('Not authenticated!')
    jwt.verify(access_token, process.env.JWT_SECRET || 'jwtKey', (err, data) => {
        if (err) return res.status(403).json('Token is not valid!');

        const q = 'UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `cat` = ?, `date` = ? WHERE `id` = ? AND `uid` = ?';
        db.query(q, [title, desc, img, cat, date, id, data.id], (err, data) => {
            if (err) return res.status(500).json(err);
            res.json('Post has been updated.');
        })
    });
}

export const deletePost = async ({ cookies, params }, res) => {
    const { id } = params;
    const { access_token } = cookies;
    if (!access_token) return res.status(401).json('Not authenticated!')
    jwt.verify(access_token, process.env.JWT_SECRET || 'jwtKey', (err, data) => {
        if (err) return res.status(403).json('Token is not valid!');

        const q = 'DELETE FROM posts WHERE id = ? AND uid = ?';
        db.query(q, [id, data.id], (err, data) => {
            if (err) return res.status(403).json('You can delete only your post!');
            res.json('Post has been delete!');
        });
    });
}
