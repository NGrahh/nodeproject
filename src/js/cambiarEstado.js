(function(){
    const cambiarEstadoBotones = document.querySelectorAll('.cambiarestado')
    //tomando el token para envarlo
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    //se hace iteración sobre cada botón
    cambiarEstadoBotones.forEach(boton => {
        boton.addEventListener('click', cambiarEstadoPropiedad);
    })

    //se reciben los eventos
    async function cambiarEstadoPropiedad(e) {
        //se extrae propiedadID y se renombra con id
        const {propiedadId: id} = e.target.dataset;
        try {
            const url = `/propiedades/cambiarestado/${id}`
            const respuesta = await fetch(url, {
                method: 'PUT',
                headers: {
                    'CSRF-token': token // se envie el token a la url
                }
            })
            
            const {resultado} = await respuesta.json()
            // si todo esta bien, con el target identica el elemento sobre el cual estoy haciendo click
            if(resultado){
                if(e.target.classList.contains('bg-yellow-100')){
                    e.target.classList.add('bg-green-100', 'text-green-800')
                    e.target.classList.remove('bg-yellow-100', 'text-yellow-800')
                    e.target.textContent = 'Publicado'
                }else{
                    e.target.classList.remove('bg-green-1000', 'text-green-800')
                    e.target.classList.add('bg-yellow-100', 'text-yellow-800')
                    e.target.textContent = 'No Publicado'
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }
})()

