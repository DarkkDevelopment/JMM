import { IEmployeeProfileModel } from '../../interfaces/employees';

const employeeFormValidator = (emp: any): { response: boolean, message?: string } => {
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
        agazaLimit,
        PersonType,
        PersonAddress,
        ManteqaLookup,
        MohafzatLookup,
        work,
        salary,
        mobileNo,
        bta2aFace,
        feesh,
        bta2aDahr,
        birthCertificate,
        tagneedCertificate,
        contractImage
    } = emp;

    if (
        !PersonCode || !PersonAddress || !PersonFirstName || !PersonSecondName || !PersonThirdName || !PersonFourthName || !mobileNo || !PersonRaqamQawmy
        || !PersonRaqamTa2meeny || !PersonTa2meenValue || !PersonSanawatTa2meen || !salary || !MohafzatLookup || PersonTaree5Milad ||
        !ManteqaLookup || !work || !PersonDyana || !PersonType || !bta2aFace.uploaded || !feesh.uploaded || !bta2aDahr.uploaded ||
        PersonTaree5Ta3yeen || !birthCertificate.uploaded || !tagneedCertificate.uploaded || !contractImage.uploaded
        || !agazaLimit
    ) {
        console.log(emp)
        return { response: false, message: 'برجاء ادخال جميع الخانات' };
    }
    console.log(PersonRaqamQawmy)
    console.log(Number.parseInt(PersonRaqamQawmy))
    if (!Number.parseInt(PersonCode)) {
        return { response: false, message: 'كود الموظف يجب أن يكون رقم' };
    }
    if (!Number.parseInt(mobileNo) || mobileNo.length != 11)
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
    if (!Number.parseInt(salary))
        return { response: false, message: 'الراتب يجب أن يكون رقم' };
    return { response: true };
}

export default employeeFormValidator;