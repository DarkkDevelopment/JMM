import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
import config from "../config";

const createToken = (person: any, userJob: string): string => {
  const secret = config.TOKEN_SECRET;
  const token = jwt.sign(
    {
      code: person.PersonCode,
      job: userJob,
    },
    secret
  );
  return token;
};

const authenticate = async (personCode: number, password: string) => {
  // this should return the person with his job name
  const checkUser = await prisma.person.findFirst({
    where: {
      PersonCode: personCode,
    },
    include: {
      PersonWazeefa: {
        include: {
          PersonWazeefa: {
            select: {
              WazeefaName: true,
            },
          },
        },
      },
      PersonPassword: {
        select: {
          PersonSystemPassword: true,
        },
      },
    },
  });
  if (checkUser) {
    if (checkUser.PersonPassword[0].PersonSystemPassword === password) {
      const token = createToken(
        checkUser,
        checkUser.PersonWazeefa!.PersonWazeefa.WazeefaName
      );
      return token;
    }
  } else {
    return null;
  }
};

export default authenticate;
