import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Profile from "./profile.model.js";
import Article from "./article.model.js";

const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user", allowNull: false }
}, {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    deletedAt: "deleted_at"
});

User.hasOne(Profile, { foreignKey: "user_id", as: "profile" });
User.hasMany(Article, { foreignKey: "user_id", as: "articles" });

export default User;