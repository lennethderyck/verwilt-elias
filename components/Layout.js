import { Header } from "./Header";
import { Footer } from "./Footer";
import styles from '../styles/components/_layout.module.scss'

//Gives structure to the website by setting a header and footer.
//When layout is used the header will always be at the top of the page and the footer at the bottom
//All other content comes in between them
export const Layout = ({
  navigation,
  settings,
  footerNotActive,
  headerNotActive,
  children,
}) => {
  return (
    <div className="text-slate-700">
      {!headerNotActive?<Header
        navigation={navigation}
        settings={settings}
      />:""}
      <main className={styles["layout-main"]}>{children}</main>
      {!footerNotActive ? <Footer settings={settings}/> : ""}
    </div>
  );
};
