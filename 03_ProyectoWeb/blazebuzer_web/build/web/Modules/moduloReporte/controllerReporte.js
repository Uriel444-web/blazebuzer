

document.getElementById("btnReportes").addEventListener('click', reportes);
let cm = null;
// con un FETCH cargaremos la tabla de reportes generados donde tambien se podra editar y eliminar
async function reportes(){
   let url="http://localhost:8080/blazebuzer_web/Modules/moduloReporte/reportes.html";
   let resp = await fetch(url);
   let contenido = await resp.text();
   document.getElementById('viewReporte').innerHTML = contenido;
   cm = await import("http://localhost:8080/blazebuzer_web/Modules/moduloReporte/controllerReportes.js");
   cm.inicializar();
   
}

