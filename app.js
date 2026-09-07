import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize from './src/config/database.js';

import './src/models/user.model.js';
import './src/models/profile.model.js';
import './src/models/article.model.js';
import './src/models/tag.model.js';
import './src/models/articleTag.model.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (_req, res) => {
    res.send('Servidor y Modelos del Blog listos');
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexion a MySQL establecida correctamente.');

        await sequelize.sync({ alter: true });
        console.log('Tablas y relaciones sincronizadas con exito.');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer();