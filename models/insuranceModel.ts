export type InsuranceModel = {
  PersonName: {
    PersonFirstName: string;
    PersonSecondName: string;
    PersonThirdName: string;
    PersonFourthName: string;
  };
  PersonCode: number;
  PersonNationalId: string;
  PersonInsuranceId: string;
  PersonNumberOfWorkingYears: number;
  PersonNumberOfInsuranceYears: number;
  PersonInsuranceValue: number;
  InsuranceBySherkaPercentage: number;
  FinalValue: number;
  Month: number;
  Year: number;
};

export type sendInsuranceModel = {
  PersonCode: number;
  PersonTa2meenValueAtThatMonth: number;
  Ta2meenPercentagePaidBySherkaAtThatMonth: number;
  Ta2meenPercentagePaidByPersonAtThatMonth: number;
  Ta2meenValuePaidBySherkaAtThatMonth: number;
  Ta2meenValuePaidByPersonAtThatMonth: number;
  Month: number;
  Year: number;
};
