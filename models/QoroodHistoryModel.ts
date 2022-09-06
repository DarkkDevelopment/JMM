export type QoroodHistoryModel = {
  QardId: number;
  PersonName: {
    PersonFirstName: string;
    PersonSecondName: string;
    PersonThirdName: string;
    PersonFourthName: string;
  };
  QardValue: number;
  QardRequestDate: Date;
  Remaining: number;
};
