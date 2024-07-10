// When you deploy your application to Railway, the environment variables you set
// in the Railway project settings are made available to your application through process.env

export const PROD_URL = "https://artifo.co"
export const STAGING_URL = "https://staging.artifo.co"
export const DEV_URL = "http://localhost:3000"

export const railwayStaticUrl = process.env.RAILWAY_STATIC_URL
export const railwayEnvironment = process.env.RAILWAY_ENVIRONMENT

export const isDev = process.env.NODE_ENV === "development"
export const isStaging = railwayEnvironment?.toLowerCase() === "staging"
export const isProduction = railwayEnvironment?.toLowerCase() === "production"

export const URL_ORIGIN = isStaging ? STAGING_URL : isDev ? DEV_URL : PROD_URL

export const APP_NAME = "artifo"
export const APP_FULL_TITLE = "artifo - your artificial CFO"
export const APP_DESCRIPTION = "never worry about your finances again"
export const APP_DEFAULT_IMAGE = `${URL_ORIGIN}/images/meta.jpg`
export const APP_DEFAULT_URL = URL_ORIGIN
