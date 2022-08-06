export type HedoorModel = {
  PersonCode: number;
  HodoorTime: Date;
  EnserafTime: Date;
  TotalNumberOfWorkingHoursAtThatDay: number;
  ExtraHours: number;
  LateHours: number;
  Date: Date;
};

export type GetAttendanceModel = {
  PersonName: {
    PersonFirstName: string;
    PersonSecondName: string;
    PersonThirdName: string;
    PersonFourthName: string;
  };
  PersonCode: number;
  HodoorTime: Date | null;
  EnserafTime: Date | null;
  TotalNumberOfWorkingHoursAtThatDay: number | null;
  ExtraHours: number;
  LateHours: number;
  ExtraFactor: number;
  LateFactor: number;
  Date: Date;
};
