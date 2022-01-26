import "../styles/global.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    console.log("_app mounted!!");
  }, []);
  return <Component {...pageProps} />;
}
