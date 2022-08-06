export type TaxesModel = {
  PersonName: {
    PersonFirstName: string;
    PersonSecondName: string;
    PersonThirdName: string;
    PersonFourthName: string;
  };
  PersonCode: number;
  PersonNationalId: string;
  PersonInsuranceId: string;
  PersonMorattab: number;
  TaxesPercentage: number;
  TaxesValue: number;
};

export type sendTaxesModel = {
  PersonCode: number;
  PersonMorattabAtThatMonth: number;
  PersonDarayebPercentageAtThatMonth: number;
  TotalValueOfDarayeb: number;
  Month: number;
  Year: number;
};
