import { ourFileRouter } from "src/uploadThing/uploadthing-router"
import { createRouteHandler } from "uploadthing/next-legacy"

export default createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
})
