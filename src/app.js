const express = require('express')
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('./helpers');

const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../partials');

app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);

app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
    res.render('index', {
        estudiante: 'Jorge'
    });
});



app.get('/verCursosDisponibles', (req,res) => {
    res.render('cursosDisponibles', {})
})

app.get('/crearCurso', (req,res) => {
    
    res.render('crearCurso', {})
})

app.get('/detalle', (req,res) => {
   // console.log(req.query);
    res.render('detalleCurso', {
        id: req.query.id
    })
})



    app.post('/creaCurso', (req, res) => {
    res.render('creaCurso',{
        id: req.body.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        valor: req.body.valor,
        modalidad: req.body.modalidad,
        intensidad: req.body.intensidad 
    });
});

app.get('/rolCoordinador', (req, res) => {
    res.render('coordinador',{})
})

app.get('/rolInteresado', (req, res) => {
    res.render('interesado',{})
})

app.get('/rolAspirante', (req, res) => {
    res.render('aspirante',{})
})


app.get('/verCursosAdministrador', (req,res) => {
    res.render('cursosAdministrador', {})
})


app.get('/verInscritosCurso', (req,res) => {
    res.render('inscritosCurso', {listaAllCursos: "valor prueba"})
})


app.get('/inscritos', (req,res) => {
    res.render('inscritosCurso', {
        id: req.query.id
    })
})


app.get('/actCurso', (req,res) => {
    res.render('actualizarCurso', {
        id: req.query.id
    })
})


app.get('/elimInscrito', (req,res) => {
    res.render('eliminarInscrito', {
		documento: req.query.documento,
        id: req.query.id
    })
})



app.get('/inscribirse', (req,res) => {
    res.render('inscribirseCurso', {})
})


app.post('/inscribirCurso', (req, res) => {
    res.render('inscribirCurso',{
        documento: req.body.documento,
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        curso: req.body.lstCursos

    });
});






app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
})