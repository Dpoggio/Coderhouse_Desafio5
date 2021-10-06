
const express = require('express')
const { routerProductos } = require("./routers/routerProductos.js")


/**** CONSTANTES ****/
const PORT = process.env.PORT || 8080
const ERROR_CODE = 500
const ARCHIVO_PRODUCTOS = 'resources/productos.txt'

/*** TMP ****/
const Contenedor = require('./contenedor.js')
const productos = new Contenedor(ARCHIVO_PRODUCTOS)

/**** Inicio App ****/
const app = express()

// Configuracion Vista
app.set('view engine', 'pug')
app.set('views', './views')

// Middleware incio
app.use(express.json())
app.use('/', express.static('public'))
app.use(express.urlencoded({extended: true}))

// Routers
app.get('/', (req, res) => {
    res.render('main')
})

app.get('/productos', async (req, res) => {
    try {
        const listaProductos = await productos.getAll()
        res.render('productos', { productos: listaProductos })
    } catch (error) {
        next(error)
    }
})

app.post('/productos', async (req, res) => {
    try {
        await productos.save(req.body)
        res.redirect('/')
    } catch (error) {
        next(error)
    }
})

app.use('/api/productos', routerProductos)

// Middleware Errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    const { httpStatusCode = ERROR_CODE } = err
    res.status(httpStatusCode).json({
        error: err.message
    });
})

// Inicio server
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.error(`Error en servidor ${error}`))