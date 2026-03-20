1. Situación Problemática
Enunciado: En el Laboratorio de Redes de la Facultad de Ciencia y Tecnología, el inventario de equipos físicos (Routers, Switches, Access Points) se gestiona actualmente de forma manual o mediante hojas de cálculo estáticas que no se actualizan en tiempo real. Esto genera confusión cuando los estudiantes o técnicos necesitan saber qué dispositivos están disponibles para realizar prácticas de configuración o cuáles han sido asignados a un rack específico.

Sectores enfocados: * Sector Educativo: Gestión de recursos de laboratorios universitarios.

Sector de Soporte Técnico y Redes: Control de stock de hardware para infraestructura de TI.

Descripción de funciones: Nuestra aplicación resuelve este problema permitiendo:

Registro Dinámico: Agregar equipos al inventario con su nombre técnico y categoría.

Validación en Tiempo Real: Evitar registros incompletos que ensucien la base de datos.

Visualización Instantánea: Listar todos los equipos registrados mediante una interfaz reactiva que se actualiza sin recargar la página.

7. Respuestas a Preguntas de la Guía
¿Qué es Vue.js y cuál es su función? Es un framework de JavaScript "progresivo" utilizado para construir interfaces de usuario. Su función en nuestra página es manejar la reactividad; es decir, permite que el sitio web responda instantáneamente a lo que el usuario escribe o hace (como agregar un equipo) sin tener que refrescar todo el navegador.

Variables reactivas utilizadas: 
1.  inventario: Array que almacena los objetos (equipos) registrados.
2.  nuevoNombre: Almacena el texto que el usuario escribe en el input del nombre.
3.  nuevaCategoria: Guarda la opción seleccionada en el menú desplegable.
4.  error: Booleano que controla si se muestra o no el mensaje de validación.
5.  categorias: Lista de opciones fijas para clasificar los dispositivos.

Diferencia entre v-bind y v-model: * v-bind: Se usa para enlazar una variable a un atributo de HTML (como un title, src o una class). Es de una sola vía (del código a la vista).

v-model: Se usa para el enlace bidireccional de datos en inputs. Lo que el usuario escribe cambia la variable, y si la variable cambia en el código, el input se actualiza.

Ejemplo de evento utilizado: Utilizamos el evento de clic mediante @click="agregarEquipo" en el botón de registro. Al presionarlo, dispara la función que valida y guarda los datos.

¿Para qué utilizó la directiva v-for? La utilizamos para recorrer el array inventario y generar automáticamente una etiqueta <li> por cada equipo registrado, mostrando así la lista completa de forma dinámica.

Uso de v-if y problema que resuelve: Se utilizó para mostrar el mensaje de error cuando los campos están vacíos y para ocultar la lista de equipos cuando no hay registros. Resuelve el problema de la retroalimentación al usuario, evitando que se procesen datos incorrectos o que la pantalla se vea vacía sin explicación.

Validación de datos: Se realiza mediante una condicional if en la función agregarEquipo, verificando que los strings no estén vacíos. Es importante validar para garantizar la integridad de la información y evitar errores en el procesamiento de datos por parte del sistema.