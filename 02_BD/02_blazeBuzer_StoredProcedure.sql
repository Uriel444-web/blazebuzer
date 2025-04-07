USE blazeBuzer;

-- -------------------------------------------------------------------------
-- PROCEDIMIENTO PARA INSERTAR UN REPORTE
-- -------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS insertarReporte;
DELIMITER $$
CREATE PROCEDURE insertarReporte(
    IN var_titulo VARCHAR(100),       -- 1
    IN var_descripcion VARCHAR(250), -- 2
    IN var_fecha DATE,               -- 3
    OUT var_idReporte INT            -- 4
)
BEGIN
    -- INSERTAMOS LOS VALORES RECIBIDOS EN LA TABLA reporte
    INSERT INTO reporte (titulo, descripcion, fecha) 
    VALUES (var_titulo, var_descripcion, var_fecha);
    
    -- OBTENEMOS EL ID DEL REPORTE QUE SE GENERÓ
    SET var_idReporte = LAST_INSERT_ID();
END $$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- PROCEDIMIENTO PARA ACTUALIZAR UN REPORTE
-- ----------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS actualizarReporte;
DELIMITER $$

CREATE PROCEDURE actualizarReporte(
    IN var_titulo VARCHAR(100),       -- 1
    IN var_descripcion VARCHAR(250), -- 2
    IN var_fecha DATE,               -- 3
    IN var_idReporte INT             -- 4
)
BEGIN
    -- ACTUALIZAMOS LOS DATOS CON LOS PARÁMETROS RECIBIDOS
    UPDATE reporte SET titulo = var_titulo,
                       descripcion = var_descripcion,
                       fecha = var_fecha
    WHERE idReporte = var_idReporte;
END $$

DELIMITER ;
-- ----------------------------------------------------------------------------------------
-- USUARIOS
-- -----------------------------------------------------------------------------------------

-- -----------------------------------------------------------------------------------------
-- STORED PROCEDURE PARA CREAR USUARIO Y NOS DEVULEVA EL ID DEL USUARIO CREADO
-- -----------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS crearUsuario;
DELIMITER $$
CREATE PROCEDURE crearUsuario(
				IN u_nombre VARCHAR(65),
                IN u_contrasenia VARCHAR(65),
                OUT u_idUsuario INT
)
BEGIN
INSERT INTO usuario (nombre, contrasenia) VALUES (u_nombre, u_contrasenia);
SET u_idUsuario = LAST_INSERT_ID();
END $$
DELIMITER ;
-- ----------------------------------------------------------------------------------------
-- Stored Procedure para actualizar un Reporte, la fecha no se podra modificar, asi que
-- no se incluira en el SP.
-- ---------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS actualizarReporte;
DELIMITER $$
CREATE PROCEDURE actualizarReporte(
				IN u_idReporte INT,
				IN u_titulo VARCHAR(100),
                IN u_descripcion VARCHAR(250)
)
BEGIN
UPDATE reporte SET titulo = u_titulo, descripcion = u_descripcion where idReporte = u_idReporte;
END $$
DELIMITER ;

UPDATE reporte SET titulo = "lol", descripcion = "qmal" where idReporte = 3;
CALL actualizarReporte(3, 'lolqmal', 'supermal');
