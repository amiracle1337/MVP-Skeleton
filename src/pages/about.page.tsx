import React from "react"
import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"

const AboutPage: BlitzPage = () => {
  return (
    <Layout title="about">
      <h1>about</h1>
      <p>The base name of the file being edited, that is, the file name without its extensions.</p>
    </Layout>
  )
}

export default AboutPage
