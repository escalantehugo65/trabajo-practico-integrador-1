import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Tag = sequelize.define("Tag", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(30), allowNull: false, unique: true, validate: { len: [2, 30] } }
}, {
    tableName: "tags",
    timestamps: true,
    createdAt: "created_at",
    updated_at: "updated_at"
});

export default Tag;