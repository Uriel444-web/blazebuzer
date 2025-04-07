/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package blazebuzer.REST;

import blazebuzer_controller.controllerUsuario;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import blazebuzer_model.Usuario;
import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import jakarta.ws.rs.Produces;

/**
 *
 * @author casa
 */
@Path("usuario")
public class RESTUsuario {
    @Path("create")
    @POST
    @Produces(MediaType.APPLICATION_JSON) 
    public Response create (@FormParam("usuario") @DefaultValue("") String usuario){
        String out = "";
        controllerUsuario cu = new controllerUsuario();
        Usuario u = null;
        Gson gson = new Gson();
        System.out.println("datosUsuario: "+ usuario);
        try {
            u = gson.fromJson(usuario, Usuario.class);
            cu.create(u);
            System.out.println("creado correctamente");
            out = gson.toJson(u);
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = """
                  {"error":"El JSON recibido no es correcto."}
                  """;
        }catch (Exception e)
        {
            e.printStackTrace();
            out = """
                  {"error":"Error interno del servidor, comunícate al area de sistemas de BlazeBuzer nuv."}
                  """;
        }
        return Response.ok(out).build();
        
    }
}