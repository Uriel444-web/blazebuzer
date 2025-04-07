/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package blazebuzer_controller;

import blazebuzer_controller.db.ConexionMySQL;
import blazebuzer_model.Usuario;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;

/**
 *
 * @author casa
 */
public class controllerUsuario {
    public int create(Usuario u) throws Exception{
        // definimos la consulta SQL que see va a ejecutar
        String sql = "{CALL crearUsuario(?, ?, ?)}";
        // Abrimos la conexion con la BD
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        // Generamos un CallableStatement pra invocar el StoredProcedure
        CallableStatement cstmt = conn.prepareCall(sql);
        // Colocamos los valores de los parametros de entrada que requiere
        // el Stored Procedure:
        cstmt.setString(1, u.getNombre());
        cstmt.setString(2, u.getContrasenia());
        
        // Ejecutamos el StoredProcedure
        cstmt.executeUpdate();
        
        // Jalamos el id del reporte
        u.setIdUsuario(cstmt.getInt(3));
        
        //Cerramos los objetos de conexion:
        cstmt.close();
        connMySQL.close();
        
        // Devolvemos el ID del reporte que se genero:
        return u.getIdUsuario();
    }
}
