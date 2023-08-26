import fs from "fs/promises";
import path from "path";
import { Fragment } from "react";

// Next js regenerates page by default but not in case of dynamic page ex: where name of page comes inside [];

// If we have dynamic page than the default behaviour is not to pre-generate the page.

// next js doesn't know in advance for how much pid's it have to pre-generate the page.
// it doesn't know which values for pid is supported.

// dynamic pags are generated just in time at the server

// dynamic pages don't just need data , they also need to know for which id value will be available

const ProductDetail = (props) => {
  const { loadedProduct } = props;

  console.log(props, "props");
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  // We use params to get access to the concrete values encoded in the url

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const product = data.products.find((item) => item.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// "getStaticPaths" Tells next js, which instances of the dynamic pages should be generated

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          pid: "p1",
        },
      },
      {
        params: {
          pid: "p2",
        },
      },
      {
        params: {
          pid: "p3",
        },
      },
      {
        params: {
          pid: "p4",
        },
      },
      {
        params: {
          pid: "p5",
        },
      },
      {
        params: {
          pid: "p6",
        },
      },
    ],
    fallback: false,
  };
}

export default ProductDetail;
