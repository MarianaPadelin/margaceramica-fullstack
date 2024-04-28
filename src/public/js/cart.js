const botonComprar = document.getElementById("comprar");

const cid = document.getElementById("cid").innerHTML;

botonComprar.addEventListener("click", (e) => {
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

const botonVaciar = document.getElementById("borrar");

botonVaciar.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(`/api/carts/${cid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        return alert("Se vació el carrito");
      }

      alert("Hubo un problema, inténtelo nuevamente");
    })
    .then((tid) => {
      window.location.replace(`/api/carts/${cid}`);
    })
    .catch((error) => {
      console.log(error);
    });
});
