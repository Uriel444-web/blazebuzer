/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.getElementById("btnRegistrar").addEventListener('click', registrar);
document.getElementById("btnLogin").addEventListener('click', login);
async function registrar(){
     let url = 'http://localhost:8080/blazebuzer_web/api/usuario/create';
    let nombre = document.getElementById("txtNombreUsuario").value.trim();
    let contrasenia = document.getElementById("txtContrasenia").value.trim();

    if (!nombre || !contrasenia) {
        Swal.fire('Llena los campos animal >:(.', '', 'warning');
        return;
    }
    
    let data = null;
    let resp = null;
    let datos = { usuario: JSON.stringify({ nombre, contrasenia }) };
    let params = new URLSearchParams(datos);
    let opciones = {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: params
    };
    resp = await fetch(url, opciones);
    data = await resp.json();
    console.log(data);
    
    if (!data) {
        Swal.fire('Datos de alimento guardados con &eacute;xito.', '', 'success');
        window.location.href = "http://localhost:8080/blazebuzer_web/index.html";
    }else{
        Swal.fire('Usuario registrado con exito.', '', 'success');
        clear();
    }
        
    
   // window.location.href = "http://localhost:8080/blazebuzer_web/index.html";
}
async function clear(){
    document.getElementById("txtNombreUsuario").value = "";
    document.getElementById("txtContrasenia").value = "";
}
async function login(){
    window.location.href = "http://localhost:8080/blazebuzer_web/index.html";
}
