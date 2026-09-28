<?php
header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . '/../modelos/ReservaModelo.php';

$modelo = new ReservaModelo();
$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'crear') {
    $input = json_decode(file_get_contents('php://input'), true);
    if(!$input) {
        $input = $_POST;
    }
    
    $resultado = $modelo->guardarReserva($input);
    echo json_encode($resultado);
    exit;
} 

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'listar') {
    $reservas = $modelo->obtenerTodasReservas();
    echo json_encode(["status" => "success", "data" => $reservas]);
    exit;
}

echo json_encode(["status" => "error", "message" => "Acción no válida"]);
?>