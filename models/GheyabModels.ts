export type GetAbsenceModel = {
  PersonCode: number;
  PersonName: {
    PersonFirstName: string;
    PersonSecondName: string;
    PersonThirdName: string;
    PersonFourthName: string;
  };
  GheyabDayRatio: number | undefined;
  Date: Date;
};

export type sendAbsenceModel = {
  PersonGheyabCode: number;
  GheyabDate: Date;
};
