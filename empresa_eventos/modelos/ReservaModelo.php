<?php
require_once __DIR__ . '/../config/conexion.php';

class ReservaModelo {
    private $db;

    public function __construct() {
        $this->db = Conexion::conectar();
    }

    public function guardarReserva($datos) {
        try {
            $this->db->beginTransaction();

            // 1. Insertar o recuperar cliente
            $stmtCliente = $this->db->prepare("SELECT id FROM clientes WHERE email = ?");
            $stmtCliente->execute([$datos['email']]);
            $cliente = $stmtCliente->fetch();

            if ($cliente) {
                $cliente_id = $cliente['id'];
            } else {
                $stmtInsCliente = $this->db->prepare("INSERT INTO clientes (nombre, telefono, email) VALUES (?, ?, ?)");
                $stmtInsCliente->execute([$datos['nombre'], $datos['telefono'], $datos['email']]);
                $cliente_id = $this->db->lastInsertId();
            }

            // 2. Insertar Reserva
            $codigoVoucher = "IMP-" . rand(100000, 999999);
            $sqlReserva = "INSERT INTO reservas (codigo_voucher, cliente_id, tipo_evento, fecha_evento, direccion_ubicacion, coords_gps, animadores, cantantes, seguridad, plato_catering, cantidad_platos, bebidas_adicionales, metodo_pago) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $stmtRes = $this->db->prepare($sqlReserva);
            $stmtRes->execute([
                $codigoVoucher, $cliente_id, $datos['tipo_evento'], $datos['fecha_evento'],
                $datos['ubicacion'], $datos['coords_gps'], $datos['animadores'], $datos['cantantes'],
                $datos['seguridad'], $datos['plato_catering'], $datos['cantidad_platos'],
                $datos['bebidas'], $datos['metodo_pago']
            ]);

            $this->db->commit();
            return ["status" => "success", "codigo" => $codigoVoucher];

        } catch (Exception $e) {
            $this->db->rollBack();
            return ["status" => "error", "message" => $e->getMessage()];
        }
    }

    public function obtenerTodasReservas() {
        $sql = "SELECT r.*, c.nombre, c.telefono, c.email 
                FROM reservas r 
                JOIN clientes c ON r.cliente_id = c.id 
                ORDER BY r.created_at DESC";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll();
    }
}
?>