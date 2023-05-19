import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useContext } from "react";
import styles from '../styles/components/_nav.module.scss';
import { useRouter } from "next/router";

//A smaal component for each link in the navigation
const NavItem = ({ children, isActive }) => {
  const router = useRouter();
  // const isActive =
  //             router.asPath ===
  //             ("/" + item.link.uid === "/home" ? "/" : "/" + item.link.uid);
  return (
    <div className={styles["menu-item"]}>
      <div className={styles["circle"]} style={{backgroundColor: isActive ? "black": "white"}} ></div>
      <li>{children}</li>
    </div>
    
  );
};

//This component is the navigation used over the whole website
export const Header = ({
  navigation,
  settings,
}) => {
  const router = useRouter();
  const [showNav, setNav] = useState(false);
  const handleToggleNav = () => {
    setNav(!showNav);
  };
  return (
        <nav className={styles["nav"]}>
          <NavItem>
              <PrismicLink href="/">
                <p className={styles["logo"]}><PrismicText field={navigation.data.homepageLabel} /></p>
              </PrismicLink>
            </NavItem>
          <ul className={styles["nav-desktop"]}>
            <NavItem isActive={router.asPath === "/"}>
              <PrismicLink href="/">
                <p>Work</p>
              </PrismicLink>
            </NavItem>
            {navigation.data?.links.map((item) => {
              const isActive =
              router.asPath ===
              ("/" + item.link.uid === "/work" ? "/" : "/" + item.link.uid);
              return (
              <NavItem key={prismicH.asText(item.label)} isActive={isActive}>
                <PrismicLink field={item.link}>
                  <p><PrismicText field={item.label} /></p>
                </PrismicLink>
              </NavItem>
            )})}
            <div onClick={handleToggleNav}
              className={styles["nav-bars"]}>
                <div></div>
                <div></div>
                <div></div>
              </div>
          </ul>
          {showNav && <ul className={styles["nav-mobile"]}>
            <NavItem isActive={router.asPath === "/"}>
              <PrismicLink href="/">
                <p>Work</p>
              </PrismicLink>
            </NavItem>
            {navigation.data?.links.map((item) => {
              const isActive =
              router.asPath ===
              ("/" + item.link.uid === "/work" ? "/" : "/" + item.link.uid);
              return (
              <NavItem key={prismicH.asText(item.label)} isActive={isActive}>
                <PrismicLink field={item.link}>
                  <p><PrismicText field={item.label} /></p>
                </PrismicLink>
              </NavItem>
            )})}
          </ul>}
          {/* <FontAwesomeIcon icon={faBars} onClick={handleToggleNav} className={styles["nav-bars"]}/> */}
          
        </nav>
  );
};
