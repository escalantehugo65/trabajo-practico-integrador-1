import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";

const Profile = sequelize.define("Profile", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    first_name: { type: DataTypes.STRING(50), allowNull: true },
    last_name: { type: DataTypes.STRING(50), allowNull: true },
    biography: { type: DataTypes.TEXT, allowNull: true },
    avatar_url: { type: DataTypes.STRING, allowNull: true },
    birth_date: { type: DataTypes.DATEONLY, allowNull: true }
}, {
    tableName: "profiles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

Profile.belongsTo(User, { foreignKey: "user_id", as: "user" });

export default Profile;