import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { useRouter } from "next/router"
import { LoginForm } from "src/core/components/MainAuthenticationForm/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Log In">
      <LoginForm onSuccess={() => router.push(Routes.Home())} />
    </Layout>
  )
}

export default LoginPage
