const hbs = require('hbs');
const fs = require('fs');


hbs.registerHelper('listarCursos', () => {
    try {
        listaCursos = require('./cursos.json');
    } catch (e){
        return " <p> No hay cursos creados <p>";
    }   
    let texto = "<p> Listado de todos los cursos <p> \
                <table> \
                <thead>  \
                <th> id </th> \
                <th> Nombre </th> \
                <th> Descripcion </th> \
                <th> Valor </th> \
                </thead> \
                <tbody>";
     listaCursos.forEach(curso => {
         texto = texto +
                '<tr>' +
                '<td>' + curso.id + '</td>' +
                '<td>' + curso.nombre + '</td>' +
                '<td>' + curso.descripcion + '</td>' +
                '<td>' + curso.valor + '</td></tr>' 
     });           
     texto = texto + '</tbody></table>';
     return texto
    
})

hbs.registerHelper('listarCursosDisponibles', () => {
    try {
        listaCursos = require('./cursos.json');
    } catch (e){
        return " <p> No hay cursos creados <p>";
    }
    let listaDisponibles = listaCursos.filter(cur => cur.estado == 'disponible') ;
    let texto = "<p> Listado de cursos disponibles<p> \
                <table> \
                <thead>  \
                <th> id </th> \
                <th> Nombre </th> \
                <th> Descripcion </th> \
                <th> Valor </th> \
                <th></th> \
                </thead> \
                <tbody>";
     listaDisponibles.forEach(curso => {
         texto = texto +
                '<tr>' +
                '<td>' + curso.id + '</td>' +
                '<td>' + curso.nombre + '</td>' +
                '<td>' + curso.descripcion + '</td>' +
                '<td>' + curso.valor + '</td>' +
                '<td> <a href=\"/detalle?id='+curso.id +'\"> Ver detalle </a><td></tr>' 
     });           
     texto = texto + '</tbody></table>';
     return texto
    
})

hbs.registerHelper('detalleCurso', (id) => {
    try {
        listaCursos = require('./cursos.json');
    } catch (e) {
        listaCursos = [];
    }
    let curso = listaCursos.find(buscar => buscar.id == id);
     if (curso) {
         texto = '<table>'+
        '<tbody>' +
        '<tr><td>Id:</td><td>' + curso.id + '</td></tr> ' +
        '<tr><td>Nombre:</td><td>' + curso.nombre + '</td></tr>' +
        '<tr><td>Descripcion:</td><td>' + curso.descripcion + '</td></tr>' +
        '<tr><td>Valor:</td><td>' + curso.valor + '</td></tr>' +
        '<tr><td>Modalidad:</td><td>' +curso.modalidad +'<td></tr>'+
        '<tr><td>Intensidad:</td><td>' +curso.intensidad +'<td></tr>'+
        '</tbody></table><br>' +
        '<a href=\"/verCursosDisponibles\">Regresar</a>'
        ;
        return texto;
     } else {
         return '<p><b>No existe curso con ese id </b></p>'
     }
})

hbs.registerHelper('crearCurso',(id, nombre, descripcion, valor, intensidad, modalidad) => {
    try {
        listaCursos = require('./cursos.json');
    } catch (e) {
        listaCursos = [];
    }
    let cur = {
        id : id,
        nombre : nombre,
        descripcion : descripcion,
        valor : valor,
        modalidad: modalidad,
        intensidad : intensidad,
        estado: 'disponible',
        idsInscritos: []
    };
    let duplicado = listaCursos.find(c => c.id == cur.id);
    if (!duplicado) {
        listaCursos.push(cur);
        let datos = JSON.stringify(listaCursos);
        fs.writeFile('./src/cursos.json', datos, (err) => {
            if (err) throw (err);
           
        })
        return "<h2><p>Curso creado con éxito</p></h2>";
    } else {
         return "<h2><p>Ya existe curso con ese id</p></h2>";
    }

})


