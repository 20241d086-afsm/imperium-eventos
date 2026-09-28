-- 1. CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS imperium_eventos;
USE imperium_eventos;

-- 2. TABLA DE USUARIOS / ADMINISTRADORES (Acceso Encargado)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuario encargado por defecto
INSERT INTO usuarios (nombre, email, password, rol) 
VALUES ('Encargado Imperium', 'admin@imperium.com', 'admin123', 'admin')
ON DUPLICATE KEY UPDATE id=id;

-- 3. TABLA DE CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABLA DE RESERVAS Y PAGOS (Actualizada con pasarela)
CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_voucher VARCHAR(20) NOT NULL UNIQUE,
    cliente_nombre VARCHAR(100) NOT NULL,
    cliente_telefono VARCHAR(20) NOT NULL,
    cliente_email VARCHAR(100) NOT NULL,
    tipo_evento VARCHAR(50) NOT NULL,
    fecha_evento DATE NOT NULL,
    animadores VARCHAR(50),
    cantantes INT DEFAULT 0,
    seguridad INT DEFAULT 0,
    plato_catering VARCHAR(100),
    cantidad_platos INT DEFAULT 0,
    bebidas_adicionales TEXT,
    direccion_ubicacion TEXT NOT NULL,
    coords_gps VARCHAR(255),
    monto_total DECIMAL(10,2) NOT NULL,
    monto_pagado DECIMAL(10,2) NOT NULL,
    modalidad_pago VARCHAR(20) NOT NULL, -- '50%' o '100%'
    metodo_pago VARCHAR(50) NOT NULL,    -- 'Yape / Plin' o 'Tarjeta'
    detalle_pago VARCHAR(100),           -- N° Operación Yape o últimos 4 dígitos
    estado_pago VARCHAR(50) DEFAULT 'ADELANTO PAGADO (50%)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Registros de prueba alineados con el sistema
INSERT INTO reservas (
    codigo_voucher, cliente_nombre, cliente_telefono, cliente_email, 
    tipo_evento, fecha_evento, animadores, cantantes, seguridad, 
    plato_catering, cantidad_platos, direccion_ubicacion, coords_gps, 
    monto_total, monto_pagado, modalidad_pago, metodo_pago, detalle_pago, estado_pago
) VALUES 
('IMP-849201', 'Juan Pérez', '987654321', 'juan.perez@gmail.com', 'Boda / Matrimonio', '2026-10-15', '1 Animador Principal', 1, 2, 'Chiriuchu Tradicional', 50, 'Av. El Sol 456, Cusco', 'https://maps.google.com/?q=-13.5171,-71.9786', 2200.00, 1100.00, '50%', 'Yape / Plin', 'N° Operación: 849201', 'ADELANTO PAGADO (50%)'),
('IMP-302914', 'María Cárdenas', '951234567', 'maria.cardenas@outlook.com', '15 Años', '2026-11-02', '2 Animadores', 1, 2, 'Lechón al Horno', 80, 'Av. La Cultura 1230, Cusco', 'https://maps.google.com/?q=-13.5171,-71.9786', 3250.00, 3250.00, '100%', 'Tarjeta de Débito/Crédito', 'Tarjeta ****4557', 'PAGADO TOTAL (100%)');