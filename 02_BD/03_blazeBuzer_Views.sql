USE blazeBuzer;

-- --------------------------------------------------------------------------------
-- VISTA DE REPORTES
-- SE REQUIERE MOSTRAR EN PANTALLA SOLO EL TITULO DEL REPORTE, DESCRIPCION Y FECHA
-- v_Reporte es los nuevos reportes que estaran llegando solo al administrador, esta vista 
-- lo que hace es mostrar los reportes con estatus = 0 (no aceptados)
-- --------------------------------------------------------------------------------
DROP VIEW IF EXISTS v_Reporte;
CREATE VIEW v_Reporte AS 
SELECT
idReporte,
titulo,
descripcion,
fecha
FROM reporte
WHERE 
estatus = 0;
-- ---------------------------------------------------------------------------
-- v_ReporteUsuario son los reportes que vera el usuario que ya han sido aceptados y editados por el administrador,
-- es decir estos reportes ya tendran estatus = 1 (aceptados)
-- ----------------------------------------------------------------------------
DROP VIEW IF EXISTS v_ReporteUsuario;
CREATE VIEW v_ReporteUsuario AS 
SELECT
idReporte,
titulo,
descripcion,
fecha
FROM reporte
WHERE estatus = 1;