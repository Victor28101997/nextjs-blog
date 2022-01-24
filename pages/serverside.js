export async function getServerSideProps({ req }) {
  return {
    props: {
      countryCode: req?.headers["cloudfront-viewer-country"] || "global",
    },
  };
}

export default function serversidePage({ countryCode }) {
  return <>{countryCode}</>;
}
