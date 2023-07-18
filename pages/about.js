import Head from 'next/head';
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicText, PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import styles from "../styles/pages/_about.module.scss";
import emailjs from '@emailjs/browser';
import { useForm } from "react-hook-form";

const About = ({navigation, settings, about}) =>{
  const form = useRef();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    emailjs.sendForm('service_61m103f', 'template_0quaekn', form.current, '49jaENgnLyYTn7VcB')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }
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
        <div className={styles["about-details-socials-mobile"]}>
            <p>Socials</p>
            <div className={styles["about-details-socials-box"]}>
            <a href="https://www.instagram.com/eliasverwilt/" target='_blank' rel="noreferrer">Instagram</a>
            <a href="https://www.tiktok.com/@eliasverwilt" target='_blank' rel="noreferrer">Tiktok</a>
            </div>
            
          </div>
          <div className={styles["about-details-socials-mobile"]}>
            <p>Email</p>
            <div className={styles["about-details-socials-box"]}>
            <a href = "mailto:eliasverwiltzakelijk@gmail.com" target='_blank' rel="noreferrer">eliasverwiltzakelijk@gmail.com</a>
            </div>
            
          </div>
        <div className={styles["about-image"]}>
          <PrismicNextImage
                    field={settings?.data.image}
                    alt=''
                  />
        </div>
        <div className={styles["about-details"]}>
          <p className={styles["about-details-description"]}><PrismicText field={about.data.description} /></p>
          <div className={styles["about-details-socials"]}>
            <p>Socials</p>
            <div className={styles["about-details-socials-box"]}>
            <a href="https://www.instagram.com/eliasverwilt/" target='_blank' rel="noreferrer">Instagram</a>
            <a href="https://www.tiktok.com/@eliasverwilt" target='_blank' rel="noreferrer">Tiktok</a>
            </div>
            
          </div>
          {/* <div className={styles["about-details-socials"]}>
            <p>Email</p>
            <div className={styles["about-details-socials-box"]}>
            <a href = "mailto:eliasverwiltzakelijk@gmail.com" target='_blank' rel="noreferrer">eliasverwiltzakelijk@gmail.com</a>
            </div>
            
          </div> */}
          <div className={styles["contact-form"]}>
          <p>Contact</p>
          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <div className={styles["contact-form-box"]}>
            <div className={styles["contact-form-box-input"]}>
            <input type="name" placeholder='Name' {...register("name", { required: true })} />
            
            {/* include validation with required or other standard HTML validation rules */}
            <input type="email" placeholder='Email' {...register("email", { required: true })} />

            </div>
            </div>
            <textarea type='text' name='name' placeholder='Message...' {...register("message", { required: true })}/>
            
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            
            <input type="submit" className={styles["contact-form-box-btn"]}/>
          </form>
          </div>
        </div>
        <div className={styles["footer"]}>
          <p>© 2023. All rights reserved</p>
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