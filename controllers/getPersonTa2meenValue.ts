import prisma from "../lib/prisma";

const getPersonTa2meenValue = async (personId: number) => {
  const person = await prisma.person.findFirst({
    where: {
      PersonCode: personId,
    },
    select: {
      PersonTa2meenValue: true,
    },
  });
  return person!.PersonTa2meenValue;
};

export default getPersonTa2meenValue;
