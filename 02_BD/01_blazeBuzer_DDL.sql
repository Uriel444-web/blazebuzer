DROP DATABASE IF EXISTS blazeBuzer;
CREATE DATABASE blazeBuzer;
USE blazeBuzer;
-- -------------------------------------------------------------------------------------------------------
-- TABLA DE REPORTES
-- SE SUBIRA DE MANERA AUTOMATICAMENTE UNICAMENTE LA FECHA EN LA QUE SE ACTIVO EL BLAZEBUZER. EL TITULO
-- Y LA DESCRIPCION SE MODIFICARAN DE MANERA MANUAL POR UN USUARIO AUTORIZADO
-- -------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reporte (
    idReporte 	int primary key auto_increment,
    titulo	 	varchar(100) null,
    descripcion varchar(250) null,
    fecha 		DATE NOT NULL DEFAULT (CURRENT_DATE)
);

-- -------------------------------------------------------------------------------------------------------
-- TABLA USUARIOS
-- -------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuario 
(
    idUsuario   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre      VARCHAR(65) NULL,
    contrasenia VARCHAR(65) NULL,
    token		LONGTEXT NULL,
    activo      INT NOT NULL DEFAULT 1
) ;