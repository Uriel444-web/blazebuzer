export let reportes = []; // Variable global dentro del módulo
export function inicializar() {
    recargarTablaReportes();
}

export async function recargarTablaReportes(){
    // url de la api getAll
    let url = "http://localhost:8080/blazebuzer_web/api/Reporte/getAll";
    
    // Invocamos el servicio:
    let resp = await fetch(url);
    
    // Convertimos la respuesta del servicio en un documento JSON:
    let datos = await resp.json();
    
    // Aqui se guardara el contenido HTML de la tabla, con los datos
    // de los reportes que devolvio el servicio:
    let contenido = '';
    
    // Verificamos si hubo al gun error:
    if (datos.error != null)
    {
        Swal.fire('Error al consultar.', datos.error, 'error');
    }else{
        // guardamos el arreglo de reportes que nos dio el servicio
        // en una variable local.
        reportes = datos;
        
        // recorremos con un for el arreglo
        for (var i = 0; i < reportes.length; i++) {
            contenido += '<tr>' +
                                '<td>'+ reportes[i].titulo+'</td>'+
                                '<td>'+reportes[i].descripcion+'</td>'+
                                '<td>'+reportes[i].fecha+'</td>'+
                                '<td>'+
                                    '<button type="button" class="btn btn-sm btn-edit" id="btnEditar"'+
                                    'onclick="editar(' + i + ')">'+'✏️ Editar'+'</button>'+
                                    '<button class="btn btn-sm btn-delete" id="btnEliminar">'+'🗑️ Eliminar'+'</button>'+
                                '</td>'+
                            '</tr>';
        }
    }
    
    // una vez recorrido, se imprime en pantalla
    
    document.getElementById("tbodyReportes").innerHTML = contenido;
}

// EVENTOS ONCLICK CON ELEMENTBYID
document.getElementById("btnFiltroDate").addEventListener('click', extraerFecha);

// AL MOMENTO DE HACER CLICK EN UN REGISTRO ENVIA UN PARAMETRO (POS) A ESTA FUNCION (EDIT)
// QUE PRIMERO CARGARA LA VIEWEDIT IMPORTANDO TAMBIEN SU CONTROLADOR JS, DESPUES DE ESTO
// EJECUTARA LA FUNCION CARGARDETALLE PASANDOLE EL PARAMETRO POS QUE RECIBIO EDIT
async function editar(pos){
   let url="http://localhost:8080/blazebuzer_web/Modules/moduloReporte/editReport.html";
   let resp = await fetch(url);
   let contenido = await resp.text();
   document.getElementById('viewReporte').innerHTML = contenido;
   cm = await import("http://localhost:8080/blazebuzer_web/Modules/moduloReporte/editReport.js");
   cargarDetalle(pos);
}
// AQUI RECIBIMOS EL PARAMETRO POS ENVIADO POR EDIT, Y PONDREMOS SUS VALORES EN EL FORMULARIO PARA
// PODERLOS EDITAR EXCEPTO LA FECHA
export function cargarDetalle(pos){
    let r = reportes[pos];
    
    if(r == null){
         Swal.fire('', 'No se encontraron los datos del alimento.', 'error');
    }else{
        let fechaOriginal = r.fecha; // Formato incorrecto
        let fechaObjeto = new Date(fechaOriginal); // Convertimos a Date
        let fechaFormateada = fechaObjeto.toISOString().split("T")[0]; 
        document.getElementById("txtTitulo").value = r.titulo;
        document.getElementById("txtDescripcion").value = r.descripcion;
        document.getElementById("txtDate").value = fechaFormateada;
    }
}

// vamos a extraer la fecha que selecciono el usuario en el formulario para pode
// enviar la peticion/consulta a la API
async function extraerFecha(){
    let fechaSeleccionada = document.getElementById("fecha").value;
    console.log("Fecha seleccionada:", fechaSeleccionada);
}


window.editar = editar;


