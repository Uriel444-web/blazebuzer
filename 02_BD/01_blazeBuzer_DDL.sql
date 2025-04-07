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
    fecha 		DATE NOT NULL DEFAULT (CURRENT_DATE),
    estatus		INT NOT NULL DEFAULT 0
);

-- --------------------------------------------------------------------------------------------------------
-- tabla tipo de usuario, estara relacionada con usuario como foreign key, de forma default al crearse un 
-- usuario nuevo, este tendra el valor 2 que es usuario normal, SOLO HABRA UN UNICO USUARIO DE TIPO ADMINISTRADOR
-- 1 - Administrador
-- 2 - usuario normal
-- --------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rol(
	idRol INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) not null
);
-- -------------------------------------------------------------------------------------------------------
-- TABLA USUARIOS SOLO HAY UN UNICO USUARIO TIPO ADMIN (idRol = 1)
-- -------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuario 
(
    idUsuario   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre      VARCHAR(65) NULL,
    contrasenia VARCHAR(65) NULL,
    token		LONGTEXT NULL,
    activo      INT NOT NULL DEFAULT 1,
    rol 		INT NOT NULL DEFAULT 2,
    FOREIGN KEY (rol) REFERENCES rol(idRol)
) ;