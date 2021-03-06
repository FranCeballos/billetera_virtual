let infoPersonalEnLS = JSON.parse(localStorage.getItem("infoPersonal"));

console.log(infoPersonalEnLS);

let infoPersonal = {
  balance: 0,
  logueado: false,
  actividad: [],
};

infoPersonalEnLS && (infoPersonal = infoPersonalEnLS);

const listaActividad = document.querySelector(".appActividadLista");

actualizarHTMLSaldoNombreYActividad();

console.log(infoPersonal);

const actualizarEnLocalStorageObjetoInfoPersonal = function () {
  let infoPersonalEnJSON = JSON.stringify(infoPersonal);
  localStorage.setItem("infoPersonal", infoPersonalEnJSON);
};

const sumarActividadAlArray = function (mensaje) {
  infoPersonal.actividad.push(mensaje);
  actualizarEnLocalStorageObjetoInfoPersonal();
};

// Devuelve un objeto con cuota y precio final.
const calcularCuotaYPrecioFinal = function (precio, valorSelectorCuotas) {
  const valorCuotaYPrecioFinal = {};
  let coeficienteInteres = 1;
  let cuotas = valorSelectorCuotas;

  console.log(valorSelectorCuotas);
  if (cuotas === 1) {
    coeficienteInteres = 1.05;
  } else if (cuotas === 3) {
    coeficienteInteres = 1.1;
  } else if (cuotas === 6) {
    coeficienteInteres = 1.15;
  } else if (cuotas === 12) {
    coeficienteInteres = 1.3;
  }

  console.log(precio, coeficienteInteres, cuotas);

  valorCuotaYPrecioFinal.valorCuota =
    (precio * coeficienteInteres) / Number(cuotas);

  valorCuotaYPrecioFinal.precioFinal = precio * coeficienteInteres;

  return valorCuotaYPrecioFinal;
};

// Comprueba si después de restar un monto al balance el valor será negativo.
const comprobarSiElBalanceSeraPositivo = function (precio) {
  let estadoBalance = infoPersonal.balance - precio >= 0;
  return estadoBalance;
};

function actualizarHTMLSaldoNombreYActividad() {
  document.querySelector(
    ".appBalanceNumero"
  ).textContent = `$ ${infoPersonal.balance}`;
  document.querySelector(".appNombre").textContent = infoPersonal.nombre;

  listaActividad.innerHTML = "";

  infoPersonal.actividad.forEach(function (elemento) {
    const li = document.createElement("li");
    const texto = document.createTextNode(elemento);
    li.appendChild(texto);
    listaActividad.prepend(li);
  });
}

const sumarYORestarAlBalanceYActualizarHTMLSaldo = function (sumar, restar) {
  infoPersonal.balance = infoPersonal.balance + sumar - restar;
  actualizarHTMLSaldoNombreYActividad();
  actualizarEnLocalStorageObjetoInfoPersonal();
  console.log(infoPersonal);
};

const selectorDeTarjeta = document.querySelector("#selectorTarjeta");

const quitarSelectorTarjetaYMostrarBotonReset = function () {
  selectorDeTarjeta.style.display = "none";
  document.querySelector(
    ".appPagarSelectorTarjetaConfirmarBoton"
  ).style.display = "none";
  document.querySelector(".appPagarResetBoton").style.display = "inline-block";
};

const seccionPagarConCredito = document.querySelector(".appPagarCredito");
const seccionPagarConDebito = document.querySelector(".appPagarDebito");

const resetSeccionPagar = function () {
  document.querySelector(".appPagarDebitoInput").value = "";
  document.querySelector(".appPagarDebitoMensajeError").textContent = "";
  document.querySelector(".appPagarDebitoResumen").textContent = "";
  selectorDeTarjeta.style.display = "inline-block";
  document.querySelector(
    ".appPagarSelectorTarjetaConfirmarBoton"
  ).style.display = "inline-block";
  seccionPagarConCredito.style.display = "none";
  seccionPagarConDebito.style.display = "none";
  selectorDeTarjeta;
  document.querySelector(".appPagarResetBoton").style.display = "none";
  selectorDeTarjeta.value = "selected";
  document.querySelector(".appPagarCreditoInput").value = "";
  document.querySelector(".appPagarCreditoResumen").textContent = "Resumen";
};

const cambiarStringResumenPagoConCredito = function (
  cuotas,
  valorCuotas,
  precioFinal
) {
  document.querySelector(
    ".appPagarCreditoResumen"
  ).textContent = `Pagarás ${cuotas} cuota/s de $${valorCuotas}, siendo un total de $${precioFinal}`;
};

