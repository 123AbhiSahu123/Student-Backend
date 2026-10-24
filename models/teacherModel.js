import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Teacher = sequelize.define("Teacher", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    qualification: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    experience: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        tableName : "teachers"
    }
);

export default Teacher;