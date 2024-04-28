export const generateProductErrorInfoES = (product) => {
  return `Hay campos incompletos o Invalidos
        Lista de propiedades requeridas:
            -> Título: type String, recibido: ${product.title}
            -> Descripción: type String, recibido: ${product.description}
            -> Precio: type Number, recibido: ${product.price}
            -> Código: type String, recibido: ${product.code}
            -> Categoría: type String, recibido: ${product.category}
            -> Stock: type Number, recibido: ${product.stock}

    `;
};

export const generateProductErrorInfoENG = (product) => {
  return `Incomplete or invalid fields.
        Required fields: 
            -> Title: type String, recieved: ${product.title}
            -> Description: type String, recieved: ${product.description}
            -> Price: type Number, recieved: ${product.price}
            -> Code: type String, recieved: ${product.code}
            -> Category: type String, recieved: ${product.category}
            -> Stock: type Number, recieved: ${product.stock}

    `;
};


export const repetedCodeErrorInfo = (code) => {
    return ` El código del producto ya existe. Debe ser único.
                -> Title: type String, recibido: ${code}
    `;
}
