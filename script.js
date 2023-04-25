fetch("data.json")
    .then(respuesta => respuesta.json())
    .then(arrayAlumnos => miPrograma(arrayAlumnos))

let saludo = document.getElementById("saludo")
let horaInicio = document.getElementById("horaInicio")
let DateTime = luxon.DateTime

window.addEventListener("load", () => {
    let sesionGuardada = localStorage.getItem("sesion")
    if (sesionGuardada) {
        let sesion = JSON.parse(sesionGuardada)
        let usuario = sesion.usuario.toUpperCase()

        saludo.innerHTML = `<h2> ¡Hola, ${usuario}! </h2>`

        let fechaInicio = DateTime.fromISO(sesion.inicio)
        console.log(fechaInicio)
        let { day: dia, month: mes, year: anio} = fechaInicio
        let hora = fechaInicio.toLocaleString(DateTime.TIME_SIMPLE)
        horaInicio.innerHTML = `<h4> Tu último inicio fue el ${dia}/${mes}/${anio} a las ${hora}</h4>`
    } else {
        window.location.href = "login.html"
    }
})

function miPrograma(arrayAlumnos) {
    class Alumno {
        constructor(id, nombre, curso, edad) {
            this.id = id
            this.nombre = nombre
            this.curso = curso
            this.edad = edad
        }
    }
    
    let btnBuscarNombre = document.getElementById("btnBuscarNombre")
    let btnMostrar = document.getElementById("btnMostrar")
    let btnAgregarAlumno = document.getElementById('btnAgregarAlumno')
    let busqueda = document.getElementById("busqueda")
    let alumnosDiv = document.getElementById("alumnosDiv")
    
    
    
    
    // FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES
    function renderizarAlumnos(array, noEncontrado) {
        let alumnosGuardados = localStorage.getItem("alumnos")
        if (alumnosGuardados) {
            arrayAlumnos = JSON.parse(alumnosGuardados)
        }
        alumnosDiv.innerHTML = ""
            array.forEach((alumno) => {
            let alumnoDiv = document.createElement("div")
            alumnoDiv.innerHTML = `<img src="bxs-user-circle.svg" id="alumnoImg">
                                    <div id="alumnoInfo">
                                    <p>ID: ${alumno.id}</p>
                                    <p>Nombre: ${alumno.nombre}</p>
                                    <p>Curso: ${alumno.curso}</p>
                                    <p>Edad: ${alumno.edad}</p>
                                    </div>`
            alumnosDiv.appendChild(alumnoDiv)
            })
    }
    
    function buscarAlumno(nombre) {
        let alumnoEncontrado = arrayAlumnos.find((alumno) => {
        return alumno.nombre.toLowerCase() === nombre.toLowerCase()
        })
        return alumnoEncontrado
    }
    
    function agregarAlumno() {
        let nombre = document.getElementById("nombre").value
        let curso = document.getElementById("curso").value
        let edad = parseInt(document.getElementById("edad").value)
    
        if (!nombre || !curso || isNaN(edad)) {
            alumnosDiv.innerHTML = `<p> Llene todos los campos </p>`
            return
        }
    
        let id = 1
        if (arrayAlumnos.length > 0) {
            id = arrayAlumnos[arrayAlumnos.length - 1].id + 1
        }
    
        let nuevoAlumno = new Alumno(id, nombre, curso, edad)
        arrayAlumnos.push(nuevoAlumno)
        localStorage.setItem("alumnos", JSON.stringify(arrayAlumnos))
        
        document.getElementById("nombre").value = ""
        document.getElementById("curso").value = ""
        document.getElementById("edad").value = ""
    
        dropTostada()
        renderizarAlumnos(arrayAlumnos)
    }

    function dropTostada() {
        Toastify({
            text: "Alumno agregado correctamente",
            duration: 3000,
            close: false,
            gravity: "top",
            position: "right", 
            stopOnFocus: false,
            style: {
                background: "#f26419",
            },
        }).showToast();
    }
    
    // FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES
    
    // EVENTOS EVENTOS EVENTOS EVENTOS EVENTOS EVENTOS EVENTOS 
    btnBuscarNombre.addEventListener("click", () => {
        let nombreBuscado = busqueda.value
        let alumnoEncontrado = buscarAlumno(nombreBuscado)
    
        if (alumnoEncontrado === undefined) {
            alumnosDiv.innerHTML = `<p> No existe alumno con ese nombre </p>`
        } else {
            renderizarAlumnos([alumnoEncontrado])
        }
    })
    
    btnMostrar.addEventListener("click", () => {
        renderizarAlumnos(arrayAlumnos)
    })
    
    
    btnAgregarAlumno.addEventListener('click', agregarAlumno)
    // EVENTOS EVENTOS EVENTOS EVENTOS EVENTOS EVENTOS EVENTOS 
}