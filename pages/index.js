import fs from "fs/promises";
import path from "path";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

// working with fs module inside react componet will fail. Because browser side JS
// cannot access the file system
export default function Home(props) {
  const { products } = props;
  return (
    <>
      <ul>
        {products?.map((product) => {
          return <li key={product.id}>{product.title}</li>;
        })}
      </ul>
    </>
  );
}

// this function prepares the props for the component at the time of pre-rendering.

// Next js first executes this function and in second step execute component function.

// Any file that is containig getStaticProps function is pre-rendered.

// Code inside getStaticProps is not visible on client side/ not sent to client side.
export async function getStaticProps() {
  // It fetches data and exposes the data to the componet using props.

  // Always returns an object with a "props" key
  // All of this happens at the build time.

  // ---------------
  // we want to load data from the file system and not want to make an http request
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      // products: [{ id: "p1", title: "Product 1" }],
      products: data.products,
    },
  };
}
