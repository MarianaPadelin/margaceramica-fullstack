const botonLogout = document.getElementById("botonLogout");

botonLogout.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("/api/jwt/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        alert("Se ha cerrado la sesión");
      }
    })
    .then(() => {
      window.location.replace("/");
    })
    .catch((error) => {
      console.log(error);
    });
});

const uid = document.getElementById("userID").innerHTML;
const botonCambiar = document.getElementById("switch");
botonCambiar.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(`/api/users/premium/${uid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        alert("Se ha cambiado su suscripción");
      }
      else if (result.status === 400){
        alert("Error. Primero debe subir los documentos correspondientes");
      }
    })
    .then(() => {
     return window.location.replace("/users/products");
    })
    .catch((error) => {
      alert("Hubo un error con el cambio de suscripción");
      console.log(error);
    });
});


const elBotonComprar = document.getElementById("botonComprar");

const cid = document.getElementById("cid").innerHTML;

elBotonComprar.addEventListener("click", (e) => {

  e.preventDefault();

  fetch(`/api/carts/${cid}/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        return alert("Se completó la compra");
      } else if (result.status === 500) {
        return alert("El carrito está vacío.");
      } else return alert("Hubo un problema, inténtelo nuevamente");
    })
    .catch((error) => {
      console.log(error);
    });
});


const form = document.getElementById("premiumForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));
  console.log(uid)
  fetch(`/api/users/${uid}/documents`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })

    .catch((error) => {
      alert("credenciales incorrectas, inténtelo nuevamente");
      console.log(error);
    });
});
