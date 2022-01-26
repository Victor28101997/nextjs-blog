import Layout from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import Date from "../components/date";
import { wrapper } from "../store";

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    ({ preview }) => {
      const allPostsData = getSortedPostsData();
      return {
        props: {
          allPostsData,
        },
      };
    }
);

export default function Home({ allPostsData }) {
  const { tick } = useSelector((state) => state);
  return (
    <Layout home>
      {/* Keep the existing code here */}
      tick here: {tick}
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
