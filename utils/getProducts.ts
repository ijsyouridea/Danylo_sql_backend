import { Product } from "./validateProduct";
export default async function getProducts(
  sql: unknown
): Promise<Product[] | null> {
  console.log(sql);
  if (typeof sql == "function") {
    const data = await sql`SELECT * FROM products`;
    return data;
  }
  return null;
}
