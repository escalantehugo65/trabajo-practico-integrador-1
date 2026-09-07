import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Tag from "./tag.model.js";
import ArticleTag from "./articleTag.model.js";

const Article = sequelize.define("Article", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(200), allowNull: false, validate: { len: [3, 200] } },
    content: { type: DataTypes.TEXT, allowNull: false, validate: { len: [50, Infinity] } },
    excerpt: { type: DataTypes.STRING(500), allowNull: true },
    status: { type: DataTypes.ENUM("published", "archived"), defaultValue: "published", allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: "articles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

//Article.belongsTo(User, { foreignKey: "user_id", as: "author" });
//Article.belongsToMany(Tag, { through: ArticleTag, foreignKey: "article_id", otherKey: "tag_id", as: "tags", onDelete: "CASCADE" });

export default Article;