export type SolfaModel = {
  PersonName: {
    PersonFirstName: string;
    PersonSecondName: string;
    PersonThirdName: string;
    PersonFourthName: string;
  };
  PersonCode: number;
  SolfaLimitAtThatMonth: number;
  history: solfaHistoryForPerson[];
  lastMonthClosed: number | null;
  lastYearClosed: number | null;
};

export type solfaHistoryForPerson = {
  solfaId: number;
  solfaValue: number;
  solfaRequestDate: Date;
};
