import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';

export const loginUser = catchAsyncErrors(async ({ body }, res) => {
    // Check user
    const q = 'SELECT * FROM users WHERE username = ?';
    db.query(q, [body.username], (err, data) => {
        if (err) return res.json(err);
        if (!data.length) return res.status(404).json('User not found!');

        // Check password
        const isPasswordCorrect = bcrypt.compareSync(body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(400).json('Wrong username or password!');
        const { password, ...other } = data[0];

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET || 'jwtKey');
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(other);
    });
});

export const logoutUser = catchAsyncErrors(async (req, res) => {
    res.clearCookie('access_token', { sameSite: 'none', secure: true }).status(200).json('User has been logged out.');
});

export const registerUser = catchAsyncErrors(async ({ body }, res) => {
    const { username, email, password } = body;

    // Check existing user
    const q = 'SELECT * FROM users WHERE email = ? OR username = ?';
    db.query(q, [email, username], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json(`User already exists!`);

        // Hash the password and create user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const q = 'INSERT INTO users(`username`,`email`,`password`) VALUES (?,?,?)';
        db.query(q, [username, email, hash], (err, data) => {
            if (err) return res.json(err);
            res.status(200).json('User has been created.');
        });
    });
});