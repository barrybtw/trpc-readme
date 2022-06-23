import type { NextPage } from "next";
import { MutableRefObject, RefObject, useLayoutEffect, useRef } from "react";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  let results;

  results = await fetch(
    "https://raw.githubusercontent.com/trpc/trpc/main/README.md",
  );

  results = await results.text();

  return {
    props: {
      results,
    },
  };
}

const Home = ({ results }: { results: string }) => {
  const parsed = results.split("###");

  let paths: number[] = [];
  let texts: string[] = [];
  parsed.forEach((thing) => {
    let example = thing.split("\n");
    if (
      example[0].toLowerCase().includes("sponsors") ||
      example[0].toLowerCase().includes("individuals")
    ) {
      let currentIndex = results.indexOf(example[0]);
      paths.push(currentIndex);
    }
  });

  paths.forEach((textIndex, index) => {
    let currentIndex = textIndex;
    let nextIndex = paths[index + 1];

    let textHere = results.substring(currentIndex, nextIndex);

    texts.push(textHere);
  });

  console.log(texts);

  return (
    <div className={styles.container}>
      <h1>Test</h1>
      <div
        className="product-des"
        dangerouslySetInnerHTML={{ __html: texts }}
      />
    </div>
  );
};

export default Home;
