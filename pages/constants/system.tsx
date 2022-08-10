
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SideBar from '../../components/sideBar';
import { SystemConstantsRow } from '../../components/SystemConstantsRow';
type Props = {

};
const System = (props: Props) => {
    const [hafezExtraDayRatio, setHafezExtraDayRatio] = useState<string | number>(0);
    const [hafezExtraHourRatio, setHafezExtraHourRatio] = useState<string | number>(0);
    const [khasmLateDayRatio, setKhasmLateDayRatio] = useState<string | number>(0);
    const [khasmLateHourRatio, setKhasmLateHourRatio] = useState<string | number>(0);
    const [personInsurancePercentage, setPersonInsurancePercentage] = useState<string | number>(0);
    const [companyInsurancePercentage, setCompanyInsurancePercentage] = useState<string | number>(0);
    const [startHour, setStartHour] = useState<string>('09:00');
    const [endHour, setEndHour] = useState<string>('17:00');

    const [isHafezAndKhasmNew, setIsHafezAndKhasmNew] = useState(false);
    const [isInsuranceNew, setIsInsuranceNew] = useState(false);
    const [isTimeNew, setIsTimeNew] = useState(false);

    const onHafezDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHafezExtraDayRatio(e.target.value);
    }

    const onHafezHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHafezExtraHourRatio(e.target.value);
    }

    const onKhasmLateDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKhasmLateDayRatio(e.target.value);
    }

    const onKhasmLateHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKhasmLateHourRatio(e.target.value);
    }

    const onPersonInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonInsurancePercentage(e.target.value);
    }

    const onCompanyInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyInsurancePercentage(e.target.value);
    }

    const editHafezAndKahsm = async () => {
        await axios.post('/api/lookupsData/updateDataIntoLookups/hafezKhasmRatios', {
            hafezDayRatio: Number.parseFloat(hafezExtraDayRatio.toString()),
            hafezHourRatio: Number.parseFloat(hafezExtraHourRatio.toString()),
            khasmDayRatio: Number.parseFloat(khasmLateDayRatio.toString()),
            khasmHourRatio: Number.parseFloat(khasmLateHourRatio.toString()),
            idOfHafezKhasmRatios: 1
        })
        fetchData();
    }

    const addHafezAndKahsm = async () => {
        await axios.post('/api/lookupsData/insertDataIntoLookups/hafezKhasmRatios', {
            hafezDayRatio: Number.parseFloat(hafezExtraDayRatio.toString()),
            hafezHourRatio: Number.parseFloat(hafezExtraHourRatio.toString()),
            khasmDayRatio: Number.parseFloat(khasmLateDayRatio.toString()),
            khasmHourRatio: Number.parseFloat(khasmLateHourRatio.toString()),
        })
        fetchData();
    }

    const editInsurance = async () => {
        await axios.post('/api/lookupsData/updateDataIntoLookups/insurancePercentages', {
            insurancePercentageByPerson: Number.parseFloat(personInsurancePercentage.toString()),
            insurancePercentageBySherka: Number.parseFloat(companyInsurancePercentage.toString()),
            idOfInsurance: 1
        })
        fetchData();
    }

    const addInsurance = async () => {
        await axios.post('/api/lookupsData/insertDataIntoLookups/insurancePercentages', {
            insurancePercentageByPerson: Number.parseFloat(personInsurancePercentage.toString()),
            insurancePercentageBySherka: Number.parseFloat(companyInsurancePercentage.toString()),
        })
        fetchData();
    }

    const editTime = async () => {
        let newEndHour = new Date(`2022-12-12T${endHour}:00`);
        let newStartHour = new Date(`2022-12-12T${startHour}:00`);
        await axios.post('/api/lookupsData/updateDataIntoLookups/workingHours', {
            startTime: newStartHour,
            endTime: newEndHour,
            workingHoursId: 1
        })
    }

    const addTime = async () => {
        let newEndHour = new Date(`2022-12-12T${endHour}:00`);
        let newStartHour = new Date(`2022-12-12T${startHour}:00`);
        await axios.post('/api/lookupsData/insertDataIntoLookups/workingHours', {
            startTime: newStartHour,
            endTime: newEndHour,
        })
    }

    const fetchData = async () => {
        const response = await axios.get('/api/lookupsData/getDataFromLookups/getConstants')
        if (response.data.HafezExtraDayRatio !== null && response.data.HafezExtraHourRatio !== null && response.data.KhasmLateDayRatio !== null && response.data.KhasmLateHourRatio !== null)
            setIsHafezAndKhasmNew(true)
        if (response.data.PersonInsurancePercentage !== 0 && response.data.SherkaInsurancePercentage !== 0)
            setIsInsuranceNew(true)

        const { startHour, endHour } = response.data;
        if (startHour !== '' && endHour !== '') {
            let newStartHour = response.data.startHour.split("T")[1].slice(0, 5);
            let newEndHour = response.data.endHour.split("T")[1].slice(0, 5);
            setStartHour(newStartHour);
            setEndHour(newEndHour);
            setIsTimeNew(true);
        }

        // setIsTimeNew(true);
        setHafezExtraDayRatio(response.data.HafezExtraDayRatio);
        setHafezExtraHourRatio(response.data.HafezExtraHourRatio);
        setKhasmLateDayRatio(response.data.KhasmLateDayRatio);
        setKhasmLateHourRatio(response.data.KhasmLateHourRatio);
        setPersonInsurancePercentage(response.data.PersonInsurancePercentage);
        setCompanyInsurancePercentage(response.data.SherkaInsurancePercentage);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div className="m-12 font-display basis-5/6 mr-80">
                <div>

                    <SystemConstantsRow title='نسبة معامل الاضافة اليومية' value={hafezExtraDayRatio} onChange={onHafezDayChange} />
                    <SystemConstantsRow title='نسبة معامل الساعة الاضافية' value={hafezExtraHourRatio} onChange={onHafezHourChange} />
                    <SystemConstantsRow title='نسبة الخصم اليومية' value={khasmLateDayRatio} onChange={onKhasmLateDayChange} />
                    <SystemConstantsRow title='نسبة ساعة الخصم' value={khasmLateHourRatio} onChange={onKhasmLateHourChange} />
                    <div className='flex self-center justify-center'>

                        <button
                            className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
                            onClick={isHafezAndKhasmNew ? editHafezAndKahsm : addHafezAndKahsm}
                        >
                            {
                                isHafezAndKhasmNew ? 'تعديل' : 'ادخال'
                            }

                        </button>

                    </div>
                </div>
                <div>
                    <SystemConstantsRow title='نسبة التأمين الشخصي' value={personInsurancePercentage} onChange={onPersonInsuranceChange} />
                    <SystemConstantsRow title='نسبة تأمين الشركة' value={companyInsurancePercentage} onChange={onCompanyInsuranceChange} />
                    <div className='flex self-center justify-center'>

                        <button
                            className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
                            onClick={isInsuranceNew ? editInsurance : addInsurance}
                        >
                            {
                                isInsuranceNew ? 'تعديل' : 'ادخال'
                            }

                        </button>

                    </div>
                </div>
                <div >

                    <div className='flex flex-row justify-evenly items-baseline m-4'>

                        <input
                            className="w-fit px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-blue-500"
                            type="time"
                            placeholder="ادخل القيمة"
                            value={startHour}
                            onChange={e => setStartHour(e.target.value)}
                        />
                        <h1>مواعيد بدا العمل</h1>
                    </div >
                    <div className='flex flex-row justify-evenly items-baseline m-4'>

                        <input
                            className="w-fit px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-blue-500"
                            type="time"
                            placeholder="ادخل القيمة"
                            value={endHour}
                            onChange={e => setEndHour(e.target.value)}
                        />
                        <h1>مواعيد انتهاء العمل</h1>
                    </div >

                    <div className='flex self-center justify-center'>
                        <button
                            className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
                            onClick={isTimeNew ? editTime : addTime}
                        >
                            {
                                isTimeNew ? 'تعديل' : 'ادخال'
                            }

                        </button>
                    </div>

                </div>


            </div>
            <SideBar pageName="const" />
        </div>
    );
};

export default System;