hbs.registerHelper('listarCursosAdministrador', () => {
    try {
        listaCursosAdm = require('./cursos.json');
    } catch (e){
        return " <p> No hay cursos creados <p>";
    }
	
    let texto = "<p> <center> <b> <font face='Verdana, Geneva, sans-serif' size='2'> LISTADO DE CURSOS </font> </b> </center> <p> \
                <table border='1' cellspacing='0' font-family:'Courier New'> \
                <thead>  \
                <th> Id </th> \
                <th> Nombre </th> \
                <th> Descripción </th> \
                <th> Valor </th> \
				<th> Modalidad </th> \
				<th> Intensidad </th> \
				<th> Estado </th> \
                <th colspan='2'></th> \
                </thead> \
                <tbody>";
     listaCursosAdm.forEach(curso => {
         let mensaje = (curso.estado=='disponible')?'Cerrar curso':'Reabrir curso'
         texto = texto +
                '<tr>' +
                '<td style="width:3%">' + curso.id + '</td>' +
                '<td style="width:20%">' + curso.nombre + '</td>' +
                '<td style="width:25%">' + curso.descripcion + '</td>' +
                '<td style="width:7%">' + curso.valor + '</td>' + 
				'<td style="width:7%">' + curso.modalidad + '</td>' +
                '<td style="width:7%">' + curso.intensidad + '</td>' +
				'<td style="width:7%">' + curso.estado + '</td>' +
                '<td style="width:8%"> <a href=\"/inscritos?id='+curso.id +'\"> Ver Inscritos </a> </td>' +
				'<td style="width:10%"> <a href=\"/actCurso?id='+curso.id +'\">' + mensaje+ '</a></td></tr>'
     });           
     texto = texto + '</tbody></table>';
     return texto
    
})


hbs.registerHelper('inscritosCurso', (id) => {
    try {
        listaCursos = require('./cursos.json');
    } catch (e) {
        listaCursos = [];
    }
    let curso = listaCursos.find(buscar => buscar.id == id);
    if (!curso) {
        return '<p> No encontró el curso <p>'
    } else {
        inscritos = curso.idsInscritos; 
    
     if (inscritos!=null && inscritos.length > 0) {
		 
     let texto = "<p> <center> <b> <font face='Verdana, Geneva, sans-serif' size='2'> LISTADO DE INSCRITOS EN EL CURSO "+ curso.id + " " + curso.nombre + " </font> </b> </center> <p> \
                <table style='width:80%' border='1' cellspacing='0' font-family:'Courier New'> \
                <thead>  \
                <th> Documento </th> \
                <th> Nombre </th> \
				<th> Correo </th> \
				<th> Teléfono </th> \
                <th colspan='2'></th> \
                </thead> \
                <tbody>";
     inscritos.forEach(id => {
         inscrito = datosEstudiante(id)
         texto = texto +
                '<tr>' +
                '<td style="width:15%">' + inscrito.documento + '</td>' +
                '<td style="width:15%">' + inscrito.nombre + '</td>' + 
				'<td style="width:15%">' + inscrito.correo + '</td>' +
                '<td style="width:15%">' + inscrito.telefono + '</td>' +
                '<td style="width:17%"> <a href=\"/elimInscrito?id='+curso.id+'&documento='+ inscrito.documento +'\"> Eliminar inscrito </a></td></tr>'
     });           
     texto = texto + '</tbody></table>' +
	 '<p> <a href=\"/verCursosAdministrador\"> Regresar </a> </p>'; 
	 
     return texto
     } else {
         return '<p><b>No hay estudiantes inscritos para el curso con ese id </b></p>'
     }
    }
})

let datosEstudiante = (id) => {
    try {
        listaEstudiantes = require('./estudiantes.json');
    } catch (e) {
        listaEstudiantes = [];
    }
    let estudiante = listaEstudiantes.find(est => est.documento == id);
    if (estudiante) {
        return estudiante;
    } else {
        return null;
    }

}

hbs.registerHelper('actualizarCurso', (id) => {
    try {
        listaCursos = require('./cursos.json');
    } catch (e) {
        listaCursos = [];
    }
    let curso = listaCursos.find(buscar => buscar.id == id);
     if (curso) {
		 
		if(curso.estado == 'cerrado'){
		curso.estado = 'disponible';
		} else {
		curso.estado = 'cerrado';	
		}
		
		guardar()
		 
         texto = '<table>'+
        '<tbody>' +
        '<tr><td>Id:</td><td>' + curso.id + '</td></tr> ' +
        '<tr><td>Nombre:</td><td>' + curso.nombre + '</td></tr>' +
        '<tr><td>Descripcion:</td><td>' + curso.descripcion + '</td></tr>' +
        '<tr><td>Valor:</td><td>' + curso.valor + '</td></tr>' +
        '<tr><td>Modalidad:</td><td>' +curso.modalidad +'<td></tr>'+
        '<tr><td>Intensidad:</td><td>' +curso.intensidad +'<td></tr>'+
		'<tr><td>Intensidad:</td><td><b>' +curso.estado +'</b><td></tr>'+
        '</tbody></table><br>' +	
		'<h2><p>Estado actualizado con éxito</p></h2> <br>' +
        '<a href=\"/verCursosAdministrador\">Regresar</a>'
        ;
        return texto;
     } else {
         return '<p><b>No existe curso con ese id </b></p>'
     }
})


