import { Sequelize } from 'sequelize';
import db from '../db.js'

const { DataTypes } = Sequelize;

const alias = 'Post';
const cols = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        unique: {
            args: true,
            msg: 'Ya existe este titulo'
        },
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image: {
        // type: DataTypes.STRING
        type: DataTypes.JSON
    }
};
const config = {
    tableName: 'posts',
    timestamps: true
};

const Post = db.define(alias, cols, config);

export default Post;