const elementoMensajeConfirmacionPago = document.querySelector(
  ".appPagarMensajeConfirmacion"
);

const mostrarMensajeConfirmacionPago = function (string) {
  elementoMensajeConfirmacionPago.style.display = "inline-block";
  elementoMensajeConfirmacionPago.textContent = string;
};

const seccionBienvenida = document.querySelector(".bienvenida");
const seccionApp = document.querySelector(".appGrid");

if (infoPersonal.logueado) {
  seccionBienvenida.style.display = "none";
  seccionApp.style.display = "grid";
} else {
  seccionBienvenida.style.display = "flex";
  seccionApp.style.display = "none";
}

// Confirmar nombre de usuario en bienvenida
document.querySelector(".confirmarNombre").addEventListener("click", () => {
  let nombreIngresado = document.querySelector(
    ".bienvenidaNombreIngresar"
  ).value;
  console.log(nombreIngresado);
  if (nombreIngresado !== "") {
    infoPersonal.nombre = nombreIngresado;
    seccionBienvenida.style.display = "none";
    seccionApp.style.display = "grid";
    document.querySelector(".appNombre").textContent = infoPersonal.nombre;
    infoPersonal.logueado = true;
    actualizarEnLocalStorageObjetoInfoPersonal();
    console.log(infoPersonal);
  } else {
    document.querySelector(".nombreNoIngresado").style.display = "inline-block";
  }
});

const botonEditarNombre = document.querySelector(".appNombreEditarBoton");
const inputEditarNombre = document.querySelector(".appNombreEditarInput");
const botonConfirmarNombre = document.querySelector(".appNombreConfirmarBoton");

// Editar nombre
botonEditarNombre.addEventListener("click", () => {
  botonEditarNombre.style.display = "none";
  inputEditarNombre.style.display = "inline-block";
  botonConfirmarNombre.style.display = "inline-block";
});

botonConfirmarNombre.addEventListener("click", () => {
  infoPersonal.nombre = inputEditarNombre.value;
  actualizarEnLocalStorageObjetoInfoPersonal();
  actualizarHTMLSaldoNombreYActividad();
  botonConfirmarNombre.style.display = "none";
  inputEditarNombre.style.display = "none";
  inputEditarNombre.value = "";
  botonEditarNombre.style.display = "inline-block";
  console.log(infoPersonal);
});

const inputIngresarDinero = document.querySelector(".appIngresarDineroInput");

// Confirmar el ingreso de dinero
document
  .querySelector(".appIngresarDineroBoton")
  .addEventListener("click", () => {
    let montoAIngresar = Number(inputIngresarDinero.value);
    sumarYORestarAlBalanceYActualizarHTMLSaldo(montoAIngresar, 0);
    actualizarEnLocalStorageObjetoInfoPersonal();
    inputIngresarDinero.value = "";

    if (montoAIngresar > 0) {
      Toastify({
        text: `Se ha confirmado el ingreso de $${montoAIngresar}`,
        duration: 5000,
      }).showToast();
      sumarActividadAlArray(`Ingreso de $${montoAIngresar}`);
      actualizarHTMLSaldoNombreYActividad();
    }
  });

// Confirmar tarjeta a usar para pagar
document
  .querySelector(".appPagarSelectorTarjetaConfirmarBoton")
  .addEventListener("click", () => {
    let valorSelector = selectorDeTarjeta.value;

    if (valorSelector === "debito") {
      quitarSelectorTarjetaYMostrarBotonReset();
      seccionPagarConCredito.style.display = "none";
      seccionPagarConDebito.style.display = "flex";
    } else if (valorSelector === "credito") {
      quitarSelectorTarjetaYMostrarBotonReset();
      seccionPagarConCredito.style.display = "flex";
      seccionPagarConDebito.style.display = "none";
    } else if (valorSelector === "selected") {
      seccionPagarConCredito.style.display = "none";
      seccionPagarConDebito.style.display = "none";
    }
  });

const inputPagarDebito = document.querySelector(".appPagarDebitoInput");
const eleSaldoInsuficienteDebito = document.querySelector(
  ".appPagarDebitoMensajeError"
);

