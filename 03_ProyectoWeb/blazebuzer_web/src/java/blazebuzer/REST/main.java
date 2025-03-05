/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package blazebuzer.REST;

/**
 *
 * @author casa
 */

import com.google.gson.Gson;
import blazebuzer_model.Reporte;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
public class main {
    public static void main(String[] args) {
        Gson gson = new Gson();
        Reporte r = new Reporte();
        r.setId(1);
        r.setTitulo("lol");
        r.setDescripcion("xdd");
        // Definir una fecha en formato String
        String fechaStr = "2025-03-02";

        // Convertir el String a un objeto Date
        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd");
        Date fecha;
        try {
            fecha = formato.parse(fechaStr);
            r.setFecha(fecha);
        } catch (ParseException ex) {
            Logger.getLogger(main.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        System.out.println(gson.toJson(r));
    }
}
