/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package blazebuzer_controller;
import blazebuzer_controller.db.ConexionMySQL;
import java.sql.SQLException;
import blazebuzer_model.Usuario;
import java.util.List;

import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
public class ControllerLogin {
    // primero se valida el acceso, despues se genera el token 
    // y se almacena, tanto en el back como en el front
    public void almacenarToken(Usuario U) throws Exception{
        String query="""
                     UPDATE Usuario SET token ="%S" WHERE idUsuario="%S";
                     """;
        query = String.format(query, U.getToken(), U.getIdUsuario());
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(query);
        cstmt.execute(query);
        cstmt.close();
        conn.close();
        connMySQL.close();
    }
    
    public void eliminarToken(String token) throws SQLException ,Exception{
        String query="""
                     UPDATE usuario SET token=NULL WHERE token=?;
                     """;
    query = String.format(query, token);
    ConexionMySQL connMySQL = new ConexionMySQL();
    Connection conn = connMySQL.open();
    PreparedStatement pstmt = conn.prepareStatement(query);
    pstmt.setString(1, token);
    pstmt.executeUpdate();
    pstmt.close();
    conn.close();
    connMySQL.close();
    }
    public int validarAcceso(String nombre, String contrasenia) throws Exception {
    String sql = "SELECT idUsuario, nombre FROM usuario WHERE nombre = ? AND contrasenia = ?;";
    ConexionMySQL connMySQL = new ConexionMySQL();
    Connection conn = connMySQL.open();
    PreparedStatement pstmt = conn.prepareStatement(sql);
    pstmt.setString(1, nombre);
    pstmt.setString(2, contrasenia);
    ResultSet rs = pstmt.executeQuery();

    int idUsuario = 0;
    String usuario = "";
    if (rs.next()) {
        idUsuario = rs.getInt("idUsuario");
        usuario = rs.getString("nombre");
    }

    rs.close();
    pstmt.close();
    connMySQL.close();

    return idUsuario;
}
}
