const carrito = document.querySelector('#carrito');
//console.log(carrito);
const listaCursos = document.querySelector('#lista-cursos');
const tableBodyCarrito = document.querySelector('#lista-carrito tbody');
//console.log(tableBodyCarrito);
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let carritoDeCompra = [];

const registrarEventListener = () => {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    btnVaciarCarrito.addEventListener('click', vaciarCursos);
}
registrarEventListener();

function agregarCurso(event) {
    event.preventDefault();
    if (event.target.classList.contains('agregar-carrito')) {
        const cardCursoSelect = event.target.parentElement.parentElement;
        leerLosDatosCuros(cardCursoSelect);

    }
}

function eliminarCurso (e)
{
    if(e.target.classList.contains('borrar-curso'))
    {
        const id = e.target.getAttribute('data-id');
        carritoDeCompra = carritoDeCompra.filter( c => c.id !== id);
        agregarCarritoAlHtml();
        console.log(carritoDeCompra);
    }
}

function vaciarCursos (e)
{
        carritoDeCompra = [];
        agregarCarritoAlHtml();
}

function leerLosDatosCuros(card) {
    const curso = {
        imagen: card.querySelector('img').src,
        titulo: card.querySelector('h4').textContent,
        precio: card.querySelector('.precio span').textContent,
        id: card.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = carritoDeCompra.some(infoCurso => {
        if (infoCurso.id === curso.id)
            return true;
        else
            return false;
    })
    console.log(existe)
    if (existe) {
        const copiaCursos = carritoDeCompra.map(infoCurso => {
            if (infoCurso.id === curso.id) {
                infoCurso.cantidad++;
            }
            return infoCurso;
        })
        carritoDeCompra = [...copiaCursos]
    } else {
        carritoDeCompra = [...carritoDeCompra, curso];
    }
    agregarCarritoAlHtml();

    console.log(carritoDeCompra);
}

function agregarAlCarrito(curso) {
    carritoDeCompra.push(curso);
    console.log(carritoDeCompra);
}

const agregarCarritoAlHtml = () => {
    limpiarCarritoHtml();
    carritoDeCompra.forEach(curso => {

        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML =
            `
        <td>
            <img src = "${imagen}" width="100" />
        </td>
        <td>
            <h5>${titulo}</h5>
        </td>
        <td>
            <h4>${precio}</h4>
        </td>
        <td>
            <h4>${cantidad}</h4>
        </td>
        <td>
            <a src="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
        `;
        tableBodyCarrito.appendChild(row);
    })
}

const limpiarCarritoHtml = () => {
    //Forma lenta
    //tableBodyCarrito.innerHTML = '';
    
    //forma rapida
    while (tableBodyCarrito.firstChild) {
        tableBodyCarrito.removeChild(tableBodyCarrito.firstChild);
    }
}

const eliminarDelCarrito = (id) => {
    carritoDeCompra.pop()
}