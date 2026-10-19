function cargarSismos() {
    if (typeof URL_API_SISMOS === 'undefined' || !URL_API_SISMOS) return;

    fetch(URL_API_SISMOS)
        .then(response => response.json())
        .then(data => {
            if (typeof mapa === 'undefined') return;

            L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    const mag = feature.properties.mag;
                    return L.circleMarker(latlng, {
                        radius: Math.max(mag * 2, 3),
                        fillColor: "#ef4444",
                        color: "#b91c1c",
                        weight: 1,
                        fillOpacity: 0.6
                    });
                },
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(
                        `<b>Sismo Magnitud: ${feature.properties.mag}</b><br>` +
                        `Lugar: ${feature.properties.place}<br>` +
                        `Fecha: ${new Date(feature.properties.time).toLocaleString()}`
                    );
                }
            }).addTo(mapa);
        })
        .catch(err => console.error("Error al consumir la API de sismos:", err));
}

document.addEventListener('DOMContentLoaded', cargarSismos);