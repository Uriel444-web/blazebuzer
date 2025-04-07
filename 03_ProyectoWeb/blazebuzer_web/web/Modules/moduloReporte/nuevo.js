/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
let reportes = [];
document.getElementById("btnCargarReportes").addEventListener('click', cargarReportesAdmin);
async function inicializar(){
    cargarReportesAdmin();
}
async function cargarReportesAdmin(){
    // url de la api getAll
    let url = "http://localhost:8080/blazebuzer_web/api/Reporte/getAllAdmin";
    
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
                                    'onclick="aceptar(' + i + ')">'+'✏️ Aceptar'+'</button>'+
                                    '<button class="btn btn-sm btn-delete" id="btnEliminar">'+'🗑️ Eliminar'+'</button>'+
                                '</td>'+
                            '</tr>';
        }
    }
    
    // una vez recorrido, se imprime en pantalla
    
    document.getElementById("tbodyReportes").innerHTML = contenido;
}

async function aceptar(pos){
    let r = reportes[pos];
    if(r == null){
         Swal.fire('', 'No se encontraron los datos del reporte.', 'error');
    }else{
      console.log(r.id);
      // url de la api getAll
    let url = "http://localhost:8080/blazebuzer_web/api/Reporte/aceptar";
    
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
        cargarReportesAdmin();
        Swal.fire('Se acepto de manera correcta.', '', 'success');
    }
    }
}

window.aceptar = aceptar;