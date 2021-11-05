/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Welcome from "./Welcome";

export default function Home({ API_DATA }) {
  // console.log(API_DATA);

  return (
    <>
      <Welcome />
      <div className={styles.container}>
        <div className={styles.grid}>
          {API_DATA.map((data) => {
            const { title, showImage } = data;

            const link = `/character?title=${title}`;

            return (
              <div className={styles.gridElement}>
                <img src={showImage} alt={title} />
                <a href={link}>{title}</a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  console.log(`Hello from server`);

  const res = await fetch("https://my-anime-api-project.herokuapp.com/api");
  const data = await res.json();

  return {
    props: {
      API_DATA: data,
    },
  };
}
