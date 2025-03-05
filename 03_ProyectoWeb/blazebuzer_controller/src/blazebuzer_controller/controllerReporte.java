/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package blazebuzer_controller;

/**
 *
 * @author casa
 */
import blazebuzer_controller.db.ConexionMySQL;
import java.sql.SQLException;
import blazebuzer_model.Reporte;
import java.util.List;

import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
public class controllerReporte {
    public int insert(Reporte r) throws Exception{
        // definimos la consulta SQL que see va a ejecutar
        String sql = "{CALL insertarReporte(?, ?, ?, ?)}";
        // Abrimos la conexion con la BD
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        // Generamos un CallableStatement pra invocar el StoredProcedure
        CallableStatement cstmt = conn.prepareCall(sql);
        // Colocamos los valores de los parametros de entrada que requiere
        // Convertimos la fecha de util.Date a sql.Date
        Date fechaSQL = new java.sql.Date(System.currentTimeMillis());
        // el Stored Procedure:
        cstmt.setString(1, r.getTitulo());
        cstmt.setString(2, r.getDescripcion());
        cstmt.setDate(3, fechaSQL);
        
        // Ejecutamos el StoredProcedure
        cstmt.executeUpdate();
        
        // Jalamos el id del reporte
        r.setId(cstmt.getInt(4));
        
        //Cerramos los objetos de conexion:
        cstmt.close();
        connMySQL.close();
        
        // Devolvemos el ID del reporte que se genero:
        return r.getId();
    }
    
    public void Update(Reporte r) throws Exception{
        
    }
    
    // para traer todos los registros que existan en la tabla reporte
    
    public List<Reporte> getAll() throws Exception{
        List<Reporte> reportes = new ArrayList<>();
        // CONSULTA SQL
        String sql = "SELECT * FROM v_Reporte";
        // ABRIMOS CONEXION CON MYSQL
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        
        Reporte reporte = null;
        // recorremos cada registro que nos devolvio la consulta
        while(rs.next()){
            reporte = fill(rs);
            reportes.add(reporte);
        }
        
        // CERRAMOS CONEXIONES
        rs.close();
        pstmt.close();
        connMySQL.close();
        
        // RETORNAMOS LA LISTA
        return reportes;
    }
    private Reporte fill (ResultSet rs)throws Exception{
        Reporte r = new Reporte();
        // Establecemos los valores de cada atributo de
        // los objetos relacionados, extraidos de cada
        // campo del ResultSet:
        r.setTitulo(rs.getString("titulo"));
        r.setDescripcion(rs.getString("descripcion"));
        r.setFecha(rs.getDate("fecha"));
        return r;
    }
}
