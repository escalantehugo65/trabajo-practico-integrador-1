import Article from "../models/article.model.js";
import User from "../models/user.model.js";
import Tag from "../models/tag.model.js";

export const getArticles = async (_req, res) => {
    try {
        const articles = await Article.findAll({
            include: [
                { model: User, as: "author", attributes: { exclude: ["password"] } },
                { model: Tag, as: "tags", through: { attributes: [] } }
            ]
        });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los articulos", error: error.message });
    }
};

export const createArticle = async (req, res) => {
    try {
        const { title, content, excerpt, status } = req.body;
        const newArticle = await Article.create({
            title,
            content,
            excerpt,
            status: status || "published",
            user_id: req.user.id
        });
        res.status(201).json({ message: "Articulo creado con exito", article: newArticle });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el articulo", error: error.message });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, excerpt, status } = req.body;
        const article = await Article.findByPk(id);
        if (!article) {
            return res.status(404).json({ message: "Articulo no encontrado" });
        }
        await article.update({ title, content, excerpt, status });
        res.status(200).json({ message: "Articulo actualizado con exito", article });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el articulo", error: error.message });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findByPk(id);
        if (!article) {
            return res.status(404).json({ message: "Articulo no encontrado" });
        }
        await article.destroy();
        res.status(200).json({ message: "Articulo eliminado con exito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el articulo", error: error.message });
    }
};