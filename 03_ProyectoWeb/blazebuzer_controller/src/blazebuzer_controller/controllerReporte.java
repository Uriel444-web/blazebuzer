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

    public int insert(Reporte r) throws Exception {
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

    public void Update(Reporte r) throws Exception {
        // Se define la consulta SQL:
        String sql = "{CALL actualizarReporte(?, ?, ?)}";

        // Abrimos la conexion con la BD:
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        // Generamos un CallableStatement para invocar al Stored Procedure:
        CallableStatement cstmt = conn.prepareCall(sql);

        // Colocamos los valores de los parametros de entrada que requiere
        // el Stored Procedure:
        System.out.println("ID: " + r.getId());
        System.out.println("Título: " + r.getTitulo());
        System.out.println("Descripción: " + r.getDescripcion());

        cstmt.setInt(1, r.getId());
        cstmt.setString(2, r.getTitulo());
        cstmt.setString(3, r.getDescripcion());
        // Ejecutamos el Stored Procedure:
        cstmt.executeUpdate();

        //Cerramos los objetos de conexion:
        cstmt.close();
        connMySQL.close();
    }

    // para traer todos los registros que existan en la tabla reporte
    public List<Reporte> getAll() throws Exception {
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
        while (rs.next()) {
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

    private Reporte fill(ResultSet rs) throws Exception {
        Reporte r = new Reporte();
        // Establecemos los valores de cada atributo de
        // los objetos relacionados, extraidos de cada
        // campo del ResultSet:
        r.setId(rs.getInt("idReporte"));
        r.setTitulo(rs.getString("titulo"));
        r.setDescripcion(rs.getString("descripcion"));
        r.setFecha(rs.getDate("fecha"));
        return r;
    }

    public List<Reporte> getByDate(String fecha) throws Exception {
        List<Reporte> reportes = new ArrayList<>();
        // CONSULTA SQL para obtener reportes filtrados por fecha
        String sql = "SELECT * FROM v_ReporteUsuario WHERE fecha = ?";

        // ABRIMOS CONEXION CON MYSQL
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);

        pstmt.setString(1, fecha); // Asignamos la fecha al query
        ResultSet rs = pstmt.executeQuery();

        // recorremos cada registro que nos devolvió la consulta
        while (rs.next()) {
            reportes.add(fill(rs));
        }

        // CERRAMOS CONEXIONES
        rs.close();
        pstmt.close();
        connMySQL.close();

        // RETORNAMOS LA LISTA FILTRADA
        return reportes;
    }

    public List<Reporte> getAllUsuario() throws Exception {
        List<Reporte> reportes = new ArrayList<>();
        // CONSULTA SQL
        String sql = "SELECT * FROM v_ReporteUsuario";
        // ABRIMOS CONEXION CON MYSQL
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();

        Reporte reporte = null;
        // recorremos cada registro que nos devolvio la consulta
        while (rs.next()) {
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

    public void aceptar(int idReporte) throws Exception {
        String query = """
                     UPDATE reporte SET estatus=1 WHERE idReporte=?;
                     """;
        query = String.format(query, idReporte);
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(query);
        pstmt.setInt(1, idReporte);
        pstmt.executeUpdate();
        pstmt.close();
        conn.close();
        connMySQL.close();
    }
    public void delete(int idReporte) throws Exception {
        String query = """
                     UPDATE reporte SET estatus=2 WHERE idReporte=?;
                     """;
        query = String.format(query, idReporte);
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(query);
        pstmt.setInt(1, idReporte);
        pstmt.executeUpdate();
        pstmt.close();
        conn.close();
        connMySQL.close();
    }
}
