import { Product } from "./validateProduct";
export default async function deleteProducts(
  sql: unknown,
  id: string
): Promise<Product[] | null> {
  console.log(sql);
  if (typeof sql == "function") {
    const data = await sql`DELETE FROM products WHERE product_id = ${id}`;
    return data;
  }
  return null;
}
