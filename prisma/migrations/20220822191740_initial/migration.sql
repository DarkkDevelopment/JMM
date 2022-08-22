-- CreateTable
CREATE TABLE "AgazaTypesLookup" (
    "AgazaTypeID" SERIAL NOT NULL,
    "AgazaType" VARCHAR(50) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AgazaTypesLookup_pkey" PRIMARY KEY ("AgazaTypeID")
);

-- CreateTable
CREATE TABLE "AgazatRasmyaLookup" (
    "AgazaRasmyaID" SERIAL NOT NULL,
    "AgazaRasmyaName" VARCHAR(50) NOT NULL,
    "AgazaRasmyaDate" DATE NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AgazatRasmyaLookup_pkey" PRIMARY KEY ("AgazaRasmyaID")
);

-- CreateTable
CREATE TABLE "DyanaLookup" (
    "DyanaID" SERIAL NOT NULL,
    "DyanaName" VARCHAR(20) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DyanaLookup_pkey" PRIMARY KEY ("DyanaID")
);

-- CreateTable
CREATE TABLE "FixedHafezAndKhasmRatios" (
    "id" SERIAL NOT NULL,
    "FixedKhasmHourRatio" DOUBLE PRECISION NOT NULL,
    "FixedHafezHourRatio" DOUBLE PRECISION NOT NULL,
    "FixedKhasmDayRatio" DOUBLE PRECISION NOT NULL,
    "FixedHafezDayRatio" DOUBLE PRECISION NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FixedHafezAndKhasmRatios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KhasmReasons" (
    "ReasonID" SERIAL NOT NULL,
    "ReasonDescription" VARCHAR(50) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "KhasmReasons_pkey" PRIMARY KEY ("ReasonID")
);

-- CreateTable
CREATE TABLE "HafezReasons" (
    "ReasonID" SERIAL NOT NULL,
    "ReasonDescription" VARCHAR(50) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HafezReasons_pkey" PRIMARY KEY ("ReasonID")
);

-- CreateTable
CREATE TABLE "ManteqaLookup" (
    "ManteqaID" SERIAL NOT NULL,
    "Manteqa_MohafzaID" INTEGER NOT NULL,
    "ManteqaName" VARCHAR(50) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ManteqaLookup_pkey" PRIMARY KEY ("ManteqaID")
);

-- CreateTable
CREATE TABLE "MohafzatLookup" (
    "MohafzaID" SERIAL NOT NULL,
    "MohafzaName" VARCHAR(30) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "MohafzatLookup_pkey" PRIMARY KEY ("MohafzaID")
);

-- CreateTable
CREATE TABLE "NamesLookup" (
    "NameID" SERIAL NOT NULL,
    "Name" VARCHAR(25) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "NamesLookup_pkey" PRIMARY KEY ("NameID")
);

-- CreateTable
CREATE TABLE "Person" (
    "PersonCode" INTEGER NOT NULL,
    "PersonFirstName" VARCHAR(20) NOT NULL,
    "PersonSecondName" VARCHAR(20) NOT NULL,
    "PersonThirdName" VARCHAR(20) NOT NULL,
    "PersonFourthName" VARCHAR(20) NOT NULL,
    "PersonRaqamQawmy" VARCHAR(20) NOT NULL,
    "PersonRaqamTa2meeny" VARCHAR(20) NOT NULL,
    "PersonTelephoneArdy" VARCHAR(12),
    "PersonTaree5Milad" DATE NOT NULL,
    "PersonTaree5Ta3yeen" DATE NOT NULL,
    "PersonSanawatTa2meen" INTEGER NOT NULL,
    "PersonDyanaId" INTEGER NOT NULL,
    "PersonTypeId" INTEGER NOT NULL,
    "PersonTa2meenValue" INTEGER NOT NULL,
    "deletedAt" DATE,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("PersonCode")
);

-- CreateTable
CREATE TABLE "PersonAddress" (
    "PersonCode" INTEGER NOT NULL,
    "PersonAddress" VARCHAR(100) NOT NULL,
    "PersonManteqaID" INTEGER NOT NULL,
    "PersonMohafzaID" INTEGER NOT NULL,

    CONSTRAINT "PersonAddress_pkey" PRIMARY KEY ("PersonCode")
);

