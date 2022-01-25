export async function getServerSideProps({ req }) {
  return {
    props: {
      req,
    },
  };
}

export default function serversidePage({ req }) {
  return <>{JSON.stringify(req)}</>;
}
