import express from 'express'
import dotenv from 'dotenv'
import path from 'path';
dotenv.config();
import { notFound, errorHandle} from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 8080;
import userRoutes from "./routes/userRoutes.js";
import cookieParser from 'cookie-parser';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());

if ( process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandle);
app.get('/', (req,res) => res.send('Server is Ready'));

app.listen(port, () => console.log(`Server started on port ${port}`));