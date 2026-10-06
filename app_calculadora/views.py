from django.shortcuts import render

def index(request):
    resultado = None
    num1 = '0'
    num2 = '0'

    if request.method == 'POST':
        num1 = request.POST.get('num1', 0)
        num2 = request.POST.get('num2', 0)
        try:
            val1 = float(num1)
            val2 = float(num2)
            suma = val1 + val2
            
            # Formatear el resultado si es entero o decimal
            resultado = int(suma) if suma.is_integer() else suma
        except ValueError:
            resultado = "Entrada no válida"

    return render(request, 'index.html', {
        'resultado': resultado,
        'num1': num1,
        'num2': num2
    })