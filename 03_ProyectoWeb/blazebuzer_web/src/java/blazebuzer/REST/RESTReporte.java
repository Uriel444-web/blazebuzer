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
import java.sql.SQLException;
import com.google.gson.JsonParseException;
import blazebuzer_controller.ControllerLogin;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import blazebuzer_controller.controllerReporte;
import blazebuzer_model.Reporte;
import jakarta.ws.rs.QueryParam;

@Path("Reporte")
public class RESTReporte {
    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)   
    public Response subir(@FormParam("datosReporte") @DefaultValue("") String datosReporte){
        String out = null;
        controllerReporte cr = new controllerReporte();
        Reporte r = null;
        Gson gson = new Gson();
        System.out.println("datosReporte: "+ datosReporte);
        try {
            r = gson.fromJson(datosReporte, Reporte.class);
            if(r.getId() < 1){
                cr.insert(r);
            }else{
                cr.Update(r);
            }
            out = gson.toJson(r);
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = """
                  {"error":"El JSON recibido no es correcto."}
                  """;
        }catch (Exception e)
        {
            e.printStackTrace();
            out = """
                  {"error":"Error interno del servidor, comunícate al area de sistemas de El Zarape."}
                  """;
        }
        return Response.ok(out).build();
    }
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(){
        String out = "";
        controllerReporte cr = new controllerReporte();
        List<Reporte> reportes = null;
        try {
            reportes = cr.getAll();
            out = new Gson().toJson(reportes);
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                  {"error" : "Error interno del Servidor, comunicate al area de Sistemas"}
                  """;
        }
        return Response.ok(out).build();
    }
    
    @GET
@Path("getByDate")
@Produces(MediaType.APPLICATION_JSON)
public Response getByDate(@QueryParam("fecha") String fecha) {
    String out = "";
    controllerReporte cr = new controllerReporte();
    List<Reporte> reportes = null;
    
    try {
        reportes = cr.getByDate(fecha);
        out = new Gson().toJson(reportes);
    } catch (Exception e) {
        e.printStackTrace();
        out = """
              {"error" : "Error interno del Servidor, comunicate al area de Sistemas"}
              """;
    }
    
    return Response.ok(out).build();
}

}