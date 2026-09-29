// Número oficial del Encargado para recibir reservas por WhatsApp
const TEL_ENCARGADO = "51940775818"; 

let map, marker;
let reservaTemporal = null; 

document.addEventListener("DOMContentLoaded", function() {
    const latInicial = -13.5171;
    const lngInicial = -71.9786;

    const mapElement = document.getElementById('map');
    if (mapElement) {
        map = L.map('map').setView([latInicial, lngInicial], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap - Imperium Eventos'
        }).addTo(map);

        marker = L.marker([latInicial, lngInicial], {draggable: true}).addTo(map);

        // Función para actualizar coordenadas GPS y autocompletar la Dirección Escrita
        function actualizarCoords(lat, lng) {
            const coordsInput = document.getElementById('coordsUbicacion');
            if (coordsInput) {
                coordsInput.value = `https://maps.google.com/?q=${lat},${lng}`;
            }
            actualizarDireccionPorCoordenadas(lat, lng);
        }

        // Geocodificación Inversa (Convierte coordenadas en dirección física)
        function actualizarDireccionPorCoordenadas(lat, lng) {
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
                if (data && data.display_name) {
                    const inputUbicacion = document.getElementById('direccionUbicacion') || document.getElementById('ubicacion');
                    if (inputUbicacion) {
                        inputUbicacion.value = data.display_name;
                    }
                }
            })
            .catch(err => console.error("Error al obtener dirección del mapa:", err));
        }

        actualizarCoords(latInicial, lngInicial);

        marker.on('dragend', function(e) {
            const coord = e.target.getLatLng();
            actualizarCoords(coord.lat, coord.lng);
        });

        map.on('click', function(e) {
            marker.setLatLng(e.latlng);
            actualizarCoords(e.latlng.lat, e.latlng.lng);
        });
    }
});

// BASE DE DATOS LOCAL DE PRECIOS Y DETALLES
const detallesServicios = {
    'animador': {
        titulo: 'Animadores & Cantantes Profesionales',
        precio: 'S/ 250.00 / Cantante S/ 300.00',
        imagen: 'https://elbuho.pe/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-15-at-13.29.03.jpeg',
        descripcion: '<strong>Animadores Profesionales:</strong> Conductores capacitados.<br><strong>Cantantes:</strong> Cumbia, Folclor, Salsa, Chicha, Variado.',
        badge: 'Servicio Contratable'
    },
    'marco': {
        titulo: 'Marco Musical, Mariachis y Orquestas',
        precio: 'Desde S/ 500.00 / Hora de Show',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4b-X3Wg6Nar2YxfOawAOKTrZf8KrzRG4lsjG32T0iQ&s',
        descripcion: 'Teclado, timbales, conjunto de arpa y violín, o banda de viento.',
        badge: 'Música en Vivo'
    },
    'luces': {
        titulo: 'Alquiler de Luces y Sonido Pro',
        precio: 'S/ 450.00 por jornada completa',
        imagen: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
        descripcion: 'Parlantes JBL Pro de 1500W, luces robóticas móviles e iluminación LED.',
        badge: 'Equipos Pro'
    },
    'seguridad': {
        titulo: 'Agentes de Seguridad Privada',
        precio: 'S/ 120.00 por agente (5 horas)',
        imagen: 'https://servisegur.com.pe/wp-content/uploads/2018/11/seguridas-para-eventos-en-Lima.jpg',
        descripcion: 'Agentes uniformados para el control de la puerta e ingreso.',
        badge: 'Seguridad Privada'
    },
    'catering': {
        titulo: 'Servicio de Mozos y Catering',
        precio: 'S/ 100.00 por mozo (Hasta 50 invitados)',
        imagen: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
        descripcion: 'Mozos en mesa con vestimenta formal y menaje de loza fina.',
        badge: 'Atención VIP'
    },
    'domicilio': {
        titulo: 'Montaje de Eventos a Domicilio',
        precio: 'S/ 200.00 (Flete y montaje total)',
        imagen: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
        descripcion: 'Montaje de escenarios, mobiliario y toldos a domicilio.',
        badge: 'A Domicilio'
    },
    'chiriuchu': {
        titulo: 'Chiriuchu Tradicional Cusqueño',
        precio: 'S/ 35.00 por plato / porción',
        imagen: 'https://jameaperu.com/assets/images/chiriuchu_800x534.webp',
        descripcion: 'Plato emblemático con cuy al horno, gallina, torreja, cecina, canchita.',
        badge: 'Plato Bandera'
    },
    'lechon': {
        titulo: 'Lechón al Horno Tradicional',
        precio: 'S/ 35.00 por plato / porción',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqGVIdn-U5epJl3IpE6fgYB1EDqIet66mzmFUfFT2dFIqz15U8xUtNMWZq&s=10',
        descripcion: 'Lechón crujiente servido con tamal cusqueño, pan oropesa y moraya.',
        badge: 'Recomendado Bodas'
    },
    'pollo': {
        titulo: 'Pollo al Horno con Tallarín',
        precio: 'S/ 25.00 por plato / porción',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrszVQ48ap4mFPAtUC_khW9cgwXdISs917TBJo1RMR3y1s5h9Kb7VPpHWD&s=10',
        descripcion: 'Presa de pollo al horno con tallarines, Rocoto relleno y papa dorada.',
        badge: 'Económico'
    }
};

