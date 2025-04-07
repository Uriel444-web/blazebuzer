USE blazeBuzer;

-- -----------------------------------------------------------------------
-- insertar los tipos de  usuarios que van a existir
-- -----------------------------------------------------------------------
INSERT INTO rol (nombre) VALUES ("Administrador"), ("Usuario");
-- -----------------------------------------------------------------------
-- INSERTAR USUARIO DE TIPO ADMINISTRADOR
-- -----------------------------------------------------------------------
INSERT INTO usuario (nombre, contrasenia,rol) VALUES ("admin", "blazebuzer",1);
INSERT INTO usuario (nombre, contrasenia) VALUES ("Uriel", "Urielhernandez");
-- -----------------------------------------------------------------------
SELECT * FROM usuario;
SELECT * FROM reporte;


SELECT * FROM rol;

SELECT * FROM reporte;
SELECT rol FROM usuario WHERE idUsuario = 3;

INSERT INTO reporte(fecha) VALUES("2025-04-03");
INSERT INTO reporte(fecha,estatus) VALUES("2025-04-03",1);
SELECT * FROM v_Reporte;
SELECT * FROM v_ReporteUsuario;
select * from reporte;
UPDATE reporte SET estatus = 0 WHERE idReporte = 2;
SELECT * FROM v_ReporteUsuario WHERE fecha = "2025-04-03";