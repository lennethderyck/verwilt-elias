import { PrismicText } from "@prismicio/react";
import styles from '../styles/components/_card.module.scss';
import { PrismicNextImage } from "@prismicio/next";
import {useState, useCallback, useEffect} from "react";


export const Card = ( {slice} ) => {
    const[imageClicked, setImageClicked] = useState(false);
    const activate = () => {
      setImageClicked(true)
    }
    function sliceUrl(url){
      return url.slice(url.indexOf("_")+1, url.indexOf("?"));
    }
  return (
        <div className={styles["card"]}>
            {imageClicked ? (
          <>
            <div className={styles["box"]} onClick={() => setImageClicked(!imageClicked)}>
              <div className={styles["pics-box"]}>
              <PrismicNextImage
                field={slice.primary.image}
                layout="fill"
                alt=""
              />
              </div>
              <p onClick={() => setImageClicked(!imageClicked)}>X</p>
            </div>
            <div></div>
          </>
        ) : (
          ''
        )}
          <p>{sliceUrl(slice.primary.image.url)}</p>
          <PrismicNextImage
                field={slice.primary.image}
                layout="fill"
                onClick={() => activate()}
                alt=""
              />
        </div>
  );
};
