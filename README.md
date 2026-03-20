Laboratorio 1 Segundo Cómputo – Semana 9
Objetivo: Evaluar que el estudiante comprenda el uso del framework Vue de JavaScript para realizar interfaces gráficas.

1. Situación Problemática
En el Laboratorio de Redes de la Facultad de Ciencia y Tecnología, el inventario de equipos físicos (routers, switches, access points, cables, servidores, etc.) se maneja actualmente de forma manual mediante hojas de cálculo estáticas o registros en papel. Estos documentos no se actualizan en tiempo real, lo que provoca:

- Confusión al planificar prácticas (¿qué equipo está libre? ¿cuál está asignado a un rack o en mantenimiento?).
- Pérdida de tiempo buscando dispositivos.
- Riesgo de asignar el mismo equipo a dos grupos simultáneamente.
- Dificultad para controlar mantenimientos preventivos o fallos recurrentes.

Sectores enfocados
- Educación superior (laboratorios de redes y telecomunicaciones).
- Técnicos y docentes del laboratorio.
- Estudiantes en prácticas de configuración (CCNA, redes locales, inalámbricas, etc.).

2. Cómo resuelve la aplicación
La aplicación web (sin backend, solo frontend con Vue.js) permite:

- Registrar y visualizar en tiempo real equipos con campos completos: tipo, marca, modelo y estado.
- Filtrar por tipo y estado.
- Cambiar estado rápido (Disponible ↔ Asignado ↔ Mantenimiento ↔ Dañado).
- Eliminar equipos.
- Validar datos obligatorios y evitar duplicados por combinacion nombre-marca-modelo.
- Persistir datos localmente con localStorage (mantiene inventario tras cerrar o recargar navegador).

3. Requisitos cumplidos (semana)
- 5+ etiquetas HTML distintas: header, main, section, form, label, input, select, button, ul, li, etc.
- Inputs + validación (no vacío, no duplicados por número de serie).
- 5+ variables reactivas en Vue: inventario, nuevoNombre, nuevaCategoria, nuevaMarca, nuevoModelo, nuevoSerie, nuevaIP, nuevaUbicacion, nuevoEstado, filtroTipo, filtroEstado y más.
- Uso de v-model, v-bind, v-for, v-if.
- Eventos @click, @submit.

4. Estructura de funciones implementadas
- agregarEquipo: valida, registra en array, limpia campos.
- eliminarEquipo: quita el equipo por número de serie.
- toggleEstado: rota entre estados definidos.
- equiposFiltrados: Hace búsqueda dinámica según filtros.
- localStorage para persistencia.

5. ¿Qué falta para versión productiva?
- Backend (API + BD) para multiusuario y sincronización en la nube.
- Autenticación de usuarios.
- BUSCAR/ORDENAR por palabra clave, rack, marca.
- Historial de cambios y auditoría.
- Modo móvil optimizado (responsive avanzado).

6. Respuestas a guía
¿Qué es Vue.js y cuál es su función?
Vue.js es un framework progresivo de JavaScript para construir interfaces reactivas. Permite actualizar la vista automáticamente cuando cambian los datos.

Variables reactivas usadas:
1. inventario (array de equipos)
2. nuevoNombre
3. nuevaCategoria
4. nuevaMarca
5. nuevoModelo
6. nuevoSerie
7. nuevaIP
8. nuevaUbicacion
9. nuevoEstado
10. error y errorMensaje
11. filtroTipo
12. filtroEstado

Diferencia entre v-bind y v-model:
- v-bind enlaza valores de datos al atributo del HTML (solo lectura de datos).
- v-model crea enlace bidireccional (datos <-> input).

Ejemplo de evento utilizado:
- @submit.prevent="agregarEquipo" en el formulario (evita recarga).
- @click en botones (cambia estado, elimina registro).

¿Para qué se usa v-for?
Para iterar sobre el array inventario y renderizar un <li> por cada equipo.

Uso de v-if y problema que resuelve:
- Muestra mensajes condicionales (error de validación, inventario vacío) evitando pantalla estática.

La versión actual está lista para pruebas y entrega de la semana. Puedes seguir con el paso adicional de controlar también “responsable de la práctica” y “fecha de asignación”.
