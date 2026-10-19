function cargarCSV() {
    if (typeof CSRF_CSV === 'undefined' || !CSRF_CSV) return;

    fetch(CSRF_CSV)
        .then(response => response.text())
        .then(data => {
            console.log("Datos CSV cargados:");
            console.log(data);
        })
        .catch(err => console.error("Error al cargar el archivo CSV:", err));
}

document.addEventListener('DOMContentLoaded', cargarCSV);