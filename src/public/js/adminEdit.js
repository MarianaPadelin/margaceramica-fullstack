const form = document.getElementById("EditForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const pid = window.location.href.split("/").reverse()[0];

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  fetch(`/api/products/${pid}`, {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 201) {
        alert("Producto ingresado correctamente");
        return window.location.replace("/api/products");
      }
      if(result.status === 200){
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
