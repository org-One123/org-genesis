// Inicializar mapa centrado en Barcelona (Sagrada Família)
window.mapa = L.map('mapa').setView([41.4036, 2.1744], 14);

// Capa base de mapas (Esri World Street Map)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri'
}).addTo(window.mapa);

// Capas independientes
let capaRutaActual = L.layerGroup().addTo(window.mapa);
let capaPuntosTuristicos = L.layerGroup().addTo(window.mapa);
let marcadorUsuario = null;

// Rutas Turísticas Predefinidas en Barcelona
const RUTAS_BARCELONA = [
    {
        id: "bcn-1",
        nombre: "Sagrada Família ➔ Park Güell",
        lugar: "Barcelona",
        origen: [41.4036, 2.1744],
        destino: [41.4145, 2.1527]
    },
    {
        id: "bcn-2",
        nombre: "Plaça de Catalunya ➔ Casa Batlló",
        lugar: "Barcelona",
        origen: [41.3870, 2.1700],
        destino: [41.3917, 2.1649]
    },
    {
        id: "bcn-3",
        nombre: "Arc de Triomf ➔ Parc de la Ciutadella",
        lugar: "Barcelona",
        origen: [41.3911, 2.1806],
        destino: [41.3883, 2.1874]
    },
    {
        id: "bcn-4",
        nombre: "La Rambla ➔ Mercado de La Boqueria",
        lugar: "Barcelona",
        origen: [41.3813, 2.1730],
        destino: [41.3817, 2.1716]
    },
    {
        id: "bcn-5",
        nombre: "Spotify Camp Nou ➔ Plaça d'Espanya",
        lugar: "Barcelona",
        origen: [41.3809, 2.1228],
        destino: [41.3750, 2.1491]
    }
];

// Cargar lista de rutas en el <select>
const selector = document.getElementById('select-rutas');
if (selector) {
    RUTAS_BARCELONA.forEach((ruta, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `[${ruta.lugar}] ${ruta.nombre}`;
        selector.appendChild(option);
    });

    actualizarInputsRuta(0);

    selector.addEventListener('change', function(e) {
        actualizarInputsRuta(e.target.value);
    });
}

function actualizarInputsRuta(index) {
    const r = RUTAS_BARCELONA[index];
    if (r) {
        const inputOrigen = document.getElementById('coord-origen');
        const inputDestino = document.getElementById('coord-destino');
        if (inputOrigen) inputOrigen.value = `${r.origen[0]}, ${r.origen[1]}`;
        if (inputDestino) inputDestino.value = `${r.destino[0]}, ${r.destino[1]}`;
    }
}

function obtenerCoordenadasInput() {
    let origen = [41.4036, 2.1744];
    let destino = [41.4145, 2.1527];

    const inputOrigen = document.getElementById('coord-origen');
    const inputDestino = document.getElementById('coord-destino');

    if (inputOrigen && inputOrigen.value) {
        const p1 = inputOrigen.value.split(',');
        if (p1.length === 2) {
            const lat = parseFloat(p1[0].trim());
            const lng = parseFloat(p1[1].trim());
            if (!isNaN(lat) && !isNaN(lng)) origen = [lat, lng];
        }
    }

    if (inputDestino && inputDestino.value) {
        const p2 = inputDestino.value.split(',');
        if (p2.length === 2) {
            const lat = parseFloat(p2[0].trim());
            const lng = parseFloat(p2[1].trim());
            if (!isNaN(lat) && !isNaN(lng)) destino = [lat, lng];
        }
    }

    return { origen, destino };
}

// Trazar Ruta por calles de Barcelona con la API OSRM
function trazarRuta(index) {
    capaRutaActual.clearLayers();
    const r = RUTAS_BARCELONA[index];
    const { origen: p1, destino: p2 } = obtenerCoordenadasInput();

    const nombreOrigen = r ? r.nombre.split('➔')[0] : "Origen";
    const nombreDestino = r ? (r.nombre.split('➔')[1] || r.nombre) : "Destino";

    L.marker(p1).bindPopup(`<b>Origen:</b> ${nombreOrigen}`).addTo(capaRutaActual);
    L.marker(p2).bindPopup(`<b>Destino Turístico:</b> ${nombreDestino}`).addTo(capaRutaActual);

    const urlOSRM = `https://router.project-osrm.org/route/v1/driving/${p1[1]},${p1[0]};${p2[1]},${p2[0]}?overview=full&geometries=geojson`;

    fetch(urlOSRM)
        .then(res => res.json())
        .then(data => {
            if (data.routes && data.routes.length > 0) {
                const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
                const linea = L.polyline(coords, { color: '#00f0ff', weight: 5, opacity: 0.9 }).addTo(capaRutaActual);
                window.mapa.fitBounds(linea.getBounds(), { padding: [50, 50] });
            }
        })
        .catch(() => {
            const lineaRespaldo = L.polyline([p1, p2], { color: '#ff0055', weight: 4, dashArray: '6, 8' }).addTo(capaRutaActual);
            window.mapa.fitBounds(lineaRespaldo.getBounds(), { padding: [50, 50] });
        });
}

// Eventos de botones
document.getElementById('btn-trazar-seleccion')?.addEventListener('click', function() {
    const idx = selector ? selector.value : 0;
    trazarRuta(idx);
});

document.getElementById('btn-limpiar')?.addEventListener('click', function() {
    capaRutaActual.clearLayers();
    capaPuntosTuristicos.clearLayers();
});

// Geolocalización del navegador GPS
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            marcadorUsuario = L.marker([lat, lng])
                .addTo(window.mapa)
                .bindPopup("<b>📍 Tu Ubicación Actual</b>");
        },
        (err) => console.warn("GPS no disponible:", err.message)
    );
}