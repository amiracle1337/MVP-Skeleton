import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetSignupInvitesInput
  extends Pick<Prisma.SignupInviteFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize("ADMIN"),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSignupInvitesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: signupInvites,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.signupInvite.count({ where }),
      query: (paginateArgs) => db.signupInvite.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      signupInvites,
      nextPage,
      hasMore,
      count,
    }
  }
)
