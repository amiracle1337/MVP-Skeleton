import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Suspense } from "react"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "evApp"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback="Loading...">{children}</Suspense>
    </>
  )
}

export default Layout
