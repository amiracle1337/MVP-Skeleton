import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react"
import { OurFileRouter } from "src/uploadThing/uploadthing-router"
import { generateReactHelpers } from "@uploadthing/react"

export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>()
