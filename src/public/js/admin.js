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

const botonBorrar = document.getElementById("borrarItem");
const pid = document.getElementById("productId").innerHTML;

botonBorrar.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(`/api/products/${pid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {

      if (result.status === 201) {
         alert(`Se eliminó el producto ${pid} `);
         return window.location.replace("/api/products");
      } else if(result.status === 200) {
         alert(`Se eliminó el producto ${pid} `);
         return window.location.replace("/premium/products");
      } else {
         return alert("Error al eliminar el producto");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

