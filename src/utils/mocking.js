import { fakerES as faker } from "@faker-js/faker";

//Mocking:

export const generateProducts = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 1000, max: 8000, dec: 0 }),
    code: faker.location.zipCode(),
    status: faker.datatype.boolean(),
    category: faker.commerce.department(),
    stock: faker.finance.amount({ min: 1, max: 100, dec: 0 }),
    thumbnails: faker.image.urlLoremFlickr({ width: 128, height: 128 }),
  };
};
