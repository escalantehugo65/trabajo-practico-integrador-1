import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import sequelize from './src/config/database.js';

import './src/models/user.model.js';
import './src/models/profile.model.js';
import './src/models/article.model.js';
import './src/models/tag.model.js';
import './src/models/articleTag.model.js';

import authRoutes from './src/routes/auth.routes.js';
import tagRoutes from './src/routes/tag.routes.js';
import articleRoutes from './src/routes/article.routes.js';
import userRoutes from './src/routes/user.routes.js';
import profileRoutes from './src/routes/profile.routes.js';
import articleTagRoutes from './src/routes/articleTag.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/article-tags', articleTagRoutes);

app.get('/', (_req, res) => {
    res.send('Servidor y API del Blog listos');
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