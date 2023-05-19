import Head from 'next/head';
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicText, PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import styles from "../styles/pages/_about.module.scss";

const About = ({navigation, settings, about}) =>{
  console.log(about)
    return(
        <Layout
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title> About | Elias Verwilt</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles["about-container"]}>
        <div className={styles["about-image"]}>
          <PrismicNextImage
                    field={settings?.data.image}
                    alt=''
                  />
        </div>
        <div className={styles["about-details"]}>
          <p><PrismicText field={about.data.description} /></p>
          <div className={styles["about-details-contact"]}>
            <p>Contact</p>
            <p className={styles["email"]}><PrismicText field={settings.data.contact} /></p>
          </div>
          <div className={styles["about-details-socials"]}>
            <p>Socials</p>
            <a href="https://www.instagram.com/eliasverwilt/" target='_blank' rel="noreferrer">Instagram</a>
            <a href="https://www.tiktok.com/@eliasverwilt" target='_blank' rel="noreferrer">Tiktok</a>
          </div>
        </div>
      </main>
    </Layout>
    );
}

export default About;

export async function getStaticProps({ previewData }) {
    const client = createClient({ previewData });
  
    const navigation = await client.getSingle("navigation");
    const settings = await client.getSingle("settings");
    const about = await client.getByUID("page", "about");
  
    return {
      props: {
        navigation,
        settings,
        about
      },
    };
  }