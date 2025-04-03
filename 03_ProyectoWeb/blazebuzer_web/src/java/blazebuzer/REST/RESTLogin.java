/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package blazebuzer.REST;
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
import blazebuzer_controller.ControllerLogin;
import blazebuzer_model.Usuario;
@Path("Login")
public class RESTLogin {
    @Path("validar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@FormParam("usuario") String usuario,
                          @FormParam("password") String password) {
        Gson objGS = new Gson();
        String out = "";
        int idUsuario = 0;
        String nu = usuario;
        ControllerLogin objAC = new ControllerLogin();
        try {
            idUsuario = objAC.validarAcceso(usuario, password);
            if (idUsuario == 0) {
                out = """
                      {"error": "Nombre de usuario o contraseña incorrectos."}
                      """;
            } else {
                Usuario u = new Usuario();
                u.setIdUsuario(idUsuario);
                u.setNombre(nu);
                u.setToken();
                objAC.almacenarToken(u);
                out = objGS.toJson(u);
            }
        } catch (Exception ex) {
            out = """
                  {"error": "Error interno de BD, comunicate con sistemas"}
                  """;
            ex.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("logout")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response logOut(@FormParam("token") @DefaultValue("") String token){
        String out = "";
        ControllerLogin objAC = new ControllerLogin();
        try{
            objAC.eliminarToken(token);
            out = """
                  {"result":"OK"}
                  """;
            
        }catch(SQLException ex){
            out="""
                {"error": "Problemas con la BD, contacta al administrador del sistema"}
                """;
        }catch(Exception ex){
            out="""
                {"error": "Problemas con la BD, contacta al administrador del sistema"}
                """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("validarRol")
@POST
@Produces(MediaType.APPLICATION_JSON)
public Response validarRol(@FormParam("idUsuario") int idUsuario) {
    String out;
    ControllerLogin objCL = new ControllerLogin();
    
    try {
        boolean esAdmin = objCL.verificarRol(idUsuario);
        out = """
              {"admin": %s}
              """.formatted(esAdmin);
    } catch (Exception ex) {
        out = """
              {"error": "Error al validar el rol, contacta al administrador"}
              """;
        ex.printStackTrace();
    }
    return Response.status(Response.Status.OK).entity(out).build();
}
}
