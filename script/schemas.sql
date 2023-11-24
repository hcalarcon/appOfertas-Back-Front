CREATE TABLE users (
    username VARCHAR(10) NOT NULL UNIQUE,
    userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(8) NOT NULL,
    dni VARCHAR(8) NOT NULL 
);

CREATE TABLE publicacion(
    publiId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    pv_id INT(11) NOT NULL,
    fin_oferta DATE NOT NULL,
    tipo_oferta INT(11) NOT NULL,
    catid INT(11) NOT NULL,
    nombre VARCHAR (50) NOT NULL,
    precio DECIMAL (10,2) NOT NULL,
    imagen VARCHAR(255),
    FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY(pv_id) REFERENCES punto_de_venta(id),
    FOREIGN KEY(tipo_oferta) REFERENCES tipo_ofertas(id),
    FOREIGN KEY(catid) REFERENCES categoria(catId)
)

CREATE TABLE categoria (
    catId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL
);


CREATE TABLE tipo_ofertas (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(10) NOT NULL,
    descripcion TEXT
);

CREATE TABLE punto_de_venta (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    sucursal VARCHAR(20) NOT NULL
)