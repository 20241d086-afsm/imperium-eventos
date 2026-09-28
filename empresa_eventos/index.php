<?php
// Enrutador Principal del Sistema Web
$vista = $_GET['vista'] ?? 'inicio';

if ($vista === 'admin') {
    require_once __DIR__ . '/vistas/admin.php';
} else {
    require_once __DIR__ . '/index.html'; // Renderiza la página web principal
}
?>