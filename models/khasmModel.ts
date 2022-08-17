export type KhasmModel = {
  // PersonkhasmHistory Table
  PersonKhasmId: number;
  SubmitPersonCode: number;
  KhasmReasonID: number;
  PureKhasmValue: number;
  NumberOfLateHours: number;
  KhasmLateHourRatio: number;
  NumberOfGhyabDays: number;
  KhasGhyabDayRatio: number;
  DayOfKhasm: number;
  MonthOfKhasm: number;
  YearOfKhasm: number;
};

export type KhasmModelHistory = {
  PersonName: {
    PersonFirstName: string;
    PersonSecondName: string;
    PersonThirdName: string;
    PersonFourthName: string;
  };
  PersonCode: number;
  totalKhasminThatMonth: number;
  khasmHistory: khasmHistoryForPerson[];
  lastMonthClosed: number | null;
  lastYearClosed: number | null;
};

export type khasmHistoryForPerson = {
  khasmId: number;
  khasmValue: number;
  DayOfHafez: number;
  MonthOfHafez: number;
  YearOfHafez: number;
};
