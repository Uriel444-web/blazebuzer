/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

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
                            '</tr>';
        }
    }
    
    // una vez recorrido, se imprime en pantalla
    
    document.getElementById("tbodyReportes").innerHTML = contenido;
}

// EVENTOS ONCLICK CON ELEMENTBYID
document.getElementById("btnFiltroDate").addEventListener('click', extraerFecha);

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
                              </tr>`;
            }
        }
        
        document.getElementById("tbodyReportes").innerHTML = contenido;
    } catch (error) {
        Swal.fire("Error", "No se pudo obtener los reportes.", "error");
        console.error("Error en la consulta de reportes por fecha:", error);
    }
}
