import Tag from "../models/tag.model.js";

export const getTags = async (_req, res) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las etiquetas", error: error.message });
    }
};

export const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const existingTag = await Tag.findOne({ where: { name } });
        if (existingTag) {
            return res.status(400).json({ message: "La etiqueta ya existe" });
        }
        const newTag = await Tag.create({ name });
        res.status(201).json({ message: "Etiqueta creada con exito", tag: newTag });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la etiqueta", error: error.message });
    }
};

export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ message: "Etiqueta no encontrada" });
        }
        await tag.destroy();
        res.status(200).json({ message: "Etiqueta eliminada con exito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la etiqueta", error: error.message });
    }
};