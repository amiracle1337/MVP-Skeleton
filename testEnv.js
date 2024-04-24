require("dotenv").config({ path: "./.env.local" })
console.log("DATABASE_URL:", process.env.DATABASE_URL)
console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY)
console.log("UPLOADTHING_SECRET:", process.env.UPLOADTHING_SECRET)
