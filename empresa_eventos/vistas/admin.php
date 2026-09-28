<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel de Administración | Imperium Eventos</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
        header { background: #6b001a; color: white; padding: 15px 20px; border-radius: 8px; margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center;}
        h1 { margin: 0; font-size: 1.5rem; color: #d4af37; }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #ddd; font-size: 0.9rem; }
        th { background: #6b001a; color: white; }
        tr:hover { background: #f8f9fa; }
        .badge { background: #27ae60; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; }
        .btn-link { color: #6b001a; font-weight: bold; text-decoration: none; }
    </style>
</head>
<body>

    <header>
        <h1>IMPERIUM - Panel de Control Administrativo</h1>
        <a href="../index.php" style="color:white; text-decoration:none;"><i class="fa-solid fa-globe"></i> Ver Sitio Web</a>
    </header>

    <h2><i class="fa-solid fa-list-check"></i> Reservas de Eventos Registradas</h2>

    <table>
        <thead>
            <tr>
                <th>Voucher</th>
                <th>Cliente</th>
                <th>Contacto</th>
                <th>Evento</th>
                <th>Fecha</th>
                <th>Catering</th>
                <th>Ubicación</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody id="tablaReservas">
            <tr><td colspan="8">Cargando reservas desde la base de datos...</td></tr>
        </tbody>
    </table>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            fetch('../controladores/ReservaControlador.php?action=listar')
                .then(res => res.json())
                .then(res => {
                    if(res.status === 'success') {
                        let html = '';
                        if(res.data.length === 0) {
                            html = '<tr><td colspan="8">No hay reservas registradas aún.</td></tr>';
                        } else {
                            res.data.forEach(r => {
                                html += `<tr>
                                    <td><strong>${r.codigo_voucher}</strong></td>
                                    <td>${r.nombre}</td>
                                    <td>${r.telefono}<br><small>${r.email}</small></td>
                                    <td>${r.tipo_evento}</td>
                                    <td>${r.fecha_evento}</td>
                                    <td>${r.cantidad_platos}x ${r.plato_catering}</td>
                                    <td><a href="${r.coords_gps}" target="_blank" class="btn-link"><i class="fa-solid fa-map-location-dot"></i> Ver Mapa</a></td>
                                    <td><span class="badge">${r.estado}</span></td>
                                </tr>`;
                            });
                        }
                        document.getElementById('tablaReservas').innerHTML = html;
                    }
                });
        });
    </script>
</body>
</html>