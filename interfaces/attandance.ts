export interface IAttendanceModel {
  PersonName: {
    PersonFirstName: string;
    PersonSecondName: string;
    PersonThirdName: string;
    PersonFourthName: string;
  };
  PersonCode: number;
  HodoorTime: string;
  EnserafTime: string;
  TotalNumberOfWorkingHoursAtThatDay: number;
  Date: Date;
  LateFactor: number;
  ExtraFactor: number;
  ExtraHours: number;
  LateHours: number;
  attended: boolean;
}
