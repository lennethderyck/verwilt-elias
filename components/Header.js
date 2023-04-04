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
    <li className={isActive ? styles["test-nav"] : ""}>{children}</li>
  );
};

//This component is the navigation used over the whole website
export const Header = ({
  navigation,
  settings,
}) => {
  const router = useRouter();
  const [showNav, setNav] = useState(true);
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
          {showNav?"":<ul className={styles["nav-mobile"]}>
            <NavItem>
              <PrismicLink href="/">
                <p>Work</p>
              </PrismicLink>
            </NavItem>
            {navigation.data?.links.map((item) => {
              const isActive =
              router.asPath ===
              ("/" + item.link.uid === "/work" ? "/" : "/" + item.link.uid);
              return (
              <NavItem key={prismicH.asText(item.label)}>
                <PrismicLink field={item.link} >
                <p><PrismicText field={item.label} /></p>
                </PrismicLink>
              </NavItem>
            )})}
          </ul>}
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
                  <PrismicText field={item.label} />
                </PrismicLink>
              </NavItem>
            )})}
          </ul>
          {/* <FontAwesomeIcon icon={faBars} onClick={handleToggleNav} className={styles["nav-bars"]}/> */}
          <div onClick={handleToggleNav}
              className={styles["nav-bars"]}>
                <div></div>
                <div></div>
                <div></div>
              </div>
        </nav>
  );
};
