import ArticleTag from "../models/articleTag.model.js";
import Article from "../models/article.model.js";
import Tag from "../models/tag.model.js";

export const addTagToArticle = async (req, res) => {
    try {
        const { article_id, tag_id } = req.body;
        const article = await Article.findByPk(article_id);
        const tag = await Tag.findByPk(tag_id);

        if (!article || !tag) {
            return res.status(404).json({ message: "Articulo o etiqueta no encontrados" });
        }

        if (req.user.role !== "admin" && article.user_id !== req.user.id) {
            return res.status(403).json({ message: "No autorizado para modificar este articulo" });
        }

        const existingRelation = await ArticleTag.findOne({ where: { article_id, tag_id } });
        if (existingRelation) {
            return res.status(400).json({ message: "El articulo ya tiene asociada esta etiqueta" });
        }

        const relation = await ArticleTag.create({ article_id, tag_id });
        res.status(201).json({ message: "Etiqueta asociada al articulo con exito", relation });
    } catch (error) {
        res.status(500).json({ message: "Error al asociar la etiqueta", error: error.message });
    }
};

export const removeTagFromArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const relation = await ArticleTag.findByPk(id);
        if (!relation) {
            return res.status(404).json({ message: "Asociacion no encontrada" });
        }

        const article = await Article.findByPk(relation.article_id);
        if (req.user.role !== "admin" && article && article.user_id !== req.user.id) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await relation.destroy();
        res.status(200).json({ message: "Etiqueta removida del articulo con exito" });
    } catch (error) {
        res.status(500).json({ message: "Error al remover la etiqueta", error: error.message });
    }
};