function verDetalle(clave) {
    const item = detallesServicios[clave];
    if(!item) return;

    document.getElementById('modalImg').src = item.imagen;
    document.getElementById('modalTitle').innerText = item.titulo;
    document.getElementById('modalPrecio').innerText = `Precio: ${item.precio}`;
    document.getElementById('modalDesc').innerHTML = item.descripcion;
    document.getElementById('modalBadge').innerText = item.badge;

    document.getElementById('modalDetalle').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalDetalle').style.display = 'none';
}

function aplicarPromo() {
    const bebidasInput = document.getElementById('bebidasAdicionales') || document.getElementById('bebidas');
    if(bebidasInput) {
        bebidasInput.value = "PAQUETE PROMOCIONAL IMPERIUM ALL-INCLUSIVE APLICADO (S/ 1,499.00)";
    }
}

// LÓGICA DE CÁLCULO DE COSTO Y APERTURA DE PASARELA
const formEvento = document.getElementById('formEvento');
if (formEvento) {
    formEvento.addEventListener('submit', function(e) {
        e.preventDefault();

        const animadorTxt = document.getElementById('animadorReq').value;
        const cantantesVal = parseInt(document.getElementById('cantantes').value) || 0;
        const seguridadVal = parseInt(document.getElementById('seguridad').value) || 0;
        const platoTxt = document.getElementById('platoElegido').value;
        const cantPlatosVal = parseInt(document.getElementById('cantPlatos').value) || 0;
        const modalidad = document.getElementById('modalidadPagoSel').value;

        const bebidasVal = (document.getElementById('bebidasAdicionales') || document.getElementById('bebidas'))?.value || "Ninguna";
        const ubicacionVal = (document.getElementById('direccionUbicacion') || document.getElementById('ubicacion'))?.value || "No especificada";

        let costoAnimador = animadorTxt.includes("1 Animador") ? 250 : (animadorTxt.includes("2 Animadores") ? 450 : 0);
        let costoCantantes = cantantesVal * 300;
        let costoSeguridad = seguridadVal * 120;
        let precioPlatoUnit = platoTxt.includes("Chiriuchu") ? 35 : (platoTxt.includes("Lechón") ? 35 : 25);
        let costoCatering = cantPlatosVal * precioPlatoUnit;

        let totalCalculado = costoAnimador + costoCantantes + costoSeguridad + costoCatering + 200;
        let montoPagar = modalidad === "50%" ? (totalCalculado * 0.5) : totalCalculado;

        reservaTemporal = {
            numVoucher: "IMP-" + Math.floor(100000 + Math.random() * 900000),
            nombre: document.getElementById('nombre').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('correo').value,
            tipo_evento: document.getElementById('tipoEvento').value,
            fecha_evento: document.getElementById('fechaEvento').value,
            animadores: animadorTxt,
            cantantes: cantantesVal,
            seguridad: seguridadVal,
            plato_catering: platoTxt,
            cantidad_platos: cantPlatosVal,
            bebidas: bebidasVal,
            ubicacion: ubicacionVal,
            coords_gps: document.getElementById('coordsUbicacion').value,
            totalCalculado: totalCalculado,
            montoPagar: montoPagar,
            modalidad: modalidad
        };

        document.getElementById('montoTotalTxt').innerText = `S/ ${totalCalculado.toFixed(2)}`;
        document.getElementById('modalidadTxt').innerText = modalidad === "50%" ? "Adelanto del 50%" : "Pago Completo (100%)";
        document.getElementById('montoPagarTxt').innerText = `S/ ${montoPagar.toFixed(2)}`;

        document.getElementById('modalPasarelaPago').style.display = 'flex';
    });
}

function cerrarPasarela() {
    document.getElementById('modalPasarelaPago').style.display = 'none';
}

