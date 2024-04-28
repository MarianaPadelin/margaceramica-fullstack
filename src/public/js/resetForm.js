const form = document.getElementById("resetPass");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  fetch("/api/users/restoreForm", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        alert("Constraseña actualizada con éxito");

        return window.location.replace("/");
      } else {
        alert("Error actualizando la contraseña");
        return window.location.replace("/resetPassword");
      }
    })
    .catch((error) => {
      alert("Error actualizando la contraseña");
      console.log(error);
    });
});
