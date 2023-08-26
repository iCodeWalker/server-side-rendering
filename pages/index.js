import fs from "fs/promises";
import path from "path";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

// working with fs module inside react componet will fail. Because browser side JS
// cannot access the file system
export default function Home(props) {
  const { products } = props;

  return (
    <>
      <ul>
        {products?.map((product) => {
          return (
            <li key={product.id}>
              <Link href={`/${product.id}`}>{product.title}</Link>
            </li>
          );
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

  // The code actually doesn't run on real server, but it runs on our local machine, when the application
  // is built.

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  console.log(data, "datadata");
  // return {
  //   props: {
  //     // products: [{ id: "p1", title: "Product 1" }],
  //     products: data.products,
  //   },
  // };

  // It has one downside, if our data changes quickly

  // Incremental Static Re-Generation (ISR): It means that we don't generate our pages statically once
  // at the build time, but it is continuosly updated even after deployment without,
  // redeploying it.

  // To have ISR we just have to add "revalidate" Key to our return object

  if (!data) {
    return {
      redirect: "/no-data-route",
    };
  }
  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      // products: [{ id: "p1", title: "Product 1" }],
      products: data.products,
    },
    revalidate: 10, // re-creates page at every 10 seconds
    // notFound: true // If true than this page returns 404 (Not Found) Error
    // redirect : 'route-to-redirect' // Instead of rendering the component the user will be redirected to this route
  };
}
