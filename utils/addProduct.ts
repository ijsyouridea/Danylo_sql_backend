import { Product } from "./validateProduct";

export default async function addProduct(
  sql: unknown,
  {
    product_name,
    category,
    price,
    stock_quantity,
    manufacturer,
    weight,
    dimensions,
    color,
    description,
  }: Product
) {
  if (typeof sql == "function") {
    try {
      const data = await sql`INSERT INTO products (
        product_name, category, price, stock_quantity, manufacturer, weight, dimensions, color, description
      )
      VALUES(${product_name}, ${category}, ${price}, ${stock_quantity}, ${manufacturer}, ${weight}, ${dimensions}, ${color}, ${description}) RETURNING product_id`;
      // VALUES('Smartphone X', 'Electronics', 699.99, 100, 'TechCo', 0.18, '15x7x0.8 cm', 'Black', 'High-end smartphone with advanced features')`;
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  return null;
}
