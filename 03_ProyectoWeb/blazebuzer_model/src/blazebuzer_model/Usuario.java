/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package blazebuzer_model;

import java.util.Date;
import org.apache.commons.codec.digest.DigestUtils;

public class Usuario {
    private int idUsuario;
    private String nombre;
    private String contrasenia;
    private String token;

    public Usuario() {
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    
    public void setToken(){
        String p1 = this.nombre;
        String p2 = "keniaOs";
        Date fecha = new Date();
        String p3 = fecha.toString();
        String cadena = p1+","+p2+","+p3;
        String token = DigestUtils.md5Hex(cadena);
        this.token =token;
    }
}
