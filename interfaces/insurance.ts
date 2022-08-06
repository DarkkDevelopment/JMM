

export interface IgetInsurance {
    //PersonCode: number,
    PersonName: {
        PersonFirstName: string;
        PersonSecondName: string;
        PersonThirdName: string;
        PersonFourthName: string;
    };
    PersonNationalId: string;
    PersonInsuranceId: string;
    PersonNumberOfWorkingYears: number;
    PersonNumberOfInsuranceYears: number;
    PersonInsuranceValue: number;
    FinalValue: number;
    InsuranceBySherkaPercentage:number
}