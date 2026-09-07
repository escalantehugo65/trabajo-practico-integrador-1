import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Article from "./article.model.js";
import ArticleTag from "./articleTag.model.js";

const Tag = sequelize.define("Tag", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(30), allowNull: false, unique: true, validate: { len: [2, 30] } }
}, {
    tableName: "tags",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

Tag.belongsToMany(Article, { through: ArticleTag, foreignKey: "tag_id", otherKey: "article_id", as: "articles" });

export default Tag;