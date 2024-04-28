export const invalidIDError = (id) => {
  return `El id del carrito No existe. 
            -> ID ingresado:  ${id}`;
};

export const emptyCart = (id) => {
  return `El carrito ${id} está vacío.`;
};
