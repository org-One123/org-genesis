def suma(a, b):
    return a + b

if __name__ == "__main__":
    resultado = suma(10, 20)
    print(f"Prueba automatizada de suma en Python: 10 + 20 = {resultado}")
    assert resultado == 30, "Error en la prueba de suma"
    print("¡Prueba de Python superada correctamente!")