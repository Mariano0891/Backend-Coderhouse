import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import {viewsRouter} from './routes/views.routes.js';
import {Server} from 'socket.io';
import { cartRouter } from "./routes/carts.routes.js";
import { productRouter } from "./routes/products.routes.js";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const httpServer = app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use('/', viewsRouter);
app.use("/realTimeProducts", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
