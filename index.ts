import express from "express";
import { Product } from "./utils/validateProduct";
import getProducts from "./utils/getProducts";
import addProduct from "./utils/addProduct";
import validation from "./utils/validateProduct";
import deleteProducts from "./utils/deleteProduct";
import getProduct from "./utils/getProduct";
import cors from "cors";
import { neon } from "@neondatabase/serverless";

let sql: unknown = null;

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
import dotenv from "dotenv";
dotenv.config();
console.log(sql);

if (process.env.DATABASE_URL) {
  sql = neon(process.env.DATABASE_URL);
}
app.get("/", async (req, res) => {
  const products = await getProducts(sql);
  res.json(products);
});
// /add_product?product_name=Ball&category=game&price=10.01&stock_quantity=5&manufacturer=ABC&weight=0.21&dimensions=r25&color=white&description=leather ball for football
app.post("/product", async (req, res) => {
  const product = req.body as unknown as Product;
  product.price = Number(product.price);
  product.stock_quantity = Number(product.stock_quantity);
  product.weight = Number(product.weight);

  if (validation(product)) {
    console.log({ product });
    const result = await addProduct(sql, product);
    console.log(result);
    res.json(result);
  } else {
    console.log("not valid");
    res.status(423).json({ message: "not valid" });
  }
  //
});

// app.put();

// app.patch();

app.delete("/product/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  const product = await getProduct(sql, id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  } else {
    await deleteProducts(sql, id);
    //add error handle if user try to delete product what is connected to purchase records
    return res.sendStatus(200);
  }
});

// fix validation

app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
