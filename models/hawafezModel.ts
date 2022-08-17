export type HawafezModel = {
  PersonHafezId: number;
  SubmitPersonCode: number;
  HafezReasonID: number;
  PureHafezValue: number;
  NumberOfBonusHours: number;
  HafezBonusHourRatio: number;
  NumberOfBonusDays: number;
  HafezBonusDayRatio: number;
  DayOfHafez: number;
  MonthOfHafez: number;
  YearOfHafez: number;
};

export type HawafezModelHistory = {
  PersonName: {
    PersonFirstName: string;
    PersonSecondName: string;
    PersonThirdName: string;
    PersonFourthName: string;
  };
  PersonCode: number;
  totalHawafezinThatMonth: number;
  HafezHistory: hawafezHistoryForPerson[];
  lastMonthClosed: number;
  lastYearClosed: number;
};

export type hawafezHistoryForPerson = {
  hafezId: number;
  HafezValue: number;
  DayOfHafez: number;
  MonthOfHafez: number;
  YearOfHafez: number;
};
