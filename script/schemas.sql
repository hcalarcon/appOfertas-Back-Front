CREATE TABLE users (
    username VARCHAR(10) NOT NULL UNIQUE,
    userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(8) NOT NULL,
    dni VARCHAR(8) NOT NULL 
);

CREATE TABLE publicacion (
    publiId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    porductoId INT NOT NULL,
    userId INT NOT NULL,
    id INT (11) NOT NULL,
    FOREIGN KEY (porductoId) REFERENCES productos(id_producto),
    FOREIGN KEY (userId) REFERENCES personas(userId) ON DELETE CASCADE,
    FOREIGN KEY (id) REFERENCES punto_de_venta(id)
);

CREATE TABLE categoria (
    catId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL
);

CREATE TABLE productos (
    id_producto INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (50) NOT NULL,
    precio DECIMAL (10,2) NOT NULL,
    punto_de_venta INT(11) NOT NULL,
    imagen VARCHAR(255),
    fin_oferta DATE NOT NULL,
    tipo_oferta INT(11) NOT NULL,
    categoria INT(11) NOT NULL,
    FOREIGN key (tipo_oferta) REFERENCES tipo_oferta(id),
    FOREIGN KEY (categoria) REFERENCES categoria(catId)
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