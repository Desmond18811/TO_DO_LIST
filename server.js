import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './routes/todos.js';
import connectToDatabase from './mongoDb.js';
import 'dotenv/config'; // Add this line

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Desmond todo list API 🚀');
});

// Connect to database and start server
connectToDatabase()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}🔵`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });