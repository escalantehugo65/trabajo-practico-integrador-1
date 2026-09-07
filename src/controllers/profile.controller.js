import Profile from "../models/profile.model.js";

export const updateProfile = async (req, res) => {
    try {
        const { first_name, last_name, biography, avatar_url, birth_date } = req.body;
        const profile = await Profile.findOne({ where: { user_id: req.user.id } });
        
        if (!profile) {
            return res.status(404).json({ message: "Perfil no encontrado" });
        }

        await profile.update({ first_name, last_name, biography, avatar_url, birth_date });
        res.status(200).json({ message: "Perfil actualizado con exito", profile });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el perfil", error: error.message });
    }
};