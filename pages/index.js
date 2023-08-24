import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

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
  return {
    props: {
      products: [{ id: "p1", title: "Product 1" }],
    },
  };
}
