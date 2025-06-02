function pedirDNI() {
    let DNI = prompt("Ingrese su N° de DNI");

    while (isNaN(DNI) || Number(DNI) <= 0) {
        alert("Ingrese un N° de DNI válido");
        DNI = prompt("Ingrese su N° de DNI nuevamente");
    };

    return Number(DNI);
}

function pedirContrasena() {
    
    let contrasena;

    do {
        contrasena = prompt("Defina una contraseña de 4 números")
    }
    while (!contrasena || contrasena.length !== 4 || isNaN(contrasena));

    return Number(contrasena);
}

function registrarUsuario() {
    alert("Bienvenido/a a la app Mayores BNA.");

    const nombre = prompt("Ingrese su nombre/s");
    const apellido = prompt("Ingrese su apellido/s");
    const dni = pedirDNI();
    const contrasena = pedirContrasena();
    const cobraMinima = confirm("¿Cobra la jubilación mínima?\nPresione 'Aceptar' para Sí, 'Cancelar' para No");

    const usuario = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        contrasena: contrasena,
        cobraMinima: cobraMinima,
    };

    alert("Registro exitoso. Bienvenido/a " + nombre + " " + apellido);
    console.log("Datos del usuario:", usuario);

    return usuario;
}

function loginUsuario(usuario) {
    alert("Bienvenido/a a la app Mayores BNA.");
    let accesoPermitido = false;

    for (let i = 1; i <= 3; i++) {
        let dniIngresado = Number(prompt("Ingrese su DNI"));
        let contrasenaIngresada = Number(prompt("Ingrese su contraseña (4 números)"));

        if (contrasenaIngresada === usuario.contrasena && dniIngresado === usuario.dni) {

            alert("Acceso concedido. Bienvenido/a " + usuario.nombre);
            accesoPermitido = true;
            break;

        } else {
            alert("Datos incorrectos. Intento " + i + " de 3");
        }
    }

    if (!accesoPermitido) {
        alert("Cuenta bloqueada por intentos fallidos.");
    }

    return accesoPermitido;
}

let usuarioRegistrado = registrarUsuario();
let accesoCorrecto = loginUsuario(usuarioRegistrado);
let saldoInicial;

if (usuarioRegistrado.cobraMinima === true) {
    saldoInicial = 366481.74;
} else {
    saldoInicial = 527865.18;
}

let menuText = "Bienvenido/a a la app Mayores BNA, elija una de las siguientes opciones: \n 1- Saldo \n 2- Ver fecha de próximo cobro \n 3- Simular un préstamo \n 0- Salir"

while (accesoCorrecto) {
    let menu = Number(prompt(menuText)) 

    while (isNaN(menu)) {
        alert("Por favor ingrese una de las opciones válidas")
        menu = Number(prompt(menuText))
    }

    switch (menu) {

        case 1:
            alert (`Su saldo es $${saldoInicial.toFixed(2)}`)
        break;

        case 2:
            let terminacionDNI = Number(String(usuarioRegistrado.dni).slice(-1));
            let fechaCobro;

            if (usuarioRegistrado.cobraMinima) {
                let fechaMinima = [
                    "9 de junio", "10 de junio", "11 de junio", "12 de junio", "13 de junio",
                    "16 de junio", "17 de junio", "18 de junio", "19 de junio", "20 de junio"
                ];
                fechaCobro = fechaMinima[terminacionDNI];
            } else {
                if (terminacionDNI === 0 || terminacionDNI === 1) {
                    fechaCobro = "23 de junio";
                } else if (terminacionDNI === 2 || terminacionDNI === 3) {
                    fechaCobro = "24 de junio";
                } else if (terminacionDNI === 4 || terminacionDNI === 5) {
                    fechaCobro = "25 de junio";
                } else if (terminacionDNI === 6 || terminacionDNI === 7) {
                    fechaCobro = "26 de junio";
                } else if (terminacionDNI === 8 || terminacionDNI === 9) {
                    fechaCobro = "27 de junio";
                }
            }

            alert("Su próxima fecha estimada de cobro es: " + fechaCobro);
            break;

        case 0:
        alert ("Muchas gracias por usar Mayores BNA, lo esperamos pronto!")
        accesoCorrecto = false;
        break;

    }
    
}   