let form = document.getElementById("formLogin")
let usuarioIngresado = document.getElementById("usuario")
let contrasenaIngresada = document.getElementById("contrasena")
let errorText = document.getElementById("error")
let DateTime = luxon.DateTime

form.addEventListener("submit", (e) => {
    e.preventDefault()
        let usuario = usuarioIngresado.value
        let contrasena = contrasenaIngresada.value


    if (usuario === "bautista" && contrasena === "bautista123") {
        let sesion = {
            usuario: usuario,
            inicio: DateTime.local(), 
        }
        localStorage.setItem("sesion", JSON.stringify(sesion))

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha iniciado sesión correctamente',
            showConfirmButton: false,
            timer: 1500
        })
    
        setTimeout(()=> {
            window.location.href = "index.html"
        }, 1700)

    } else {
        Swal.fire({
            icon: 'error',
            text: 'Usuario o contraseña incorrectos',
    })
    }
})


