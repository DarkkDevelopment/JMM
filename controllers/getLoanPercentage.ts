import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

const getLoanPercentage = async (req: NextApiRequest, res: NextApiResponse) => {
  const loanPercentage = await prisma.fixedGlobalValues.findUnique({
    where: {
      Name: "LoanPercentage",
    },
  });
  return loanPercentage;
};

export default getLoanPercentage;
