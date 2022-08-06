
export interface IGetDrayb {
    PersonCode: number;
    PersonFirstName: string;
    PersonSecondName: string;
    PersonThirdName: string;
    PersonFourthName: string;
    PersonRaqamQawmy: string;
    PersonRaqamTa2meeny: string;
    PersonDarayebHistory: IDaraybHistory[]

}

interface IDaraybHistory {
    PersonDarayebPercentageAtThatMonth: number;
    TotalValueOfDarayeb: number,
    PersonMorattabAtThatMonth: number
}