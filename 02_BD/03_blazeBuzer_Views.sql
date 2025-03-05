USE blazeBuzer;

-- --------------------------------------------------------------------------------
-- VISTA DE REPORTES
-- SE REQUIERE MOSTRAR EN PANTALLA SOLO EL TITULO DEL REPORTE, DESCRIPCION Y FECHA
-- --------------------------------------------------------------------------------
DROP VIEW IF EXISTS v_Reporte;
CREATE VIEW v_Reporte AS 
SELECT
titulo,
descripcion,
fecha
FROM reporte;

SELECT * FROM v_Reporte;