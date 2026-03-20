const { createApp, ref, computed, watch } = Vue;

createApp({
    setup() {
        const inventario = ref([]);
        const nuevoNombre = ref('');
        const nuevaCategoria = ref('');
        const nuevaMarca = ref('');
        const nuevoModelo = ref('');
        const nuevoEstado = ref('');
        const error = ref(false);
        const errorMensaje = ref('');

        const categorias = ref([
            'Router',
            'Switch',
            'Access Point',
            'Cable',
            'Servidor',
            'Otro'
        ]);

        const ayudaNombre = 'Escriba el modelo exacto del dispositivo de red';

        const totalEquipos = computed(() => inventario.value.length);

        const filtroTipo = ref('');
        const filtroEstado = ref('');

        const equiposFiltrados = computed(() => {
            return inventario.value.filter(item => {
                const cumpleTipo = filtroTipo.value ? item.categoria === filtroTipo.value : true;
                const cumpleEstado = filtroEstado.value ? item.estado === filtroEstado.value : true;
                return cumpleTipo && cumpleEstado;
            });
        });

        const guardarLocal = () => {
            localStorage.setItem('inventario-redes', JSON.stringify(inventario.value));
        };

        const cargarLocal = () => {
            const guardado = localStorage.getItem('inventario-redes');
            if (guardado) {
                try {
                    inventario.value = JSON.parse(guardado);
                } catch {
                    inventario.value = [];
                }
            }
        };

        const validarRegistro = () => {
            if ([nuevoNombre.value, nuevaCategoria.value, nuevaMarca.value, nuevoModelo.value, nuevoEstado.value].some(val => val.trim() === '')) {
                error.value = true;
                errorMensaje.value = 'Todos los campos obligatorios deben llenarse.';
                return false;
            }

            const duplicado = inventario.value.some(item =>
                item.nombre.trim().toLowerCase() === nuevoNombre.value.trim().toLowerCase() &&
                item.marca.trim().toLowerCase() === nuevaMarca.value.trim().toLowerCase() &&
                item.modelo.trim().toLowerCase() === nuevoModelo.value.trim().toLowerCase()
            );

            if (duplicado) {
                error.value = true;
                errorMensaje.value = 'Ya existe un equipo con ese nombre, marca y modelo.';
                return false;
            }

            error.value = false;
            errorMensaje.value = '';
            return true;
        };

        const agregarEquipo = () => {
            if (!validarRegistro()) return;

            inventario.value.push({
                nombre: nuevoNombre.value.trim(),
                categoria: nuevaCategoria.value,
                marca: nuevaMarca.value.trim(),
                modelo: nuevoModelo.value.trim(),
                estado: nuevoEstado.value
            });

            nuevoNombre.value = '';
            nuevaCategoria.value = '';
            nuevaMarca.value = '';
            nuevoModelo.value = '';
            nuevoEstado.value = '';

            error.value = false;
            errorMensaje.value = '';
        };

        const eliminarEquipo = (item) => {
            const idx = inventario.value.indexOf(item);
            if (idx !== -1) {
                inventario.value.splice(idx, 1);
            }
        };

        const toggleEstado = (item) => {
            const estados = ['Disponible', 'Asignado', 'Mantenimiento', 'Dañado'];
            const currentIndex = estados.indexOf(item.estado);
            const siguiente = currentIndex === -1 ? 'Disponible' : estados[(currentIndex + 1) % estados.length];
            item.estado = siguiente;
        };

        const estadoClass = (estado) => {
            return {
                Disponible: 'estado-disponible',
                Asignado: 'estado-asignado',
                Mantenimiento: 'estado-mantenimiento',
                Dañado: 'estado-danado'
            }[estado] || '';
        };

        watch(inventario, guardarLocal, { deep: true });
        cargarLocal();

        return {
            inventario,
            nuevoNombre,
            nuevaCategoria,
            nuevaMarca,
            nuevoModelo,
            nuevoEstado,
            error,
            errorMensaje,
            categorias,
            ayudaNombre,
            totalEquipos,
            filtroTipo,
            filtroEstado,
            equiposFiltrados,
            agregarEquipo,
            eliminarEquipo,
            toggleEstado,
            estadoClass
        };
    }
}).mount('#app');