// Actualizar string resumen pago con débito
inputPagarDebito.addEventListener("input", (e) => {
  document.querySelector(
    ".appPagarDebitoResumen"
  ).textContent = `El total a pagar con tarjeta de débito es: $${e.target.value}`;

  if (!comprobarSiElBalanceSeraPositivo(e.target.value)) {
    eleSaldoInsuficienteDebito.textContent = `Saldo insuficiente 🚫`;
  } else {
    eleSaldoInsuficienteDebito.textContent = "";
  }
});

// Confirmar pago con débito
document.querySelector(".appPagarDebitoBoton").addEventListener("click", () => {
  let montoAPagar = Number(inputPagarDebito.value);

  console.log(montoAPagar, comprobarSiElBalanceSeraPositivo(montoAPagar));

  if (comprobarSiElBalanceSeraPositivo(montoAPagar)) {
    resetSeccionPagar();
    Toastify({
      text: `Se ha confirmado el pago de $${montoAPagar}`,
      duration: 5000,
    }).showToast();
    sumarActividadAlArray(`Pago de $${montoAPagar} con débito`);
    sumarYORestarAlBalanceYActualizarHTMLSaldo(0, montoAPagar);
  }
});

const selectorDeCuotas = document.querySelector("#selectorCuotas");
const inputPagarCredito = document.querySelector(".appPagarCreditoInput");
const eleSaldoInsuficienteCredito = document.querySelector(
  ".appPagarCreditoError"
);

// Actualizar string resumen pago con crédito
inputPagarCredito.addEventListener("input", (e) => {
  let valorSelectorCuota = selectorDeCuotas.value;

  let valorCuotaYPrecioFinal = calcularCuotaYPrecioFinal(
    Number(e.target.value),
    Number(valorSelectorCuota)
  );

  console.log(valorCuotaYPrecioFinal);

  cambiarStringResumenPagoConCredito(
    valorSelectorCuota,
    valorCuotaYPrecioFinal.valorCuota.toFixed(2),
    valorCuotaYPrecioFinal.precioFinal.toFixed(2)
  );

  if (!comprobarSiElBalanceSeraPositivo(valorCuotaYPrecioFinal.precioFinal)) {
    eleSaldoInsuficienteCredito.style.display = "inline-block";
  } else {
    eleSaldoInsuficienteCredito.style.display = "none";
  }
});

selectorDeCuotas.addEventListener("change", (e) => {
  let montoIngresado = Number(inputPagarCredito.value);

  let valorCuotaYPrecioFinal = calcularCuotaYPrecioFinal(
    montoIngresado,
    Number(e.target.value)
  );

  document.querySelector(".appPagarCreditoResumen").textContent = `Pagarás ${
    selectorDeCuotas.value
  } cuota/s de $${valorCuotaYPrecioFinal.valorCuota.toFixed(
    2
  )}, siendo un total de $${valorCuotaYPrecioFinal.precioFinal.toFixed(2)}`;
});

// Resetear seccion pago
document
  .querySelector(".appPagarResetBoton")
  .addEventListener("click", resetSeccionPagar);

// Confirmar pago con crédito
document
  .querySelector(".appPagarCreditoBoton")
  .addEventListener("click", () => {
    let montoAPagar = Number(inputPagarCredito.value);
    let valorSelectorCuotas = Number(selectorDeCuotas.value);

    let costoFinal = calcularCuotaYPrecioFinal(
      montoAPagar,
      valorSelectorCuotas
    );

    console.log(costoFinal);

    if (comprobarSiElBalanceSeraPositivo(costoFinal.precioFinal)) {
      resetSeccionPagar();
      Toastify({
        text: `Se ha confirmado el pago de $${costoFinal.precioFinal.toFixed(
          2
        )}`,
        duration: 5000,
      }).showToast();
      sumarActividadAlArray(
        `Pago de $${costoFinal.precioFinal.toFixed(
          2
        )} en ${valorSelectorCuotas} cuota/s de $${costoFinal.valorCuota.toFixed(
          2
        )}`
      );
      sumarYORestarAlBalanceYActualizarHTMLSaldo(0, costoFinal.precioFinal);
    }
  });

fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.querySelector(
      ".compraDolarOficial"
    ).textContent = `$ ${data[0].casa.compra}`;
    document.querySelector(
      ".ventaDolarOficial"
    ).textContent = `$ ${data[0].casa.venta}`;
    document.querySelector(
      ".compraDolarBlue"
    ).textContent = `$ ${data[1].casa.compra}`;
    document.querySelector(
      ".ventaDolarBlue"
    ).textContent = `$ ${data[1].casa.venta}`;
  });

/* fetch("https://ws.smn.gob.ar/map_items/weather")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data[140].weather);
  }); */
