import Article from "../models/article.model.js";

export const ownerMiddleware = async (req, res, next) => {
    try {
        const articleId = req.params.id;
        const article = await Article.findByPk(articleId);
        if (!article) {
            return res.status(404).json({ message: "Articulo no encontrado" });
        }
        if (req.user.role === "admin" || article.user_id === req.user.id) {
            return next();
        }
        return res.status(403).json({ message: "Acceso denegado, no eres el autor de este articulo" });
    } catch (error) {
        res.status(500).json({ message: "Error al verificar la propiedad del articulo", error: error.message });
    }
};