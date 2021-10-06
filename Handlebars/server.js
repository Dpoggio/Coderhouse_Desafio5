
const express = require('express')
const { routerProductos } = require("./routers/routerProductos.js")
const handlebars = require('express-handlebars')


/**** CONSTANTES ****/
const PORT = process.env.PORT || 8080
const ERROR_CODE = 500

/*** TMP ****/
const Contenedor = require('./contenedor.js')
const ARCHIVO_PRODUCTOS = 'resources/productos.txt'
const productos = new Contenedor(ARCHIVO_PRODUCTOS)

/**** Inicio App ****/
const app = express()

app.engine('hbs', 
    handlebars({
        extname: '.hbs',
        defaultLayout: 'default.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
)

// Middleware incio
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.json())
app.use('/', express.static('public'))
app.use(express.urlencoded({extended: true}))

// Routers
app.get('/', (req, res) => {
    res.render('main')
})

app.get('/productos', async (req, res) => {
    const listaProductos = await productos.getAll()
    res.render('productos', { productos: listaProductos })
})

app.post('/productos', async (req, res) => {
    await productos.save(req.body)
    res.redirect('/')
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