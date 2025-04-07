export let reportes = [];
let id = null;// Variable global dentro del módulo
export function inicializar() {
    recargarTablaReportes();
}

export async function recargarTablaReportes(){
    // url de la api getAll
    let url = "http://localhost:8080/blazebuzer_web/api/Reporte/getAllUsuario";
    
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
                                    '<button class="btn btn-sm btn-delete" id="btnEliminar" '+
                                    'onclick="eliminar(' + i + ')">'+'🗑️ Eliminar'+'</button>'+
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
   cargarDetalle(pos);
   document.getElementById("btnActualizar").addEventListener('click', Update);
}

// AQUI AGREGAREMOS LA FUNCION DE ELIMMINACION DE MANERA LOGICA, SOLO CAMBIAREMOS EL ESTATUS DE EL REPORTE
// A 2, DONDE 0 ES NO ACEPTADO, 1 ES ACEPTADO Y 2 ES ELIMINADO
async function eliminar(pos){
    let r = reportes[pos];
    
    if(r == null){
         Swal.fire('', 'No se encontraron los datos del reporte.', 'error');
    }else{
       // let fechaOriginal = r.fecha; // Formato incorrecto
       // let fechaObjeto = new Date(fechaOriginal); // Convertimos a Date
       // let fechaFormateada = fechaObjeto.toISOString().split("T")[0]; 
         console.log(r.id);
      // url de la api getAll
    let url = "http://localhost:8080/blazebuzer_web/api/Reporte/delete";
    
    // Invocamos el servicio:
   
    let datos = {idReporte : JSON.stringify(r.id)};
    let params = new URLSearchParams(datos);
    let opciones =  {
                    method  : "POST",
                    headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                    body    : params
                };
    
    let resp = await fetch(url, opciones);
    let data = await resp.json();
    
    if (data.error != null)
    {
        Swal.fire('', data.error, 'error');
    }
    else
    {
        recargarTablaReportes();
        Swal.fire('Se acepto de manera correcta.', '', 'success');
    }
    }
}
// AQUI RECIBIMOS EL PARAMETRO POS ENVIADO POR EDIT, Y PONDREMOS SUS VALORES EN EL FORMULARIO PARA
// PODERLOS EDITAR EXCEPTO LA FECHA
async function cargarDetalle(pos){
    let r = reportes[pos];
    
    if(r == null){
         Swal.fire('', 'No se encontraron los datos del reporte.', 'error');
    }else{
       // let fechaOriginal = r.fecha; // Formato incorrecto
       // let fechaObjeto = new Date(fechaOriginal); // Convertimos a Date
       // let fechaFormateada = fechaObjeto.toISOString().split("T")[0]; 
       id = r.id;
        document.getElementById("txtTitulo").value = r.titulo;
        document.getElementById("txtDescripcion").value = r.descripcion;
       // document.getElementById("txtDate").value = fechaFormateada;
    }
}

async function Update(){
     
        let titulo = document.getElementById("txtTitulo").value;
        let descripcion = document.getElementById("txtDescripcion").value;
        
        let reporte = {id, titulo, descripcion};
        let parametros = new URLSearchParams();
        parametros.append("datosReporte", JSON.stringify(reporte));
        let ruta = 'http://localhost:8080/blazebuzer_web/api/Reporte/update';
        try{
           let response = await fetch(ruta, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
            body: parametros
        });

        let result = await response.json();
        
        if (result.error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.error
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Actualizacion exitosa",
                text: JSON.stringify(result, null, 2)
            });
            id = null;
        }
        }catch(error){
             Swal.fire({
            icon: "error",
            title: "Error de Conexión",
            text: "No se pudo conectar con el servidor."
        });
        console.error("Error en la solicitud:", error);
        }
}

// vamos a extraer la fecha que selecciono el usuario en el formulario para pode
// enviar la peticion/consulta a la API
/* async function extraerFecha(){
    let fechaSeleccionada = document.getElementById("fecha").value;
    console.log("Fecha seleccionada:", fechaSeleccionada);
} */

async function extraerFecha() {
    let fechaSeleccionada = document.getElementById("fecha").value;
    
    if (!fechaSeleccionada) {
        Swal.fire("Error", "Por favor selecciona una fecha.", "warning");
        return;
    }
    
    let url = `http://localhost:8080/blazebuzer_web/api/Reporte/getByDate?fecha=${fechaSeleccionada}`;

    
    try {
        let resp = await fetch(url);
        let datos = await resp.json();
        
        let contenido = '';
        
        if (datos.error) {
            Swal.fire("Error", datos.error, "error");
        } else {
            reportes = datos;
            for (let i = 0; i < reportes.length; i++) {
                contenido += `<tr>
                                <td>${reportes[i].titulo}</td>
                                <td>${reportes[i].descripcion}</td>
                                <td>${reportes[i].fecha}</td>
                                <td>
                                    <button type="button" class="btn btn-sm btn-edit" onclick="editar(${i})">✏️ Editar</button>
                                    <button class="btn btn-sm btn-delete">🗑️ Eliminar</button>
                                </td>
                              </tr>`;
            }
        }
        
        document.getElementById("tbodyReportes").innerHTML = contenido;
    } catch (error) {
        Swal.fire("Error", "No se pudo obtener los reportes.", "error");
        console.error("Error en la consulta de reportes por fecha:", error);
    }
}



window.editar = editar;
window.eliminar = eliminar;