-- CreateTable
CREATE TABLE "PersonAgazaLimit" (
    "PersonCode" INTEGER NOT NULL,
    "NumberOfAgazaDays" INTEGER NOT NULL,
    "Year" INTEGER NOT NULL,

    CONSTRAINT "PersonAgazaLimit_pkey" PRIMARY KEY ("PersonCode","Year")
);

-- CreateTable
CREATE TABLE "PersonAgazaRequestAndHistoryTable" (
    "id" SERIAL NOT NULL,
    "PersonCode" INTEGER NOT NULL,
    "AgazaTypeId" INTEGER NOT NULL,
    "AgazaDate" DATE NOT NULL,
    "deletedAt" DATE,

    CONSTRAINT "PersonAgazaRequestAndHistoryTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonCurrentMorattabAndDarayebPercentage" (
    "PersonCode" INTEGER NOT NULL,
    "CurrentMorattab" INTEGER NOT NULL,
    "PersonMorattabDareebaPercentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PersonCurrentMorattabAndDarayebPercentage_pkey" PRIMARY KEY ("PersonCode")
);

-- CreateTable
CREATE TABLE "PersonDarayebHistory" (
    "PersonCode" INTEGER NOT NULL,
    "PersonMorattabAtThatMonth" INTEGER NOT NULL,
    "PersonDarayebPercentageAtThatMonth" DOUBLE PRECISION NOT NULL,
    "TotalValueOfDarayeb" DOUBLE PRECISION NOT NULL,
    "Month" INTEGER NOT NULL,
    "Year" INTEGER NOT NULL,

    CONSTRAINT "PersonDarayebHistory_pkey" PRIMARY KEY ("PersonCode")
);

-- CreateTable
CREATE TABLE "PersonDocuments" (
    "PersonCode" INTEGER NOT NULL,
    "Beta2aWesh" TEXT,
    "Beta2aDahr" TEXT,
    "Feesh" TEXT,
    "ShehadetMilad" TEXT,
    "ShehadetGeish" TEXT,
    "PersonContract" TEXT,

    CONSTRAINT "PersonDocuments_pkey" PRIMARY KEY ("PersonCode")
);

-- CreateTable
CREATE TABLE "PersonHafezHistory" (
    "id" SERIAL NOT NULL,
    "PersonHafezId" INTEGER NOT NULL,
    "HafezReasonID" INTEGER,
    "PureHafezValue" INTEGER DEFAULT 0,
    "NumberOfBonusHours" DOUBLE PRECISION DEFAULT 0,
    "HafezBonusHourRatio" DOUBLE PRECISION DEFAULT 0,
    "HafezTotalValue" DOUBLE PRECISION DEFAULT 0,
    "NumberOfBonusDays" INTEGER DEFAULT 0,
    "HafezBonusDayRatio" DOUBLE PRECISION DEFAULT 0,
    "DayOfHafez" INTEGER DEFAULT 0,
    "MonthOfHafez" INTEGER DEFAULT 0,
    "YearOfHafez" INTEGER DEFAULT 0,
    "deletedAt" DATE,

    CONSTRAINT "PersonHafezHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HafezSubmitMove" (
    "HafezHistoryId" INTEGER NOT NULL,
    "SubmitPersonCode" INTEGER NOT NULL,

    CONSTRAINT "HafezSubmitMove_pkey" PRIMARY KEY ("HafezHistoryId","SubmitPersonCode")
);

-- CreateTable
CREATE TABLE "KhasmSubmitMove" (
    "KhasmHistoryId" INTEGER NOT NULL,
    "SubmitPersonCode" INTEGER NOT NULL,

    CONSTRAINT "KhasmSubmitMove_pkey" PRIMARY KEY ("KhasmHistoryId","SubmitPersonCode")
);

-- CreateTable
CREATE TABLE "GheyabHistory" (
    "PersonGheyabCode" INTEGER NOT NULL,
    "GheyabDate" DATE NOT NULL,

    CONSTRAINT "GheyabHistory_pkey" PRIMARY KEY ("PersonGheyabCode","GheyabDate")
);

-- CreateTable
CREATE TABLE "PersonHodoorEnseraf" (
    "PersonCode" INTEGER NOT NULL,
    "HodoorTime" TIME(6),
    "EnserafTime" TIME(6),
    "TotalNumberOfWorkingHoursAtThatDay" DOUBLE PRECISION,
    "ExtraHours" INTEGER NOT NULL DEFAULT 0,
    "LateHours" INTEGER NOT NULL DEFAULT 0,
    "Date" DATE NOT NULL,

    CONSTRAINT "PersonHodoorEnseraf_pkey" PRIMARY KEY ("PersonCode","Date")
);

-- CreateTable
CREATE TABLE "PersonKhasmHistory" (
    "id" SERIAL NOT NULL,
    "PersonKhasmId" INTEGER NOT NULL,
    "KhasmReasonID" INTEGER,
    "PureKhasmValue" INTEGER DEFAULT 0,
    "NumberOfLateHours" DOUBLE PRECISION DEFAULT 0,
    "KhasmLateHourRatio" DOUBLE PRECISION DEFAULT 0,
    "KhasmLateValue" DOUBLE PRECISION DEFAULT 0,
    "NumberOfGhyabDays" INTEGER DEFAULT 0,
    "KhasmGhyabDayRatio" DOUBLE PRECISION DEFAULT 0,
    "DayOfKhasm" INTEGER DEFAULT 0,
    "MonthOfKhasm" INTEGER DEFAULT 0,
    "YearOfKhasm" INTEGER DEFAULT 0,
    "deletedAt" DATE,

    CONSTRAINT "PersonKhasmHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonMobileNumbers" (
    "PersonCode" INTEGER NOT NULL,
    "MobileNumber" VARCHAR(15) NOT NULL,

    CONSTRAINT "PersonMobileNumbers_pkey" PRIMARY KEY ("PersonCode")
);

-- CreateTable
CREATE TABLE "PersonPassword" (
    "PersonCode" INTEGER NOT NULL,
    "PersonSystemPassword" VARCHAR(50) NOT NULL,

    CONSTRAINT "PersonPassword_pkey" PRIMARY KEY ("PersonCode")
);

-- CreateTable
CREATE TABLE "PersonPayrollHistory" (
    "id" SERIAL NOT NULL,
    "PersonCode" INTEGER NOT NULL,
    "PersonMorattabAtThatMonth" INTEGER NOT NULL,
    "Total3adadSa3atElTa25eerAtThatMonth" DOUBLE PRECISION NOT NULL,
    "ValueOfKhasmForTotal3adadSa3atElTa25eerAtThatMonth" DOUBLE PRECISION NOT NULL,
    "Total3adadAyyamEl5asmAwElGhyabAtThatMonth" DOUBLE PRECISION NOT NULL,
    "ValueOfKhasmForTotal3adadAyyamEl5asmAwElGhyabAtThatMonth" DOUBLE PRECISION NOT NULL,
    "TotalValueOfIndividualKhasmAtThatMonth" DOUBLE PRECISION NOT NULL,
    "TotalKhasmSummationValue" DOUBLE PRECISION NOT NULL,
    "Total3adadSa3atElExtraAtThatMonth" DOUBLE PRECISION NOT NULL,
    "ValueOfHafezForTotal3adadSa3atElExtraAtThatMonth" DOUBLE PRECISION NOT NULL,
    "Total3adadAyyamElEdafyAwElHafezAtThatMonth" DOUBLE PRECISION NOT NULL,
    "ValueOfHafezForTotalTotal3adadAyyamElEdafyAwElHafezAtThatMonth" DOUBLE PRECISION NOT NULL,
    "TotalValueOfIndividualHafezAtThatMonth" DOUBLE PRECISION NOT NULL,
    "TotalHafezSummationValue" DOUBLE PRECISION NOT NULL,
    "TotalValueOfSolafTakenAtThatMonth" DOUBLE PRECISION NOT NULL,
    "DarayebPercentageForThatMorattabAtThatMonth" DOUBLE PRECISION NOT NULL,
    "TotalValueOfDarayebAtThatMonth" DOUBLE PRECISION NOT NULL,
    "PersonTa2meenValue" INTEGER NOT NULL,
    "PersonTa2meenPercentage" DOUBLE PRECISION NOT NULL,
    "TotalValueOfTa2meenatAtThatMonth" DOUBLE PRECISION NOT NULL,
    "elawatValue" DOUBLE PRECISION NOT NULL,
    "badalatValue" DOUBLE PRECISION NOT NULL,
    "NetSalary" DOUBLE PRECISION NOT NULL,
    "PersonPayrollDate" DATE NOT NULL,
    "PayrollMonth" INTEGER NOT NULL,
    "PayrollYear" INTEGER NOT NULL,

    CONSTRAINT "PersonPayrollHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonSQLRequestHistory" (
    "id" SERIAL NOT NULL,
    "PersonCode" INTEGER NOT NULL,
    "PageID" INTEGER NOT NULL,
    "RequestMade" TEXT NOT NULL,
    "RequestMadeAt" TIME(6) NOT NULL,

    CONSTRAINT "PersonSQLRequestHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonSolfaPerMonth" (
    "id" SERIAL NOT NULL,
    "PersonCode" INTEGER NOT NULL,
    "SolfaValue" INTEGER NOT NULL,
    "SolfaRequestDate" DATE NOT NULL,
    "SolfaMonthToBeApplied" INTEGER NOT NULL,
    "SolfaYearToBeApplied" INTEGER NOT NULL,
    "IsApproved" BOOLEAN NOT NULL,
    "IsDoneAndPaid" BOOLEAN NOT NULL,
    "deletedAt" DATE,

    CONSTRAINT "PersonSolfaPerMonth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonSystemLogging" (
    "id" SERIAL NOT NULL,
    "PersonCode" INTEGER NOT NULL,
    "PageID" INTEGER NOT NULL,
    "LoggingTime" TIMETZ(6) NOT NULL,

    CONSTRAINT "PersonSystemLogging_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonTa2meenatPaidBySherkaAndByPerson" (
    "PersonCode" INTEGER NOT NULL,
    "PersonTa2meenValueAtThatMonth" INTEGER NOT NULL,
    "Ta2meenPercentagePaidBySherkaAtThatMonth" DOUBLE PRECISION NOT NULL,
    "Ta2meenPercentagePaidByPersonAtThatMonth" DOUBLE PRECISION NOT NULL,
    "Ta2meenValuePaidBySherkaAtThatMonth" DOUBLE PRECISION NOT NULL,
    "Ta2meenValuePaidByPersonAtThatMonth" DOUBLE PRECISION NOT NULL,
    "Month" INTEGER NOT NULL,
    "Year" INTEGER NOT NULL,

    CONSTRAINT "PersonTa2meenatPaidBySherkaAndByPerson_pkey" PRIMARY KEY ("PersonCode")
);

-- CreateTable
CREATE TABLE "PersonTypesLookup" (
    "PersonTypeID" SERIAL NOT NULL,
    "PersonType" VARCHAR(10) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PersonTypesLookup_pkey" PRIMARY KEY ("PersonTypeID")
);

-- CreateTable
CREATE TABLE "PersonWazeefa" (
    "PersonCode" INTEGER NOT NULL,
    "PersonWazeefaId" INTEGER NOT NULL,

    CONSTRAINT "PersonWazeefa_pkey" PRIMARY KEY ("PersonCode")
);

-- CreateTable
CREATE TABLE "Ta2meenatFixedPercentage" (
    "id" SERIAL NOT NULL,
    "Ta2meenatPercentagePaidBySherka" DOUBLE PRECISION NOT NULL,
    "Ta2meenatPercentagePaidByPerson" DOUBLE PRECISION NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Ta2meenatFixedPercentage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WazayefTypesLookup" (
    "WazeefaID" SERIAL NOT NULL,
    "WazeefaName" VARCHAR(50) NOT NULL,
    "WazeefaDescription" VARCHAR(255),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "WazayefTypesLookup_pkey" PRIMARY KEY ("WazeefaID")
);

-- CreateTable
CREATE TABLE "WorkingHoursLookup" (
    "id" SERIAL NOT NULL,
    "StartTime" TIME(6) NOT NULL,
    "EndTime" TIME(6) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "WorkingHoursLookup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agazaDaysInWeek" (
    "id" SERIAL NOT NULL,
    "DayName" VARCHAR(10) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "agazaDaysInWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixedGlobalValues" (
    "Name" VARCHAR(50) NOT NULL,
    "Value" DOUBLE PRECISION NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FixedGlobalValues_pkey" PRIMARY KEY ("Name")
);

-- AddForeignKey
ALTER TABLE "ManteqaLookup" ADD CONSTRAINT "ManteqaLookup_Manteqa_MohafzaID_fkey" FOREIGN KEY ("Manteqa_MohafzaID") REFERENCES "MohafzatLookup"("MohafzaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_PersonDyanaId_fkey" FOREIGN KEY ("PersonDyanaId") REFERENCES "DyanaLookup"("DyanaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_PersonTypeId_fkey" FOREIGN KEY ("PersonTypeId") REFERENCES "PersonTypesLookup"("PersonTypeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonAddress" ADD CONSTRAINT "PersonCodeAddressConstraint" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonAddress" ADD CONSTRAINT "PersonManteqaConstraint" FOREIGN KEY ("PersonManteqaID") REFERENCES "ManteqaLookup"("ManteqaID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonAddress" ADD CONSTRAINT "PersonMohafzaConstraint" FOREIGN KEY ("PersonMohafzaID") REFERENCES "MohafzatLookup"("MohafzaID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonAgazaLimit" ADD CONSTRAINT "PersonCode" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonAgazaRequestAndHistoryTable" ADD CONSTRAINT "PersonCodeAgazaConstraint" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonAgazaRequestAndHistoryTable" ADD CONSTRAINT "AgazaTypeConstraint" FOREIGN KEY ("AgazaTypeId") REFERENCES "AgazaTypesLookup"("AgazaTypeID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonCurrentMorattabAndDarayebPercentage" ADD CONSTRAINT "PersonCodeCurrentMorattabConstraint" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonDarayebHistory" ADD CONSTRAINT "PersonCode_fkey" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonDocuments" ADD CONSTRAINT "PersonCodeDocumentsConstraint" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonHafezHistory" ADD CONSTRAINT "PersonHafezHistory_PersonHafezId_fkey" FOREIGN KEY ("PersonHafezId") REFERENCES "Person"("PersonCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonHafezHistory" ADD CONSTRAINT "PersonHafezHistory_HafezReasonID_fkey" FOREIGN KEY ("HafezReasonID") REFERENCES "HafezReasons"("ReasonID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HafezSubmitMove" ADD CONSTRAINT "HafezSubmitMove_SubmitPersonCode_fkey" FOREIGN KEY ("SubmitPersonCode") REFERENCES "Person"("PersonCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HafezSubmitMove" ADD CONSTRAINT "HafezSubmitMove_HafezHistoryId_fkey" FOREIGN KEY ("HafezHistoryId") REFERENCES "PersonHafezHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KhasmSubmitMove" ADD CONSTRAINT "KhasmSubmitMove_SubmitPersonCode_fkey" FOREIGN KEY ("SubmitPersonCode") REFERENCES "Person"("PersonCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KhasmSubmitMove" ADD CONSTRAINT "KhasmSubmitMove_KhasmHistoryId_fkey" FOREIGN KEY ("KhasmHistoryId") REFERENCES "PersonKhasmHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GheyabHistory" ADD CONSTRAINT "PersonCodeGheyabConstraint" FOREIGN KEY ("PersonGheyabCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonHodoorEnseraf" ADD CONSTRAINT "person_code_fkey" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonKhasmHistory" ADD CONSTRAINT "PersonKhasmHistory_PersonKhasmId_fkey" FOREIGN KEY ("PersonKhasmId") REFERENCES "Person"("PersonCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonKhasmHistory" ADD CONSTRAINT "PersonKhasmHistory_KhasmReasonID_fkey" FOREIGN KEY ("KhasmReasonID") REFERENCES "KhasmReasons"("ReasonID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonMobileNumbers" ADD CONSTRAINT "PersonMobileConstraint" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonPassword" ADD CONSTRAINT "PersonCodePasswordConstraint" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonSQLRequestHistory" ADD CONSTRAINT "pcode_fkey" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonSolfaPerMonth" ADD CONSTRAINT "PersonCodeConstraint" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonSystemLogging" ADD CONSTRAINT "PersonCodeLastLoggedConstraint" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonTa2meenatPaidBySherkaAndByPerson" ADD CONSTRAINT "PersonCodeTa2meenatConstraint" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonWazeefa" ADD CONSTRAINT "PersonCodeConstraint" FOREIGN KEY ("PersonCode") REFERENCES "Person"("PersonCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PersonWazeefa" ADD CONSTRAINT "PersonWazeefaIdConstraint" FOREIGN KEY ("PersonWazeefaId") REFERENCES "WazayefTypesLookup"("WazeefaID") ON DELETE NO ACTION ON UPDATE NO ACTION;
