import { Product } from "./validateProduct";
export default async function getProduct(
  sql: unknown,
  id: string
): Promise<Product | null> {
  if (typeof sql === "function") {
    const data = await sql`SELECT * FROM products WHERE product_id = ${id}`;
    return data[0]; // Ensure the response is a single product or null
  }
  return null;
}
