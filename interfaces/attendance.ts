export interface AttendanceTable {
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
  KhasmHourRatio: number;
  HafezHourRatio: number;
  ExtraHours: number;
  LateHours: number;
  attended: boolean;
}
