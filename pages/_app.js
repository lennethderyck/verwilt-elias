import '../styles/main.scss';
import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName, linkResolver } from "../prismicio";

const NextLinkShim = ({ href, children, locale, ...props }) => {
  return (
    <Link href={href} locale={locale}>
      {children}
    </Link>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <PrismicProvider
    linkResolver={linkResolver}
    internalLinkComponent={NextLinkShim}
  >
    <PrismicPreview repositoryName={repositoryName}>
      <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>)
}
