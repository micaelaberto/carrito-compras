//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    //agregar un curso al presionar agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];//reseter el array
        limpiarHTML();//eliminamos todo el HTML    
    })
}



function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}


//funcion para leer el contenido HTML
function leerDatosCurso (curso){
    console.log(curso);

    //Crear objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //actualizar cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;//retorna objeto actualizado
            } else {
                return curso;//retorna objetos que no estan duplicados
            }
        });//crea un nuevo arreglo
        articulosCarrito = [...cursos];
    } else {
        //agregamos el elemento
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    // console.log(articulosCarrito)
    carritoHTML();
}

//funcion eliminar
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //eliminar el curso por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML();
    } 
}
//Muestra el carrito de compra HTML

function carritoHTML (){
    //limpiar el HTML
    limpiarHTML();
    //recorre el carrito y genera el HTML
    articulosCarrito.forEach( (curso) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src= "${curso.imagen}" width = "100" ></td>
            <td> ${curso.nombre}</td>
            <td> ${curso.precio}</td>
            <td> ${curso.cantidad}</td>
            <td> <a href= "#" class="borrar-curso" data-id="${curso.id}"></td>
        `;

        //agregar el HTML del caarito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//elimina los cursos del tbody para que no se repitan al agregar
function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    //mejor forma para limpiar
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}