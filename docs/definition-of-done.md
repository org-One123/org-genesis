# Definition of Done (DoD) - Proyecto Génesis

Para considerar que una Historia de Usuario o funcionalidad está **Terminada (Done)** en el Sprint, debe cumplir obligatoriamente con todos los ítems de esta lista:

## 1. Código y Calidad
- [ ] El código sigue las convenciones del lenguaje (PEP8 para Python / guía de estilos del proyecto).
- [ ] No existen advertencias ni errores en consola al ejecutar la aplicación.
- [ ] El código está modularizado y libre de variables sin usar o funciones muertas.

## 2. Control de Versiones y Colaboración
- [ ] Se creó una rama específica para la característica (`feature/nombre-funcionalidad`).
- [ ] El Pull Request incluye una descripción clara utilizando la plantilla del proyecto.
- [ ] El código fue revisado y aprobado por los Codeowners correspondientes (`CODEOWNERS`).
- [ ] No existen conflictos al fusionar (*merge*) hacia la rama principal.

## 3. Pruebas y Validación
- [ ] Se ejecutaron y pasaron con éxito los criterios de aceptación de la Historia de Usuario.
- [ ] Se realizaron pruebas funcionales de extremo a extremo.

## 4. Documentación
- [ ] Se documentaron nuevas funciones, modelos de datos o APIs en la carpeta `/docs`.
- [ ] El archivo `README.md` principal fue actualizado si hubo cambios de configuración.