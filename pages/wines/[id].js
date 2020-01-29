import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()

  return (
    <>
      <h1>Wine #{router.query.id}</h1>
    </>
  )
}
