let grupoPuntos = null;

document.getElementById('btn-puntos')?.addEventListener('click', function() {
    console.log("Cargando puntos desde:", URL_JSON);

    if (typeof URL_JSON !== 'undefined' && URL_JSON) {
        fetch(URL_JSON)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}: No existe el archivo ${URL_JSON}`);
                return res.json();
            })
            .then(puntos => {
                console.log("Puntos cargados correctamente:", puntos);
                if (grupoPuntos) window.mapa.removeLayer(grupoPuntos);

                grupoPuntos = L.featureGroup();

                puntos.forEach(p => {
                    const lat = parseFloat(p.lat || p.latitud);
                    const lng = parseFloat(p.lng || p.longitud);

                    if (!isNaN(lat) && !isNaN(lng)) {
                        L.marker([lat, lng])
                            .bindPopup(`<b>${p.nombre || 'Punto de Encuentro'}</b><br>${p.descripcion || ''}`)
                            .addTo(grupoPuntos);
                    }
                });

                grupoPuntos.addTo(window.mapa);

                if (grupoPuntos.getLayers().length > 0) {
                    window.mapa.fitBounds(grupoPuntos.getBounds(), { padding: [40, 40] });
                }
            })
            .catch(err => console.error("Error al cargar JSON de puntos:", err));
    }
});