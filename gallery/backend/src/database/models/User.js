import { Sequelize } from 'sequelize';
import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { DataTypes } = Sequelize;

const alias = '';
const cols = {};
const config = {};

const User = db.define(alias, cols, config);

export default User;