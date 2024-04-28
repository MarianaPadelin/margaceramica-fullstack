const form = document.getElementById("productForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  fetch("/premium/products", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 201) {
        alert("Producto ingresado correctamente");
        return window.location.replace("/premium/products");
      }
      alert("El ingreso falló. Complete los campos requeridos.");
    })
    .catch((error) => {
      alert("Hubo un error al ingresar los datos.");
      console.log(error);
    });
});