hbs.registerHelper('eliminarInscrito', (documento, id) => {
    try {
        listaCursos = require('./cursos.json');
    } catch (e) {
        listaCursos = [];
    }
	
    let curso = listaCursos.find(cur => (cur.id==id));
    if (!curso) {
        return '<p> No existe el curso con id: ' + id + '</p>'
    }
    let inscritos = curso.idsInscritos.filter(insc => (insc != documento));
    curso.idsInscritos = inscritos;
    let datos =  JSON.stringify(listaCursos);
    fs.writeFile('./src/cursos.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo cursos actualizado con éxito');
    })


     texto =  '<p> El estudiante ha sido eliminado del curso exitosamente <br>'
                +' <a href=\"/verCursosAdministrador\"> Regresar </a> </p>'; 
	 
     return texto
		
})


const guardar = () => {
	listaCursos = require('./cursos.json');
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('./src/cursos.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo almacenado con éxito');
    })
}






hbs.registerHelper('inscribirCurso',(documento, nombre, correo, telefono, curso) => {
    
    try {
        listaEstudiantes = require('./estudiantes.json');
    } catch (e) {
        listaEstudiantes = [];
    }

    try {
        listaCursos = require('./cursos.json');
    } catch (e) {
        listaCursos = [];
    }

    let selCurso = listaCursos.find(buscar => buscar.id == curso);
     if (selCurso) {
        console.log('Informacion del curso a inscribir');
        console.log(selCurso);
     } else {
         return "<p><b>Seleccione un curso </b></p>" + 
                "<br><a href=\"/inscribirse\"> Regresar </a>";
     }

    let estudiante = {
        documento : documento,
        nombre : nombre,
        correo : correo,
        telefono : telefono
    };

    let existe = listaEstudiantes.find(est => documento == est.documento);
    let texto = "";
    if (!existe) {
        listaEstudiantes.push(estudiante);
     } else {
        if (existe.nombre != nombre) {
            existe.nombre = nombre;
            texto = texto + '<p> Se ha actualizado el nombre del aspirante con documento ' + documento + '<p>'
        } 
        if (existe.correo != correo) {
            existe.correo = correo;
            texto = texto + '<p> Se ha actualizado el correo del aspirante con documento ' + documento + '<p>'
        }
        if (existe.telefono != telefono) {
            existe.telefono = telefono
            texto = texto + '<p> Se ha actualizado el correo del aspirante con documento ' + documento + '<p>'
        }
        
    }
    let datos = JSON.stringify(listaEstudiantes);
    fs.writeFile('./src/estudiantes.json', datos, (err) => {
        if (err) throw (err);
       console.log('Archivo de estudiantes actualizado con exito');
    })
    let yaInscrito = selCurso.idsInscritos.find(doc => doc == documento);
    if (yaInscrito) {
        return texto + "<h2><p>Ya esta registrado en este curso</p></h2>" + 
               "<br><a href=\"/inscribirse\"> Regresar </a>";
    } else {
        selCurso.idsInscritos.push(documento);
        let datos2 =  JSON.stringify(listaCursos);
        fs.writeFile('./src/cursos.json', datos2, (err) => {
            if (err) throw (err);
            console.log('Archivo cursos actualizado con éxito');
        })
        
        return texto + "<h2><p>Estudiante " + estudiante.nombre + " inscrito con exito en el curso de " + selCurso.nombre + "</p></h2>";
    }
    

    
})

    

hbs.registerHelper('selectLstCursos', () => {

    try {
        listaCursos = require('./cursos.json');
    } catch (e){
        let dsb = "<option name='curso' required>Seleccione un curso</option>";
        return "<select name=lstCursos>" + dsb + "</select>";
        
    } 
    let listaDisponibles = listaCursos.filter(cur => cur.estado == 'disponible') ;
    let opciones = "";
    listaDisponibles.forEach(curso => {
        opciones = opciones +
               "<option value=" + curso.id + ">" + curso.nombre + "</option>";
    });
    let texto = "<select name=lstCursos >" + opciones + "</select>";
   
     return texto    
})
