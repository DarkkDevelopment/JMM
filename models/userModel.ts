export type User = {
  // table Person
  PersonCode: number;
  PersonFirstName: string;
  PersonSecondName: string;
  PersonThirdName: string;
  PersonFourthName: string;
  PersonRaqamQawmy: string;
  PersonRaqamTa2meeny: string;
  PersonTelephoneArdy: string;
  PersonTaree5Milad: Date;
  PersonTaree5Ta3yeen: Date;
  PersonSanawatTa2meen: number;
  PersonDyana: number;
  PersonType: number;
  PersonTa2meenValue: number;
  deletedAt: Date;
  // table address
  PersonAddress: string;
  PersonManteqaID: number;
  PersonMohafzaID: number;
  // table passwords
  PersonSystemPassword: string;
  // table documents
  Beta2aWesh: string;
  Beta2aDahr: string;
  Feesh: string;
  ShehadetMilad: string;
  ShehadetGeish: string;
  PersonContract: string;
  // table current moratabat
  CurrentMorattab: number;
  PersonMorattabDareebaPercentage: number;
  // table mobile numbers
  MobileNumber: string;
  // table Person Wazeefa
  PersonWazeefa: number;
};