function seleccionarMetodo(metodo) {
    if(metodo === 'Yape') {
        document.getElementById('bloqueYape').style.display = 'block';
        document.getElementById('bloqueTarjeta').style.display = 'none';
        document.getElementById('tabYape').classList.add('active');
        document.getElementById('tabTarjeta').classList.remove('active');
    } else {
        document.getElementById('bloqueYape').style.display = 'none';
        document.getElementById('bloqueTarjeta').style.display = 'block';
        document.getElementById('tabTarjeta').classList.add('active');
        document.getElementById('tabYape').classList.remove('active');
    }
}

// PROCESAR PAGO YAPE
function procesarPagoYape(e) {
    e.preventDefault();
    const numOp = document.getElementById('numOperacionYape').value;
    finalizarReservaConPago("Yape / Plin", `N° Operación: ${numOp}`);
}

// PROCESAR PAGO TARJETA
function procesarPagoTarjeta(e) {
    e.preventDefault();
    const lastDigits = document.getElementById('cardNumber').value.slice(-4) || "1234";
    finalizarReservaConPago("Tarjeta de Débito/Crédito", `Tarjeta ****${lastDigits}`);
}

function finalizarReservaConPago(metodoPago, detallePago) {
    if(!reservaTemporal) return;

    const reservaFinal = {
        voucher: reservaTemporal.numVoucher,
        nombre: reservaTemporal.nombre,
        telefono: reservaTemporal.telefono,
        email: reservaTemporal.email,
        tipo_evento: reservaTemporal.tipo_evento,
        fecha_evento: reservaTemporal.fecha_evento,
        animadores: reservaTemporal.animadores,
        cantantes: reservaTemporal.cantantes,
        seguridad: reservaTemporal.seguridad,
        plato_catering: reservaTemporal.plato_catering,
        cantidad_platos: reservaTemporal.cantidad_platos,
        bebidas: reservaTemporal.bebidas,
        ubicacion: reservaTemporal.ubicacion,
        coords_gps: reservaTemporal.coords_gps,
        monto_total: `S/ ${reservaTemporal.totalCalculado.toFixed(2)}`,
        monto_pagado: `S/ ${reservaTemporal.montoPagar.toFixed(2)}`,
        modalidad: reservaTemporal.modalidad,
        metodo_pago: metodoPago,
        detalle_pago: detallePago,
        estado: reservaTemporal.modalidad === "100%" ? "PAGADO TOTAL (100%)" : "ADELANTO PAGADO (50%)"
    };

    // 1. Guardar en localStorage
    let listaReservas = JSON.parse(localStorage.getItem('reservas_imperium')) || [];
    listaReservas.unshift(reservaFinal);
    localStorage.setItem('reservas_imperium', JSON.stringify(listaReservas));

    // 2. Guardar en Supabase (si el cliente de Supabase está presente)
    if (window.supabase) {
        window.supabase.from('reservas').insert([{
            codigo_voucher: reservaFinal.voucher,
            cliente_nombre: reservaFinal.nombre,
            cliente_telefono: reservaFinal.telefono,
            cliente_email: reservaFinal.email,
            tipo_evento: reservaFinal.tipo_evento,
            fecha_evento: reservaFinal.fecha_evento,
            animadores: reservaFinal.animadores,
            cantantes: reservaFinal.cantantes,
            seguridad: reservaFinal.seguridad,
            plato_catering: reservaFinal.plato_catering,
            cantidad_platos: reservaFinal.cantidad_platos,
            bebidas: reservaFinal.bebidas,
            direccion_ubicacion: reservaFinal.ubicacion,
            coords_gps: reservaFinal.coords_gps,
            monto_total: reservaTemporal.totalCalculado,
            monto_pagado: reservaTemporal.montoPagar,
            modalidad_pago: reservaFinal.modalidad,
            metodo_pago: reservaFinal.metodo_pago,
            detalle_pago: reservaFinal.detalle_pago,
            estado_pago: reservaFinal.estado
        }]).then(({ data, error }) => {
            if(error) console.error("Error guardando en Supabase:", error);
            else console.log("Registrado con éxito en Supabase:", data);
        });
    }

    // 3. Generar Voucher PDF (Descarga automática)
    if (window.jspdf) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFillColor(107, 0, 26);
        doc.rect(0, 0, 210, 30, 'F');
        doc.setTextColor(212, 175, 55);
        doc.setFontSize(18);
        doc.text("IMPERIUM EVENTOS & CATERING", 15, 18);
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text("Comprobante Oficial de Pago de Reserva", 15, 25);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.text(`N° VOUCHER: ${reservaFinal.voucher}`, 15, 42);
        doc.text(`Cliente: ${reservaFinal.nombre}`, 15, 50);
        doc.text(`Contacto: ${reservaFinal.telefono} | Correo: ${reservaFinal.email}`, 15, 58);
        doc.text(`Evento: ${reservaFinal.tipo_evento} - Fecha: ${reservaFinal.fecha_evento}`, 15, 66);
        doc.text(`Catering: ${reservaFinal.cantidad_platos} porciones de ${reservaFinal.plato_catering}`, 15, 74);
        doc.text(`Bebidas / Adicionales: ${reservaFinal.bebidas}`, 15, 82);
        doc.text(`Ubicación: ${reservaFinal.ubicacion}`, 15, 90);

        doc.setFillColor(245, 238, 241);
        doc.rect(15, 98, 180, 32, 'F');
        doc.setFontSize(10);
        doc.setTextColor(107, 0, 26);
        doc.text(`Monto Total del Evento: ${reservaFinal.monto_total}`, 20, 106);
        doc.text(`MONTO PAGADO AHORA (${reservaFinal.modalidad}): ${reservaFinal.monto_pagado}`, 20, 114);
        doc.text(`Medio de Pago: ${reservaFinal.metodo_pago} (${reservaFinal.detalle_pago})`, 20, 122);

        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text("Conserve este voucher. El comprobante ha sido registrado de forma oficial.", 15, 138);

        doc.save(`Voucher_Pago_${reservaFinal.voucher}.pdf`);
    }

    // 4. Notificación a WhatsApp del Encargado
    let mensaje = `*¡CONFIRMACIÓN DE PAGO DE RESERVA!* 💳\n\n`;
    mensaje += `*Voucher N°:* ${reservaFinal.voucher}\n`;
    mensaje += `👤 *Cliente:* ${reservaFinal.nombre}\n`;
    mensaje += `📧 *Correo Cliente:* ${reservaFinal.email}\n`;
    mensaje += `📱 *Teléfono:* ${reservaFinal.telefono}\n`;
    mensaje += `🎈 *Evento:* ${reservaFinal.tipo_evento} (${reservaFinal.fecha_evento})\n`;
    mensaje += `🍽️ *Catering:* ${reservaFinal.cantidad_platos} porciones de ${reservaFinal.plato_catering}\n`;
    mensaje += `🍹 *Bebidas/Adicionales:* ${reservaFinal.bebidas}\n`;
    mensaje += `💰 *Costo Total:* ${reservaFinal.monto_total}\n`;
    mensaje += `✅ *MONTO DEPOSITADO:* ${reservaFinal.monto_pagado}\n`;
    mensaje += `💳 *Método de Pago:* ${reservaFinal.metodo_pago}\n`;
    mensaje += `🔢 *Detalle/Transacción:* ${reservaFinal.detalle_pago}\n`;
    mensaje += `📌 *Estado:* ${reservaFinal.estado}\n`;
    mensaje += `📍 *Ubicación:* ${reservaFinal.ubicacion}\n`;
    mensaje += `🗺️ *Ubicación GPS:* ${reservaFinal.coords_gps}\n`;

    cerrarPasarela();

    // 5. Muestra la ventana de éxito y abre WhatsApp
    document.getElementById('voucherCodigoTxt').innerText = reservaFinal.voucher;
    const correoElem = document.getElementById('correoDestinoTxt');
    if (correoElem) correoElem.innerText = reservaFinal.email;
    document.getElementById('modalExitoCorreo').style.display = 'flex';

    window.open(`https://api.whatsapp.com/send?phone=${TEL_ENCARGADO}&text=${encodeURIComponent(mensaje)}`, '_blank');

    formEvento.reset();
}

// CHATBOT
function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    if (chatBox) {
        chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
    }
}

function enviarMensaje() {
    const input = document.getElementById('userInput');
    if (!input) return;
    const texto = input.value.trim();
    if(!texto) return;

    const chatBody = document.getElementById('chatBody');

    chatBody.innerHTML += `<div class="msg msg-user">${texto}</div>`;
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        let respuesta = "Puedes consultar nuestros precios haciendo clic en las tarjetas o realizar tu reserva pagando el adelanto con Yape o Tarjeta.";
        const q = texto.toLowerCase();
        if(q.includes('pago') || q.includes('yape') || q.includes('tarjeta')) {
            respuesta = "Aceptamos Yape, Plin y tarjetas de crédito/débito. Puedes elegir pagar el 50% de adelanto o el 100% total.";
        } else if(q.includes('voucher') || q.includes('comprobante')) {
            respuesta = "El comprobante oficial PDF se descarga automáticamente al confirmar el pago y se envía a nuestro WhatsApp.";
        }
        chatBody.innerHTML += `<div class="msg msg-bot">${respuesta}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
}