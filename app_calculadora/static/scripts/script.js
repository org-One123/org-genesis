document.getElementById('btnSumar')?.addEventListener('click', function(e) {
    const val1 = parseFloat(document.getElementById('num1').value) || 0;
    const val2 = parseFloat(document.getElementById('num2').value) || 0;
    const total = val1 + val2;
    const resultadoEl = document.getElementById('resultado');
    if (resultadoEl) resultadoEl.innerText = total;
});