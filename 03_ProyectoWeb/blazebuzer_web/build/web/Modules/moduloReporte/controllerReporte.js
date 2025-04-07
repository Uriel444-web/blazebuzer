

document.getElementById("btnReportes").addEventListener('click', reportes);
document.getElementById("btnLogOut").addEventListener('click', logOut);
document.getElementById("btnInicio").addEventListener('click', inicio);
document.getElementById("btnNuevos").addEventListener('click', nuevos);
document.getElementById("btnMiPerfil").addEventListener('click', miPerfil);
let cm = null;
 let index = 0;
        const images = document.querySelectorAll(".carousel img");

        function showNextImage() {
            images[index].classList.remove("active");
            index = (index + 1) % images.length;
            images[index].classList.add("active");
        }
        setInterval(showNextImage, 3000); // Cambia cada 3 segundos
        //
// con un FETCH cargaremos la tabla de reportes generados donde tambien se podra editar y eliminar
async function reportes(){
   let url="http://localhost:8080/blazebuzer_web/Modules/moduloReporte/reportes.html";
   let resp = await fetch(url);
   let contenido = await resp.text();
   document.getElementById('viewReporte').innerHTML = contenido;
   cm = await import("http://localhost:8080/blazebuzer_web/Modules/moduloReporte/controllerReportes.js");
   cm.inicializar();
}

async function logOut(){
    let token = localStorage.getItem('token');
    let parametros = {token: token};
    let ruta = 'http://localhost:8080/blazebuzer_web/api/Login/logout';
     if (!token) {
        Swal.fire('No hay sesión activa.', '', 'info');
        return;
    }
    fetch(ruta, {
        method: "POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: new URLSearchParams({ token })
    }).then(response => response.json()).then(response =>{
        if(response.result){
            localStorage.removeItem("token");
            localStorage.removeItem("nombre");
            window.location.href = "http://localhost:8080/blazebuzer_web";
        }else if(response.error){
            Swal.fire({
                icon:"error",
                title : "oops...",
                text: response.error
            });
        }
    });
}
async function inicio(){
   let url="http://localhost:8080/blazebuzer_web/Modules/moduloReporte/inicio.html";
   let resp = await fetch(url);
   let contenido = await resp.text();
   document.getElementById('viewReporte').innerHTML = contenido;
   cm = await import("http://localhost:8080/blazebuzer_web/Modules/moduloReporte/controllerReporte.js");
}

async function nuevos(){
   let url="http://localhost:8080/blazebuzer_web/Modules/moduloReporte/nuevos.html";
   let resp = await fetch(url);
   let contenido = await resp.text();
   document.getElementById('viewReporte').innerHTML = contenido;
   cm = await import("http://localhost:8080/blazebuzer_web/Modules/moduloReporte/nuevo.js");
   cm.inicializar();
}

async function miPerfil(){
   let url="http://localhost:8080/blazebuzer_web/Modules/moduloReporte/miPerfil.html";
   let resp = await fetch(url);
   let contenido = await resp.text();
   document.getElementById('viewReporte').innerHTML = contenido;
   cm = await import("http://localhost:8080/blazebuzer_web/Modules/moduloReporte/miPerfil.js");
   cm.cargarNombre();
}
