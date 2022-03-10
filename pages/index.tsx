import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { StudentsList } from "../src/components";
import Layout from "../src/components/Layout";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Awana Cohort</title>
        <meta name="description" content="Cohort students" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        content={
          <>
            <p className="subtitle">Our students are...</p>
            <StudentsList />
          </>
        }
      />
    </div>
  );
};

export default Home;
