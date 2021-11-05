/* eslint-disable @next/next/no-img-element */
import styles from "../styles/character.module.css";
import { useRouter } from "next/router";
import Welcome from "./Welcome";

let path = "";

export default function Character({ API_DATA }) {
  const router = useRouter();
  console.log(API_DATA);

  return (
    <>
      <Welcome />
      <div className={`${styles.flexCenter} ${styles.enclosure}`}>
        {API_DATA.map((data) => {
          return (
            <>
              <div className={`${styles.flexCenter} ${styles.content}`}>
                <h1>{data.title}</h1>
                <p>{data.description}</p>
                <div className={`${styles.flexCenter} ${styles.dateAirings}`}>
                  <div>First Episode was Aired on {data.firstEpiAir}</div>
                  <div>Last Episode was Aired on {data.lastEpiAir}</div>
                </div>
                <div className={styles.status}>Status: { data.status }</div>
              </div>
              <img
                src={data.showImage}
                alt={data.title}
                className={styles.renderImage}
              />
            </>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  console.log(query);

  const res = await fetch(
    `https://my-anime-api-project.herokuapp.com/api?title=${query.title}`
  );

  const data = await res.json();

  return {
    props: {
      API_DATA: data,
    },
  };
}
