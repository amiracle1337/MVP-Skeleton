import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react"
import { OurFileRouter } from "src/uploadThing/uploadthing-router"

export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
