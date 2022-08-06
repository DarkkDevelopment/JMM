export type SolfaModel = {
  PersonName: {
    PersonFirstName: string;
    PersonSecondName: string;
    PersonThirdName: string;
    PersonFourthName: string;
  };
  PersonCode: number;
  SolfaLimitAtThatMonth: number;
  LastSolfaValue: number;
  LastSolfaRequestDate: Date;
  LastSolfaMonthToBeApplied: number;
  LastSolfaYearToBeApplied: number;
};
