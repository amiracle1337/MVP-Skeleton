// import { resolver } from "@blitzjs/rpc"
// import db from "db"
// import { z } from "zod"

// const Input = z.object({
//   id: z.string(),
// })

// export default resolver.pipe(
//   resolver.zod(Input),
//   resolver.authorize("ADMIN"),
//   async ({ id }, { session: { userId } }) => {
//     const allExpiredGiftCodes = await db.inv.findFirst({
//       where: { id },
//     })

//     return allExpiredGiftCodes
//   }
// )
