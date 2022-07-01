const express = require('express');
const Contenedor = require('./container');
const app = express();
const contenedroProductos = new Contenedor('./productos.txt');
app.listen(8080,() => console.log(`Server running in port  http://localhost:${8080}`));


app.get('/productos',async (req, res) => {
    try{
        const productos = await contenedroProductos.getAll();
        res.send(productos);
    } catch {error} {
        res.send(error);
    }
});

app.get('/productosRandom', async (req, res) => {
    const productos = await contenedroProductos.getAll();

    const indice = Math.floor(Math.random() * productos.length);
    
    res.send(productos[indice]);
})
    
