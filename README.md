# Laboratorio 1 – Segundo Cómputo – Semana 9  
**Gestor de Inventario del Laboratorio de Redes**  
Vue.js + Persistencia con localStorage

**Estudiantes:**  
- Alejandro Ernesto Chicas  
- Gerson Asael Chica Lovos  

## 1. Situación Problemática

En el **Laboratorio de Redes** de la Facultad de Ciencia y Tecnología, el inventario de equipos físicos (routers, switches, access points, cables, servidores, etc.) se gestiona actualmente de forma manual mediante hojas de cálculo estáticas o registros en papel.  

Estos documentos **no se actualizan en tiempo real**, lo que genera los siguientes problemas:  

- Confusión al planificar prácticas: ¿qué equipo está libre?, ¿cuál está asignado a un rack o en mantenimiento?  
- Pérdida de tiempo buscando dispositivos físicos.  
- Riesgo de asignar el mismo equipo a dos grupos simultáneamente.  
- Dificultad para llevar control de mantenimientos preventivos o registrar fallos recurrentes.

### Sectores enfocados
- Educación superior (laboratorios de redes y telecomunicaciones)  
- Técnicos y docentes del laboratorio  
- Estudiantes realizando prácticas de configuración (CCNA, redes locales, inalámbricas, etc.)

## 2. Cómo resuelve la aplicación

La aplicación web (frontend puro con **Vue.js 3**, sin backend por el momento) permite:  

- Registrar y visualizar en tiempo real el inventario de equipos con campos clave: nombre, tipo, marca, modelo, estado.  
- Filtrar equipos por **tipo** y por **estado**.  
- Cambiar rápidamente el estado de un equipo (Disponible ↔ Asignado ↔ Mantenimiento ↔ Dañado).  
- Eliminar equipos del inventario.  
- Validar datos obligatorios y evitar duplicados (por combinación de número de serie o nombre-marca-modelo).  
- **Persistir los datos** en el navegador usando **localStorage** (el inventario se mantiene aunque se cierre o recargue la página).

## 3. Requisitos cumplidos (Semana 7 – Vue.js)

- Uso de **más de 5 etiquetas HTML** distintas: `<header>`, `<main>`, `<section>`, `<form>`, `<label>`, `<input>`, `<select>`, `<button>`, `<ul>`, `<li>`, etc.  
- Entradas con **validación** (campos obligatorios no vacíos, evitar duplicados por número de serie).  
- **Más de 5 variables reactivas** en Vue (ver sección de respuestas).  
- Uso obligatorio de directivas: **v-model**, **v-bind** (`:class`, `:disabled`, etc.), **v-for**, **v-if** / **v-else**.  
- Eventos: **@click**, **@submit.prevent**, etc.

## 4. Estructura de funciones principales implementadas

- `agregarEquipo()` → valida datos, verifica duplicados, agrega al array y limpia formulario.  
- `eliminarEquipo(serie)` → elimina equipo por número de serie único.  
- `cambiarEstado(equipo)` o `toggleEstado()` → rota cíclicamente entre los estados definidos.  
- `equiposFiltrados` (computed) → filtra dinámicamente según los valores de filtroTipo y filtroEstado.  
- Persistencia automática con **localStorage** (carga al montar la app, guarda al agregar/eliminar/cambiar estado).

## 5. ¿Qué falta para una versión productiva?

- Backend + base de datos (API REST + MySQL o Firebase) → multiusuario y sincronización real.  
- Autenticación de usuarios (docentes, técnicos, estudiantes).  
- Búsqueda avanzada por palabra clave.    
- Historial de cambios / auditoría (quién asignó, cuándo).  
- Diseño responsive avanzado (mejor experiencia móvil).  

## 6. Preguntas y respuestas

**¿Qué es Vue.js y cuál es su función en la página desarrollada?**  
Vue.js es un **framework progresivo de JavaScript** para construir interfaces de usuario reactivas y dinámicas. En esta aplicación, Vue se encarga de: actualizar la lista de equipos automáticamente al agregar, eliminar o cambiar estado, sincronizar los inputs con los datos (v-model), renderizar condicionalmente mensajes (v-if) y repetir elementos (v-for), todo sin recargar la página.

**Variables reactivas utilizadas y su función**  
1. `inventario` → Array principal con todos los equipos (objeto con id o serie, categoría, marca, modelo, serie, ip, ubicacion, estado).  
2. `nuevoNombre` / `nuevaCategoria` / `nuevaMarca` / `nuevoModelo` / `nuevoSerie` → Capturan los valores del formulario de nuevo equipo.  
3. `nuevaIP` / `nuevaUbicacion` / `nuevoEstado` → Campos adicionales del formulario.  
4. `filtroTipo` / `filtroEstado` → Controlan los filtros de la lista.  
5. `error` / `errorMensaje` → Manejan y muestran mensajes de validación.

**Diferencia entre v-bind y v-model**  
- **v-model**: Enlace bidireccional → el input actualiza la variable y la variable actualiza el input (ideal para formularios).  
- **v-bind** (o `:atributo`): Enlace unidireccional → solo pasa el valor de la variable al atributo HTML (ej. `:class` para colores según estado, `:disabled` para botones).

**Ejemplo de evento utilizado**  
- `@submit.prevent="agregarEquipo"` → en el `<form>` (evita recarga de página al enviar).  
- `@click="cambiarEstado(equipo)"` → en botón para rotar estado.

**¿Para qué se usa v-for en la aplicación?**  
Para iterar sobre el array `inventario` (o `equiposFiltrados`) y generar dinámicamente una fila `<li>` o `<tr>` por cada equipo, mostrando sus datos y botones de acción.

**Uso de v-if y problema que resuelve**  
- `v-if="errorMensaje"` → muestra alerta roja solo cuando hay error de validación (evita mensajes permanentes molestos).  
- `v-if="inventario.length === 0"` → muestra mensaje “El inventario está vacío” cuando no hay equipos, mejorando la usabilidad y evitando una lista vacía fea.

**Validación de datos**  
Se valida antes de agregar: campos obligatorios no vacíos (`trim()`), número de serie único (búsqueda en array), formato básico si aplica.  
Es importante porque evita datos corruptos, duplicados y errores que dificultarían el uso real del sistema en el laboratorio.
