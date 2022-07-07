import express from "express";
import handlebars from "express-handlebars";
import {Server as HttpServer} from 'http';
import { FilesystemContainer } from "./src/api/FilesystemContainer.js";
import { ContenedorMemoria } from "./src/api/Contenedor.js";
import {Server as IOServer} from 'socket.io'
import { DATE_UTILS } from "./src/utils/index.js";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)

const PORT = 8080;

// app.engine(
//   "hbs",
//   handlebars.engine({
//     extname: ".hbs",
//     defaultLayout: "main.hbs",
//   })
// );

// app.set("view engine", "hbs");
// app.set("views", "../views");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/productos", productRouter);

// app.get("/", (req, res) => {
//   res.render("forms");
// });



// const server = app.listen(PORT, () => {
//   console.log(`Escuchando en el puerto ${server.address().port}`)
// })
// server.on("error", error => console.log(`Error en el servidor. ${error}`))
const messageApi = new ContenedorMemoria()
const ProductsApi= new FilesystemContainer()

app.use(express.static("public"));

io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  socket.emit("mensajes", messageApi.getAll());

  socket.on("mensajeNuevo", ({ email, text }) => {
    const message = { email, text, timestamp: DATE_UTILS.getTimestamp() };
    messageApi.save(message);

    io.sockets.emit("mensajes", messageApi.getAll());
  });

  socket.emit("products", await ProductsApi.getAll());

  socket.on("add-product", async (data) => {
    const products = await ProductsApi.save(data);

    io.sockets.emit("products", products);
  });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});
