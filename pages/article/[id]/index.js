import { server } from '../../../config'
import Link from 'next/link'
// import { useRouter } from 'next/router'

const article = ({ article }) => {
  // One way of fetching the id param
  // const router = useRouter()
  // const { id } = router.query

  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href='/'>Go Back</Link>
    </>
  )
}

// Generates all the paths for all the articles.
// Export static website with all the data from the API
// Data from our API
export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/articles/${context.params.id}`)

  const article = await res.json()

  return {
    props: {
      article,
    },
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`)

  const articles = await res.json()

  // Gives us an array of the article ids
  const ids = articles.map((article) => article.id)

  const paths = ids.map((id) => ({
    params: { id: id.toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

// Data from external API
// export const getStaticProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`,
//   )

//   const article = await res.json()

//   return {
//     props: {
//       article,
//     },
//   }
// }

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)

//   const articles = await res.json()

//   // Gives us an array of the article ids
//   const ids = articles.map((article) => article.id)

//   const paths = ids.map((id) => ({
//     params: { id: id.toString() },
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

// Using getServerSideProps method

// export const getServerSideProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`,
//   )

//   const article = await res.json()

//   return {
//     props: {
//       article,
//     },
//   }
// }

export default article
