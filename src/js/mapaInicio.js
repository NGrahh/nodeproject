(function(){
    const lat = 4.8367424;
    const lng = -75.6808774;
    const mapa = L.map('mapa-inicio').setView([lat, lng], 13)

    //se crea la variable para los marcadores
    let markers = new L.FeatureGroup().addTo(mapa)

    let propiedades = [];
    //filtros, reciben de la funcion filtrarPropiedades los arreglos
    const filtros = {
        categoria: '',
        precio: ''
    }
    //para hacer los filtros en las listas desplegables
    const categoriaSelect = document.querySelector('#categorias');
    const precioSelect = document.querySelector('#precios')
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //Filtrando de Categorias y precios
        categoriaSelect.addEventListener('change', e =>{
            filtros.categoria = +e.target.value
            filtrarPropiedades();
        })

        precioSelect.addEventListener('change', e => {
            filtros.precio = +e.target.value// +e permite convertir los string por defecto a número
            filtrarPropiedades()
        })
    const obtenerPropiedades = async () => {
        try{
            const url = '/api/propiedades'
            const respuesta = await fetch(url)//se conecta a la BD
            propiedades = await respuesta.json()
            mostrarPropiedades(propiedades)// se pasa el resultado de la consulta
        }catch(error){
            console.log(error)
        }
    }

    const mostrarPropiedades = propiedades => {

        //Limpiar los markers previos
        markers.clearLayers()

        propiedades.forEach(propiedad => {
            const marker = new L.marker([propiedad.lat, propiedad.lng], {
                autoPan: true
            })
            .addTo(mapa)
            .bindPopup(`
                <p class="text-green-600 font-bold">${propiedad.categoria.nombre}</p>
                <h1 class="text-xl font-extrabold uppercase my-2">${propiedad.titulo}</h1>
                <img src="/uploads/${propiedad.imagen}" alt="Imagen de la propiedad ${propiedad.titulo}">
                <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
                <a href="/propiedad/${propiedad.id}" class="bg-green-400 block p-2 text-center font-bold uppercase">Ver Propiedad</a>
            `);

            markers.addLayer(marker);
        });

        }
        //filtrando de acuerdo a la seleccion del usuario
        const filtrarPropiedades = () => {
            const resultado = propiedades.filter( filtrarCategoria ).filter( filtrarPrecio)// array metodo que no se pueden utilizar objetos solo arreglos, se filtra tanto por categoria como por precio
            mostrarPropiedades(resultado)
        }
        const filtrarCategoria = propiedad => filtros.categoria ? propiedad.categoriaId === filtros.categoria: propiedad
        const  filtrarPrecio = propiedad => filtros.precio ? propiedad.precioId === filtros.precio : propiedad
           
    obtenerPropiedades()
})()