import Head from 'next/head';
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from "swiper";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicText, PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { createClient } from "../prismicio";
import styles from "../styles/pages/_home.module.scss";
import { Layout } from "../components/Layout";
import { Swiper, SwiperSlide } from "swiper/react";


import 'swiper/css';
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Home({settings, navigation, work}) {
  const [imageClicked, setImageClicked] = React.useState(false);
  const [huidigeIndex, setHuidigeIndex] = React.useState(0);
  const [imageSrc, setImageSrc] = React.useState("false");
  const [initialLoad, setInitialLoad] = useState(false)
  const activate = (src) => {
    setImageClicked(true);
    setImageSrc(src);
    const url = src.url;
  };
  const deActivate = () => {
    setImageClicked(false);
    setImageSrc("");
  };

  function sliceUrl(url){
    return url.slice(url.indexOf("_")+1, url.indexOf("?"));
  }

  useEffect(() => {
    //SwiperCore.use([EffectCoverflow, Pagination, Navigation]);
  }, []);
  const size = useWindowSize();
  return (
    <Layout
      navigation={navigation}
      settings={settings}
    >
      {imageClicked ? (
          <>
            <div className={styles["box"]}>
              <div className={styles["pics-box"]}>
                <PrismicNextImage
                    field={imageSrc}
                    layout="fill"
                    alt=''
                  />
              </div>
              <p onClick={() => deActivate()}>X</p>
            </div>{" "}
            <div></div>{" "}
          </>
        ) : (
          ""
        )}
      <Head>
        <title>Elias Verwilt</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/vmj7mfo.css"/>
      </Head>
      <main className={styles["main"]}>
        <div className={styles["content"]}>
        <Swiper
          modules={[EffectCoverflow, Pagination]}
          observeParents
          observer
          slidesPerView={size.width < 800 ? 2 : 3}
          centeredSlides
          loop
          effect={"coverflow"}
          coverflowEffect={{
            rotate: 0,
            stretch: 100,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          onSlideChange={(index) => {setHuidigeIndex(index.realIndex);}}
          className={styles["slider"]}
        >
          <div className={styles["swiper-wrapper"]}>
          {work.data.slices.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className={styles["swiper-slide"]}
                  onClick={(params) => {activate(item.primary.image); console.log(item)}}
                >
                  <PrismicNextImage
                    field={item?.primary.image}
                    className={styles["image"]}
                    alt=''
                  />
                </SwiperSlide>
              );
            })}
            </div>
        </Swiper>
        </div>
        <div className={styles["details"]}>
          <div className={styles["first"]}>Model <p>{">"}</p></div>
          <div className={styles["second"]}><PrismicText field={work.data.slices[huidigeIndex].primary?.title} /></div>
          <div className={styles["third"]}>({sliceUrl(work.data.slices[huidigeIndex].primary?.image.url)})</div>
        </div>
      </main>
    </Layout>
  )
}
//Gets the data for all images, the navigation and the settings
export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");
  const work = await client.getByUID("page", "work");

  return {
    props: {
      navigation,
      settings,
      work,
    },
  };
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    
      // Add event listener
      window.addEventListener("resize", handleResize);
     
      // Call handler right away so state gets updated with initial window size
      handleResize();
    
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}