export const PROD_URL = "https://artifo.co"
export const STAGING_URL = "https://staging.artifo.co"
export const DEV_URL = "http://localhost:3000"

export const railwayStaticUrl = process.env.RAILWAY_STATIC_URL
export const railwayEnvironment = process.env.RAILWAY_ENVIRONMENT

export const isDev = process.env.NODE_ENV === "development"
export const isStaging = railwayEnvironment?.toLowerCase() === "staging"
export const isProduction = railwayEnvironment?.toLowerCase() === "production"

export const URL_ORIGIN = isStaging ? STAGING_URL : isDev ? DEV_URL : PROD_URL

export const APP_NAME = "truffle"
export const APP_FULL_TITLE = "truffle "
export const APP_DESCRIPTION = "its all truffles"
export const APP_DEFAULT_IMAGE = `${URL_ORIGIN}/images/meta.jpg`
export const APP_DEFAULT_URL = URL_ORIGIN
