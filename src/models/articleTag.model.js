import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Article = sequelize.define("Article", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(100), allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: "articles",
    timestamps: true,
    createdAt: "created_at",
    updated_at: "updated_at"
});

export default Article;