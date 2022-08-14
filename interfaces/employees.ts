

export interface IAllEmployeesModel {
    PersonCode: number,
    PersonFirstName: string,
    PersonSecondName: string,
    PersonThirdName: string,
    PersonFourthName: string,
    PersonDyana: { DyanaName: string },
    PersonWazeefa: { PersonWazeefa: { WazeefaName: string } }
}

export interface IEmployeeProfileModel {
    employeeGeneralInfo: {
        PersonCode: number,
        PersonFirstName: string,
        PersonSecondName: string,
        PersonThirdName: string,
        PersonFourthName: string,
        PersonRaqamQawmy: string,
        PersonRaqamTa2meeny: string,
        PersonTelephoneArdy?: string,
        PersonTaree5Milad: string,
        PersonTaree5Ta3yeen: string,
        PersonSanawatTa2meen: number,
        PersonDyanaId: number,
        PersonTa2meenValue: number,
        PersonTypeId: number,
    },
    employeeAddress: {
        PersonAddress: string,
        ManteqaLookup: {
            ManteqaName: string
        },
        MohafzatLookup: {
            MohafzaName: string
        },
        PersonMohafzaID: number,
        PersonManteqaID:number
    },
    employeeDocuments: {
        Beta2aWesh?: string,
        Beta2aDahr?: string,
        Feesh?: string,
        ShehadetMilad?: string,
        ShehadetGeish?: string,
        PersonContract?: string,
    },
    employeeMoratab: {
        CurrentMorattab: number,
        PersonMorattabDareebaPercentage: number,
    },
    employeeMobile: {
        MobileNumber: string,
    },
    employeeWazeefa: {
        PersonWazeefa: {
            WazeefaName: string
        },
        PersonWazeefaId: number,
    }
}