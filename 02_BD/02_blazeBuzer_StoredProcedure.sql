USE blazeBuzer;

-- -------------------------------------------------------------------------
-- PROCEDIMIENTO PARA INSERTAR UN REPORTE
-- -------------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE insertarReporte(
								IN 	var_titulo			varchar (100),  -- 1
                                IN 	var_descripcion 	varchar(250),	-- 2
                                IN 	var_fecha 			DATE,			-- 3
                                OUT var_idReporte 		INT				-- 4
								)
	BEGIN
	-- INSERTAMOS LOS VALORES RECIBIDOS EN LA TABLA reporte
		INSERT INTO reporte (titulo, descripcion, fecha) VALUES (var_titulo, 
        var_descripcion, 
        var_fecha);
	-- OBTENEMOS EL ID DEL REPORTE QUE SE GENERO
		SET var_idReporte = LAST_INSERT_ID();
	END
    $$ DELIMITER ;

-- ----------------------------------------------------------------------------
-- PROCEDIMIENTO PARA ACTUALIZAR UN REPORTE
-- ----------------------------------------------------------------------------
$$ DELIMITER 
CREATE PROCEDURE actualizarReporte(
									IN var_titulo 		VARCHAR(100), 	-- 1
                                    IN var_descripcion 	VARCHAR(250), 	-- 2
                                    IN var_fecha 		DATE,		  	-- 3
                                    IN var_idReporte 	INT			  	-- 4
									)
	BEGIN
-- ACTUALIZAMOS LOS DATOS CON LOS PARAMETROS RECIBIDOS
	UPDATE reporte SET titulo 		= 		var_titulo,
						descripcion = 		var_descripcion,
                        fecha 		= 		var_fecha
	WHERE 				idReporte	=		var_idReporte;
    
	END
$$ DELIMITER ;

