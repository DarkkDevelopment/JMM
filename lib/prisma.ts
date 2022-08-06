import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

let prisma: PrismaClient;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    // @ts-ignore
    if (!global.prisma) {
      // @ts-ignore
      global.prisma = new PrismaClient();
    }
    // @ts-ignore
    prisma = global.prisma;
  }
}

/***********************************/
/* SOFT DELETE MIDDLEWARE */
/***********************************/
async function main() {
  //@ts-ignore
  prisma.$use(async (params, next) => {
    // Check incoming query type

    //@ts-ignore

    if (params.action == "delete") {
      // Delete queries
      // Change action to an update
      params.action = "update";
      params.args["data"] = { deletedAt: new Date().toISOString() };
    }
    if (params.action == "deleteMany") {
      // Delete many queries
      params.action = "updateMany";
      if (params.args.data != undefined) {
        params.args.data["deletedAt"] = new Date().toISOString();
      } else {
        params.args["data"] = { deletedAt: new Date().toISOString() };
      }
    }

    return next(params);
  });
}
main();
/***********************************/

// @ts-ignore
export default prisma;
