import { IEmployeeProfileModel } from '../../interfaces/employees';

const employeeFormValidator = (emp: any): { response: boolean, message?: string } => {
    try {
        const { PersonCode,
            PersonDyana,
            PersonFirstName,
            PersonFourthName,
            PersonRaqamQawmy,
            PersonRaqamTa2meeny,
            PersonSanawatTa2meen,
            PersonSecondName,
            PersonTa2meenValue,
            PersonTaree5Milad,
            PersonTaree5Ta3yeen,
            PersonThirdName,
            PersonType,
            PersonAddress,
            PersonManteqaID,
            PersonMohafzaID,
            PersonWazeefa,
            CurrentMorattab,
            MobileNumber,
            Beta2aWesh,
            Feesh,
            Beta2aDahr,
            ShehadetMilad,
            ShehadetGeish,
            PersonContract,
            NumberOfAgazaDays,
        } = emp;

        if (
            !PersonCode || !PersonAddress || !PersonFirstName || !PersonSecondName || !PersonThirdName || !PersonFourthName || !MobileNumber || !PersonRaqamQawmy
            || !PersonRaqamTa2meeny || !PersonTa2meenValue || !PersonSanawatTa2meen || !CurrentMorattab || !PersonMohafzaID || !PersonTaree5Milad ||
            !PersonManteqaID || !PersonWazeefa || !PersonDyana || !PersonType || !Beta2aWesh || !Feesh || !Beta2aDahr ||
            !PersonTaree5Ta3yeen || !ShehadetMilad || !ShehadetGeish || !PersonContract
            || !NumberOfAgazaDays
        ) {
            return { response: false, message: 'برجاء ادخال جميع الخانات' };
        }
        console.log(PersonRaqamQawmy)
        console.log(Number.parseInt(PersonRaqamQawmy))
        if (!Number.parseInt(PersonCode)) {
            return { response: false, message: 'كود الموظف يجب أن يكون رقم' };
        }
        if (!Number.parseInt(MobileNumber) || MobileNumber.length != 11)
            return { response: false, message: 'رقم الموبايل يجب أن يكون 11 رقم' };
        if (!Number.parseInt(PersonRaqamQawmy) || PersonRaqamQawmy.length != 14)
            return { response: false, message: 'الرقم القومي يجب أن يكون 14 رقم' };
        if (!Number.parseInt(PersonRaqamTa2meeny) || PersonRaqamTa2meeny.length != 9)
            return { response: false, message: 'الرقم التاميني يجب أن يكون 9 ارقام' };
        console.log(Number.parseInt(PersonTa2meenValue))
        if (!Number.parseInt(PersonTa2meenValue) || (1400 > Number.parseInt(PersonTa2meenValue) || Number.parseInt(PersonTa2meenValue) > 9600))
            return { response: false, message: 'المبلغ التاميني يجب أن يكون بين 1400 و 9600' };
        if (!Number.parseInt(PersonSanawatTa2meen))
            return { response: false, message: 'السنوات التامينية يجب أن تكون رقم' };
        if (!Number.parseInt(CurrentMorattab))
            return { response: false, message: 'الراتب يجب أن يكون رقم' };
    } catch (error) {
        console.log(error);
        return { response: false, message: 'حدث خطا ما' };
    }
    return { response: true };
}

export default employeeFormValidator;