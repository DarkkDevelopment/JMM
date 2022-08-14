import prisma from "../lib/prisma";

const getWorkingHours = async () => {
  const hours = await prisma.workingHoursLookup.findFirst({
    select: {
      StartTime: true,
      EndTime: true,
    },
  });
  if (hours) {
    const { StartTime, EndTime } = hours!;
    const NumberOfWorkingHours =
      Number(hours?.EndTime) - Number(hours?.StartTime);
    return { NumberOfWorkingHours, StartTime, EndTime };
  } else {
    return { NumberOfWorkingHours: 0, StartTime: "", EndTime: "" };
  }
};

export default getWorkingHours;
