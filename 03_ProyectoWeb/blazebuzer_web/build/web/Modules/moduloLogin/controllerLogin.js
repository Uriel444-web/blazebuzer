document.getElementById("btnLogIn").addEventListener('click', validarAcceso);
document.getElementById("btnRegistrar").addEventListener('click', registrar);
// document.getElementById("btnLogOut").addEventListener('click', logOut);


async function validarAcceso() {
    let url = 'http://localhost:8080/blazebuzer_web/api/Login/validar';
    let nombre = document.getElementById("txtUsuario").value.trim();
    let password = document.getElementById("txtPassword").value.trim();

    if (!nombre || !password) {
        Swal.fire('Llena los campos animal >:(.', '', 'warning');
        return;
    }

    let datos = { usuario: nombre, password };
    let params = new URLSearchParams(datos);
    let opciones = {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: params
    };

    try {
        let resp = await fetch(url, opciones);
        let data = await resp.json();

        if (data.error) {
            Swal.fire('Nombre / Password incorrectos', data.error, 'error');
        } else {
            localStorage.setItem("token", data.token);
            localStorage.setItem("idUsuario", data.idUsuario);
            localStorage.setItem("nombre", data.nombre);
            
            // Llamar a la función para validar rol
            validarRol(data.idUsuario);
        }
    } catch (error) {
        Swal.fire('Error de conexión.', '', 'error');
    }
}


async function validarRol(idUsuario) {
    let url = 'http://localhost:8080/blazebuzer_web/api/Login/validarRol';
    let datos = new URLSearchParams({ idUsuario });

    try {
        let resp = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: datos
        });

        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }

        let data = await resp.json();

        if (data.admin === true) { 
            window.location.href = "http://localhost:8080/blazebuzer_web/Modules/moduloReporte/viewReporte.html";
        } else if (data.admin === false) { 
            window.location.href = "http://localhost:8080/blazebuzer_web/Modules/UsuarioView/ViewReporte.html";
        } else {
            throw new Error("Respuesta inesperada del servidor");
        }
    } catch (error) {
        console.error("Error en validarRol:", error);
        Swal.fire('Error al validar rol.', error.message, 'error');
    }
}

async function registrar(){
    window.location.href = "http://localhost:8080/blazebuzer_web/newUsuario.html";
}
