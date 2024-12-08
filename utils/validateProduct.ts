export type Product = {
  product_name: string;
  category: string;
  price: number;
  stock_quantity: number;
  manufacturer: string;
  weight: number;
  dimensions: string;
  color: string;
  description: string;
};

export const validation = (product: Product) => {
  const {
    product_name,
    category,
    price,
    stock_quantity,
    manufacturer,
    weight,
    dimensions,
    color,
    description,
  } = product;
  if (
    [price, stock_quantity, weight].every(
      (p) => typeof p == "number" && p > 0
    ) &&
    [
      category,
      product_name,
      manufacturer,
      dimensions,
      color,
      description,
    ].every((t) => typeof t == "string" && t)
  ) {
    return true;
  }
  return false;
};
export default validation;
// let product = {
//   product_name: "",
//   price: 0,
// };
