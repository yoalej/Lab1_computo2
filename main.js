const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        // --- 5 VARIABLES REACTIVAS ---
        const inventario = ref([]);        // 1. Array de objetos
        const nuevoNombre = ref('');      // 2. String para el input
        const nuevaCategoria = ref('');   // 3. String para el select
        const error = ref(false);         // 4. Booleano para validación
        const categorias = ref([          // 5. Lista para el v-for
            'Router', 
            'Switch', 
            'Servidor', 
            'Access Point'
        ]);

        // Variable para v-bind
        const ayudaNombre = "Escriba el modelo exacto del dispositivo de red";

        // Variable computada (cuenta como reactiva)
        const totalEquipos = computed(() => inventario.value.length);

        // --- FUNCIÓN / EVENTO ---
        const agregarEquipo = () => {
            // Validación: No permitir datos vacíos (Punto 6)
            if (nuevoNombre.value.trim() === '' || nuevaCategoria.value === '') {
                error.value = true;
            } else {
                // Agregar al array
                inventario.value.push({
                    nombre: nuevoNombre.value,
                    categoria: nuevaCategoria.value
                });

                // Limpiar campos y quitar error
                nuevoNombre.value = '';
                nuevaCategoria.value = '';
                error.value = false;
            }
        };

        // Retornar todo para que el HTML lo use
        return {
            inventario,
            nuevoNombre,
            nuevaCategoria,
            error,
            categorias,
            ayudaNombre,
            totalEquipos,
            agregarEquipo
        }
    }
}).mount('#app');