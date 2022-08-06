
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;




SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 231 (class 1259 OID 24613)
-- Name: AgazaTypesLookup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AgazaTypesLookup" (
    "AgazaTypeID" integer NOT NULL,
    "AgazaType" character varying(50) NOT NULL
);


ALTER TABLE public."AgazaTypesLookup" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 24618)
-- Name: AgazatRasmyaForYearLookup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AgazatRasmyaForYearLookup" (
    "AgazaRasmyaID" integer NOT NULL,
    "AgazaRasmyaName" character varying(50) NOT NULL,
    "AgazaRasmyaDate" date NOT NULL
);


ALTER TABLE public."AgazatRasmyaForYearLookup" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 24628)
-- Name: DyanaLookup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DyanaLookup" (
    "DyanaID" integer NOT NULL,
    "DyanaName" character varying(20) NOT NULL
);


ALTER TABLE public."DyanaLookup" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16565)
-- Name: FixedAgazaDaysEveryWeek; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FixedAgazaDaysEveryWeek" (
    "DayName" character varying(10) NOT NULL
);


ALTER TABLE public."FixedAgazaDaysEveryWeek" OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 24643)
-- Name: FixedHafezAndKhasmRatios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FixedHafezAndKhasmRatios" (
    "FixedKhasmHourRatio" double precision NOT NULL,
    "FixedHafezHourRatio" double precision NOT NULL,
    "FixedKhasmDayRatio" double precision NOT NULL,
    "FixedHafezDayRatio" double precision NOT NULL
);


ALTER TABLE public."FixedHafezAndKhasmRatios" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16591)
-- Name: KhasmAndHafezRatios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."KhasmAndHafezRatios" (
    "KhasmHourLateRatio" double precision NOT NULL,
    "KhasmDayGhyabRatio" double precision NOT NULL,
    "HafezHourBonusRatio" double precision NOT NULL,
    "HafezDayBounsRatio" double precision NOT NULL
);


ALTER TABLE public."KhasmAndHafezRatios" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16586)
-- Name: KhasmAndHafezReasons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."KhasmAndHafezReasons" (
    "ReasonID" integer NOT NULL,
    "ReasonDescription" character varying(50) NOT NULL
);


ALTER TABLE public."KhasmAndHafezReasons" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16581)
-- Name: KhasmReasons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."KhasmReasons" (
    "KhasmReason" character varying(50) NOT NULL
);


ALTER TABLE public."KhasmReasons" OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 24633)
-- Name: ManteqaLookup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ManteqaLookup" (
    "ManteqaID" integer NOT NULL,
    "ManteqaName" character varying(50) NOT NULL
);


ALTER TABLE public."ManteqaLookup" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 24638)
-- Name: MohafzatLookup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MohafzatLookup" (
    "MohafzaID" integer NOT NULL,
    "MohafzaName" character varying(30) NOT NULL
);


ALTER TABLE public."MohafzatLookup" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 24623)
-- Name: NamesLookup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NamesLookup" (
    "NameID" integer NOT NULL,
    "Name" character varying(25) NOT NULL
);


ALTER TABLE public."NamesLookup" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16398)
-- Name: Person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Person" (
    "PersonCode" integer NOT NULL,
    "PersonFirstName" character varying(20) NOT NULL,
    "PersonSecondName" character varying(20) NOT NULL,
    "PersonThirdName" character varying(20) NOT NULL,
    "PersonFourthName" character varying(20) NOT NULL,
    "PersonRaqamQawmy" character varying(20) NOT NULL,
    "PersonRaqamTa2meeny" character varying(20) NOT NULL,
    "PersonTelephoneArdy" character varying(12),
    "PersonTaree5Milad" date NOT NULL,
    "PersonTaree5Ta3yeen" date NOT NULL,
    "PersonSanawatTa2meen" integer NOT NULL,
    "PersonDyana" character varying(10) NOT NULL,
    "PersonType" character varying(10) NOT NULL,
    "PersonTa2meenValue" integer NOT NULL,
    "PersonDeletedAt" date
);


ALTER TABLE public."Person" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16435)
-- Name: PersonAddress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonAddress" (
    "PersonCode" integer NOT NULL,
    "PersonAddress" character varying(100) NOT NULL,
    "PersonManteqaID" integer NOT NULL,
    "PersonMohafzaID" integer NOT NULL
);


ALTER TABLE public."PersonAddress" OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16403)
-- Name: PersonAgazaLimit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonAgazaLimit" (
    "PersonCode" integer NOT NULL,
    "NumberOfAgazaDays" integer NOT NULL,
    "Year" integer NOT NULL
);


ALTER TABLE public."PersonAgazaLimit" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16472)
-- Name: PersonAgazaRequestAndHistoryTable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonAgazaRequestAndHistoryTable" (
    "PersonCode" integer NOT NULL,
    "AgazaType" character varying(50) NOT NULL,
    "AgazaDate" date NOT NULL
);


ALTER TABLE public."PersonAgazaRequestAndHistoryTable" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16453)
-- Name: PersonCurrentMorattabAndDarayebPercentage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonCurrentMorattabAndDarayebPercentage" (
    "PersonCode" integer NOT NULL,
    "CurrentMorattab" integer NOT NULL,
    "PersonMorattabDareebaPercentage" double precision NOT NULL
);


ALTER TABLE public."PersonCurrentMorattabAndDarayebPercentage" OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 24649)
-- Name: PersonDarayebHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonDarayebHistory" (
    "PersonCode" integer NOT NULL,
    "PersonMorattabAtThatMonth" integer NOT NULL,
    "PersonDarayebPercentageAtThatMonth" double precision NOT NULL,
    "TotalValueOfDarayeb" double precision NOT NULL,
    "Month" integer NOT NULL,
    "Year" integer NOT NULL
);


ALTER TABLE public."PersonDarayebHistory" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16443)
-- Name: PersonDocuments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonDocuments" (
    "PersonCode" integer NOT NULL,
    "Beta2aWesh" text,
    "Beta2aDahr" text,
    "Feesh" text,
    "ShehadetMilad" text,
    "ShehadetGeish" text,
    "PersonContract" text
);


ALTER TABLE public."PersonDocuments" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16674)
-- Name: PersonHafezHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonHafezHistory" (
    "PersonCode" integer NOT NULL,
    "HafezReasonID" integer,
    "CodeOfPersonSubmittingHafez" integer,
    "PureHafezValue" integer DEFAULT 0,
    "NumberOfBonusHours" double precision DEFAULT 0,
    "HafezBonusHourRatio" double precision DEFAULT 0,
    "HafezTotalValue" double precision DEFAULT 0,
    "NumberOfBonusDays" integer DEFAULT 0,
    "HafezBonusDayRatio" double precision DEFAULT 0,
    "HafezDate" date
);


ALTER TABLE public."PersonHafezHistory" OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 24671)
-- Name: PersonHodoorEnseraf; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonHodoorEnseraf" (
    "PersonCode" integer NOT NULL,
    "HodoorTime" time without time zone,
    "EnserafTime" time without time zone,
    "TotalNumberOfWorkingHoursAtThatDay" double precision,
    "Date" date
);


ALTER TABLE public."PersonHodoorEnseraf" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16622)
-- Name: PersonKhasmHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonKhasmHistory" (
    "PersonCode" integer NOT NULL,
    "KhasmReasonID" integer,
    "CodeOfPersonSubmittingKhasm" integer,
    "PureKhasmValue" integer DEFAULT 0,
    "NumberOfLateHours" double precision DEFAULT 0,
    "KhasmLateHourRatio" double precision DEFAULT 0,
    "KhasmLateValue" double precision DEFAULT 0,
    "NumberOfGhyabDays" integer DEFAULT 0,
    "KhasGhyabDayRatio" double precision DEFAULT 0,
    "KhasmDate" date
);


ALTER TABLE public."PersonKhasmHistory" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16411)
-- Name: PersonMobileNumbers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonMobileNumbers" (
    "PersonCode" integer NOT NULL,
    "MobileNumber" character varying(15) NOT NULL
);


ALTER TABLE public."PersonMobileNumbers" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16419)
-- Name: PersonPassword; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonPassword" (
    "PersonCode" integer NOT NULL,
    "PersonSystemPassword" character varying(50) NOT NULL
);


ALTER TABLE public."PersonPassword" OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 24646)
-- Name: PersonPayrollHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonPayrollHistory" (
    "PersonCode" integer NOT NULL,
    "PersonMorattabAtThatMonth" integer NOT NULL,
    "Total3adadSa3atElTa25eerAtThatMonth" double precision NOT NULL,
    "ValueOfKhasmForTotal3adadSa3atElTa25eerAtThatMonth" double precision NOT NULL,
    "Total3adadAyyamEl5asmAwElGhyabAtThatMonth" double precision NOT NULL,
    "ValueOfKhasmForTotal3adadAyyamEl5asmAwElGhyabAtThatMonth" double precision NOT NULL,
    "TotalValueOfIndividualKhasmAtThatMonth" double precision NOT NULL,
    "TotalKhasmSummationValue" double precision NOT NULL,
    "Total3adadSa3atElExtraAtThatMonth" double precision NOT NULL,
    "ValueOfHafezForTotal3adadSa3atElExtraAtThatMonth" double precision NOT NULL,
    "Total3adadAyyamElEdafyAwElHafezAtThatMonth" double precision NOT NULL,
    "ValueOfHafezForTotalTotal3adadAyyamElEdafyAwElHafezAtThatMonth" double precision NOT NULL,
    "TotalValueOfIndividualHafezAtThatMonth" double precision NOT NULL,
    "TotalHafezSummationValue" double precision NOT NULL,
    "TotalValueOfSolafTakenAtThatMonth" double precision NOT NULL,
    "DarayebPercentageForThatMorattabAtThatMonth" double precision NOT NULL,
    "TotalValueOfDarayebAtThatMonth" double precision NOT NULL,
    "PersonTa2meenValue" integer NOT NULL,
    "PersonTa2meenPercentage" double precision NOT NULL,
    "TotalValueOfTa2meenatAtThatMonth" double precision NOT NULL,
    "NetSalary" double precision NOT NULL,
    "PersonPayrollDate" date NOT NULL,
    "PayrollMonth" integer NOT NULL,
    "PayrollYear" integer NOT NULL
);


ALTER TABLE public."PersonPayrollHistory" OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 24679)
-- Name: PersonSQLRequestHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonSQLRequestHistory" (
    "PersonCode" integer NOT NULL,
    "PageID" integer NOT NULL,
    "RequestMade" text NOT NULL,
    "RequestMadeAt" time without time zone NOT NULL
);


ALTER TABLE public."PersonSQLRequestHistory" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16573)
-- Name: PersonSolfaPerMonth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonSolfaPerMonth" (
    "PersonCode" integer NOT NULL,
    "SolfaValue" integer NOT NULL,
    "SolfaRequestDate" date NOT NULL,
    "SolfaMonthToBeApplied" integer NOT NULL,
    "SolfaYearToBeApplied" integer NOT NULL,
    "IsApproved" boolean NOT NULL,
    "IsDoneAndPaid" boolean NOT NULL
);


ALTER TABLE public."PersonSolfaPerMonth" OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16427)
-- Name: PersonSystemLogging; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonSystemLogging" (
    "PersonCode" integer NOT NULL,
    "PageID" integer NOT NULL,
    "LoggingTime" time with time zone NOT NULL
);


ALTER TABLE public."PersonSystemLogging" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16461)
-- Name: PersonTa2meenatPaidBySherkaAndByPerson; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonTa2meenatPaidBySherkaAndByPerson" (
    "PersonCode" integer NOT NULL,
    "PersonTa2meenValueAtThatMonth" integer NOT NULL,
    "Ta2meenPercentagePaidBySherkaAtThatMonth" double precision NOT NULL,
    "Ta2meenPercentagePaidByPersonAtThatMonth" double precision NOT NULL,
    "Ta2meenValuePaidBySherkaAtThatMonth" double precision NOT NULL,
    "Ta2meenValuePaidByPersonAtThatMonth" double precision NOT NULL,
    "Month" integer NOT NULL,
    "Year" integer NOT NULL
);


ALTER TABLE public."PersonTa2meenatPaidBySherkaAndByPerson" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24603)
-- Name: PersonTypesLookup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonTypesLookup" (
    "PersonTypeID" integer NOT NULL,
    "PersonType" character varying(10) NOT NULL
);


ALTER TABLE public."PersonTypesLookup" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16505)
-- Name: PersonWazeefa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonWazeefa" (
    "PersonCode" integer NOT NULL,
    "PersonWazeefa" character varying(50) NOT NULL
);


ALTER TABLE public."PersonWazeefa" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16469)
-- Name: Ta2meenatFixedPercentage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ta2meenatFixedPercentage" (
    "Ta2meenatPercentagePaidBySherka" double precision NOT NULL,
    "Ta2meenatPercentagePaidByPerson" double precision NOT NULL
);


ALTER TABLE public."Ta2meenatFixedPercentage" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 24608)
-- Name: WazayefTypesLookup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WazayefTypesLookup" (
    "WazeefaID" integer NOT NULL,
    "WazeefaName" character varying(50) NOT NULL,
    "WazeefaDescription" character varying(255)
);


ALTER TABLE public."WazayefTypesLookup" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16570)
-- Name: WorkingHoursLookup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WorkingHoursLookup" (
    "StartTime" time without time zone NOT NULL,
    "EndTime" time without time zone NOT NULL
);


ALTER TABLE public."WorkingHoursLookup" OWNER TO postgres;

--
-- TOC entry 3328 (class 2606 OID 24617)
-- Name: AgazaTypesLookup AgazaTypesLookup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AgazaTypesLookup"
    ADD CONSTRAINT "AgazaTypesLookup_pkey" PRIMARY KEY ("AgazaTypeID");


--
-- TOC entry 3330 (class 2606 OID 24622)
-- Name: AgazatRasmyaForYearLookup AgazatRasmyaForYear_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AgazatRasmyaForYearLookup"
    ADD CONSTRAINT "AgazatRasmyaForYear_pkey" PRIMARY KEY ("AgazaRasmyaID", "AgazaRasmyaDate");


--
-- TOC entry 3334 (class 2606 OID 24632)
-- Name: DyanaLookup DyanaLookup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DyanaLookup"
    ADD CONSTRAINT "DyanaLookup_pkey" PRIMARY KEY ("DyanaID");


--
-- TOC entry 3318 (class 2606 OID 16649)
-- Name: KhasmAndHafezRatios KhasmAndHafezRatios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."KhasmAndHafezRatios"
    ADD CONSTRAINT "KhasmAndHafezRatios_pkey" PRIMARY KEY ("KhasmHourLateRatio", "KhasmDayGhyabRatio", "HafezHourBonusRatio", "HafezDayBounsRatio");


--
-- TOC entry 3314 (class 2606 OID 16585)
-- Name: KhasmReasons KhasmReasons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."KhasmReasons"
    ADD CONSTRAINT "KhasmReasons_pkey" PRIMARY KEY ("KhasmReason");


--
-- TOC entry 3336 (class 2606 OID 24637)
-- Name: ManteqaLookup ManteqaLookup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ManteqaLookup"
    ADD CONSTRAINT "ManteqaLookup_pkey" PRIMARY KEY ("ManteqaID");


--
-- TOC entry 3338 (class 2606 OID 24642)
-- Name: MohafzatLookup MohafzatLookup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MohafzatLookup"
    ADD CONSTRAINT "MohafzatLookup_pkey" PRIMARY KEY ("MohafzaID");


--
-- TOC entry 3332 (class 2606 OID 24627)
-- Name: NamesLookup NamesLookup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NamesLookup"
    ADD CONSTRAINT "NamesLookup_pkey" PRIMARY KEY ("NameID");


--
-- TOC entry 3308 (class 2606 OID 24660)
-- Name: PersonAddress PersonAddress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonAddress"
    ADD CONSTRAINT "PersonAddress_pkey" PRIMARY KEY ("PersonCode");


--
-- TOC entry 3306 (class 2606 OID 24602)
-- Name: PersonAgazaLimit PersonAgazaLimit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonAgazaLimit"
    ADD CONSTRAINT "PersonAgazaLimit_pkey" PRIMARY KEY ("PersonCode", "Year");


--
-- TOC entry 3322 (class 2606 OID 16684)
-- Name: PersonHafezHistory PersonHafezHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonHafezHistory"
    ADD CONSTRAINT "PersonHafezHistory_pkey" PRIMARY KEY ("PersonCode");


--
-- TOC entry 3320 (class 2606 OID 16632)
-- Name: PersonKhasmHistory PersonKhasmHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonKhasmHistory"
    ADD CONSTRAINT "PersonKhasmHistory_pkey" PRIMARY KEY ("PersonCode");


--
-- TOC entry 3324 (class 2606 OID 24607)
-- Name: PersonTypesLookup PersonTypesLookup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonTypesLookup"
    ADD CONSTRAINT "PersonTypesLookup_pkey" PRIMARY KEY ("PersonTypeID");


--
-- TOC entry 3310 (class 2606 OID 16509)
-- Name: PersonWazeefa PersonWazeefa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonWazeefa"
    ADD CONSTRAINT "PersonWazeefa_pkey" PRIMARY KEY ("PersonCode");


--
-- TOC entry 3304 (class 2606 OID 16402)
-- Name: Person Person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Person"
    ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("PersonCode");


--
-- TOC entry 3326 (class 2606 OID 24612)
-- Name: WazayefTypesLookup WazayefTypesLookup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WazayefTypesLookup"
    ADD CONSTRAINT "WazayefTypesLookup_pkey" PRIMARY KEY ("WazeefaID");


--
-- TOC entry 3312 (class 2606 OID 16569)
-- Name: FixedAgazaDaysEveryWeek WorkingDaysPerWeek_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FixedAgazaDaysEveryWeek"
    ADD CONSTRAINT "WorkingDaysPerWeek_pkey" PRIMARY KEY ("DayName");


--
-- TOC entry 3316 (class 2606 OID 16595)
-- Name: KhasmAndHafezReasons reasonID_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."KhasmAndHafezReasons"
    ADD CONSTRAINT "reasonID_pkey" PRIMARY KEY ("ReasonID") INCLUDE ("ReasonID");


--
-- TOC entry 3339 (class 2606 OID 16406)
-- Name: PersonAgazaLimit PersonCode; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonAgazaLimit"
    ADD CONSTRAINT "PersonCode" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3343 (class 2606 OID 16438)
-- Name: PersonAddress PersonCodeAddressConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonAddress"
    ADD CONSTRAINT "PersonCodeAddressConstraint" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3349 (class 2606 OID 16475)
-- Name: PersonAgazaRequestAndHistoryTable PersonCodeAgazaConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonAgazaRequestAndHistoryTable"
    ADD CONSTRAINT "PersonCodeAgazaConstraint" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3350 (class 2606 OID 16510)
-- Name: PersonWazeefa PersonCodeConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonWazeefa"
    ADD CONSTRAINT "PersonCodeConstraint" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3351 (class 2606 OID 16576)
-- Name: PersonSolfaPerMonth PersonCodeConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonSolfaPerMonth"
    ADD CONSTRAINT "PersonCodeConstraint" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3352 (class 2606 OID 16633)
-- Name: PersonKhasmHistory PersonCodeConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonKhasmHistory"
    ADD CONSTRAINT "PersonCodeConstraint" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3355 (class 2606 OID 16685)
-- Name: PersonHafezHistory PersonCodeConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonHafezHistory"
    ADD CONSTRAINT "PersonCodeConstraint" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3347 (class 2606 OID 16456)
-- Name: PersonCurrentMorattabAndDarayebPercentage PersonCodeCurrentMorattabConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonCurrentMorattabAndDarayebPercentage"
    ADD CONSTRAINT "PersonCodeCurrentMorattabConstraint" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3346 (class 2606 OID 16448)
-- Name: PersonDocuments PersonCodeDocumentsConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonDocuments"
    ADD CONSTRAINT "PersonCodeDocumentsConstraint" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3342 (class 2606 OID 16430)
-- Name: PersonSystemLogging PersonCodeLastLoggedConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonSystemLogging"
    ADD CONSTRAINT "PersonCodeLastLoggedConstraint" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3341 (class 2606 OID 16422)
-- Name: PersonPassword PersonCodePasswordConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonPassword"
    ADD CONSTRAINT "PersonCodePasswordConstraint" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3348 (class 2606 OID 16464)
-- Name: PersonTa2meenatPaidBySherkaAndByPerson PersonCodeTa2meenatConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonTa2meenatPaidBySherkaAndByPerson"
    ADD CONSTRAINT "PersonCodeTa2meenatConstraint" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3358 (class 2606 OID 24652)
-- Name: PersonDarayebHistory PersonCode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonDarayebHistory"
    ADD CONSTRAINT "PersonCode_fkey" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3344 (class 2606 OID 24661)
-- Name: PersonAddress PersonManteqaConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonAddress"
    ADD CONSTRAINT "PersonManteqaConstraint" FOREIGN KEY ("PersonManteqaID") REFERENCES public."ManteqaLookup"("ManteqaID") NOT VALID;


--
-- TOC entry 3340 (class 2606 OID 16414)
-- Name: PersonMobileNumbers PersonMobileConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonMobileNumbers"
    ADD CONSTRAINT "PersonMobileConstraint" FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3345 (class 2606 OID 24666)
-- Name: PersonAddress PersonMohafzaConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonAddress"
    ADD CONSTRAINT "PersonMohafzaConstraint" FOREIGN KEY ("PersonMohafzaID") REFERENCES public."MohafzatLookup"("MohafzaID") NOT VALID;


--
-- TOC entry 3354 (class 2606 OID 16643)
-- Name: PersonKhasmHistory ReasonIDConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonKhasmHistory"
    ADD CONSTRAINT "ReasonIDConstraint" FOREIGN KEY ("KhasmReasonID") REFERENCES public."KhasmAndHafezReasons"("ReasonID");


--
-- TOC entry 3356 (class 2606 OID 16690)
-- Name: PersonHafezHistory ReasonIDConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonHafezHistory"
    ADD CONSTRAINT "ReasonIDConstraint" FOREIGN KEY ("HafezReasonID") REFERENCES public."KhasmAndHafezReasons"("ReasonID");


--
-- TOC entry 3357 (class 2606 OID 16695)
-- Name: PersonHafezHistory SubmittingHafezPersonCodeConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonHafezHistory"
    ADD CONSTRAINT "SubmittingHafezPersonCodeConstraint" FOREIGN KEY ("CodeOfPersonSubmittingHafez") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3353 (class 2606 OID 16638)
-- Name: PersonKhasmHistory SubmittingKhasmPersonCodeConstraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonKhasmHistory"
    ADD CONSTRAINT "SubmittingKhasmPersonCodeConstraint" FOREIGN KEY ("CodeOfPersonSubmittingKhasm") REFERENCES public."Person"("PersonCode");


--
-- TOC entry 3360 (class 2606 OID 24684)
-- Name: PersonSQLRequestHistory pcode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonSQLRequestHistory"
    ADD CONSTRAINT pcode_fkey FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode") NOT VALID;


--
-- TOC entry 3359 (class 2606 OID 24674)
-- Name: PersonHodoorEnseraf person_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonHodoorEnseraf"
    ADD CONSTRAINT person_code_fkey FOREIGN KEY ("PersonCode") REFERENCES public."Person"("PersonCode");


-- Completed on 2022-07-20 12:41:19

--
-- PostgreSQL database dump complete
--

INSERT INTO public."AgazaTypesLookup" VALUES (1, 'أجازة مرضية');
INSERT INTO public."AgazaTypesLookup" VALUES (2, 'أجازة عارضة');
INSERT INTO public."AgazaTypesLookup" VALUES (3, 'أجازة طارئة');
INSERT INTO public."AgazaTypesLookup" VALUES (4, 'أجازة سنوية');
INSERT INTO public."AgazaTypesLookup" VALUES (5, 'أجازة اعتيادية');


--
-- TOC entry 3497 (class 0 OID 24618)
-- Dependencies: 230
-- Data for Name: AgazatRasmyaForYearLookup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (1, 'رأس السنة الميلادية', '2022-01-01');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (2, 'عيد الميلاد المجيد', '2022-01-07');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (3, 'عيد الغطاس المجيد', '2022-01-19');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (4, 'عيد ثورة يناير وعيد الشرطة', '2022-01-27');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (5, 'عيد تحرير سيناء', '2022-04-25');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (6, 'عيد الفطر', '2022-04-30');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (7, 'عيد الفطر', '2022-05-01');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (8, 'عيد الفطر', '2022-05-02');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (9, 'عيد الفطر', '2022-05-03');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (10, 'عيد الفطر', '2022-05-04');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (11, 'عيد العمال', '2022-05-05');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (12, 'عيد ثورة 30 يونيو', '2022-06-30');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (13, 'عيد الأضحى', '2022-07-09');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (14, 'عيد الأضحى', '2022-07-10');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (15, 'عيد الأضحى', '2022-07-11');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (16, 'عيد الأضحى', '2022-07-12');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (17, 'عيد الأضحى', '2022-07-13');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (18, 'عيد الأضحى', '2022-07-14');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (19, 'عيد ثورة 23 يوليو', '2022-07-23');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (20, 'رأس السنة الهجرية', '2022-07-30');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (21, 'عيد نصر أكتوبر', '2022-10-06');
INSERT INTO public."AgazatRasmyaForYearLookup" VALUES (22, 'عيد المولد النبوي', '2022-10-08');


--
-- TOC entry 3499 (class 0 OID 24628)
-- Dependencies: 232
-- Data for Name: DyanaLookup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."DyanaLookup" VALUES (1, 'مسيحي');
INSERT INTO public."DyanaLookup" VALUES (2, 'مسلم');


--
-- TOC entry 3488 (class 0 OID 16565)
-- Dependencies: 221
-- Data for Name: FixedAgazaDaysEveryWeek; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."FixedAgazaDaysEveryWeek" VALUES ('الأحد');
INSERT INTO public."FixedAgazaDaysEveryWeek" VALUES ('الاثنين');
INSERT INTO public."FixedAgazaDaysEveryWeek" VALUES ('الثلاثاء');
INSERT INTO public."FixedAgazaDaysEveryWeek" VALUES ('الأربعاء');
INSERT INTO public."FixedAgazaDaysEveryWeek" VALUES ('الخميس');
INSERT INTO public."FixedAgazaDaysEveryWeek" VALUES ('السبت');


--
-- TOC entry 3502 (class 0 OID 24643)
-- Dependencies: 235
-- Data for Name: FixedHafezAndKhasmRatios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."FixedHafezAndKhasmRatios" VALUES (1.5, 1.5, 1.5, 1.5);


--
-- TOC entry 3491 (class 0 OID 16586)
-- Dependencies: 224
-- Data for Name: KhasmAndHafezReasons; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."KhasmAndHafezReasons" VALUES (1, 'عدد ساعات عمل أقل من المطلوب');
INSERT INTO public."KhasmAndHafezReasons" VALUES (2, 'عدد ساعات عمل اضافي');
INSERT INTO public."KhasmAndHafezReasons" VALUES (3, 'يوم غياب');
INSERT INTO public."KhasmAndHafezReasons" VALUES (4, 'يوم اضافي');
INSERT INTO public."KhasmAndHafezReasons" VALUES (5, 'مكافأة');
INSERT INTO public."KhasmAndHafezReasons" VALUES (6, 'تعويض');
INSERT INTO public."KhasmAndHafezReasons" VALUES (7, 'اتلاف');


--
-- TOC entry 3500 (class 0 OID 24633)
-- Dependencies: 233
-- Data for Name: ManteqaLookup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ManteqaLookup" VALUES (1, 'مدينة نصر');
INSERT INTO public."ManteqaLookup" VALUES (2, 'الشروق');
INSERT INTO public."ManteqaLookup" VALUES (3, 'العبور');
INSERT INTO public."ManteqaLookup" VALUES (4, 'الخانكة');
INSERT INTO public."ManteqaLookup" VALUES (5, 'مصر الجديدة');
INSERT INTO public."ManteqaLookup" VALUES (6, 'شبرا');
INSERT INTO public."ManteqaLookup" VALUES (7, 'شيراتون');
INSERT INTO public."ManteqaLookup" VALUES (8, 'امبابة');
INSERT INTO public."ManteqaLookup" VALUES (9, 'المطرية');
INSERT INTO public."ManteqaLookup" VALUES (10, 'الوايلي');
INSERT INTO public."ManteqaLookup" VALUES (11, 'الضاهر');
INSERT INTO public."ManteqaLookup" VALUES (12, 'العباسية');


--
-- TOC entry 3501 (class 0 OID 24638)
-- Dependencies: 234
-- Data for Name: MohafzatLookup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."MohafzatLookup" VALUES (1, 'القاهرة');
INSERT INTO public."MohafzatLookup" VALUES (2, 'الاسكندرية');
INSERT INTO public."MohafzatLookup" VALUES (3, 'أسوان');
INSERT INTO public."MohafzatLookup" VALUES (4, 'أسيوط');
INSERT INTO public."MohafzatLookup" VALUES (5, 'البحيرة');
INSERT INTO public."MohafzatLookup" VALUES (6, 'بني سويف');
INSERT INTO public."MohafzatLookup" VALUES (7, 'الدقهلية');
INSERT INTO public."MohafzatLookup" VALUES (8, 'دمياط');
INSERT INTO public."MohafzatLookup" VALUES (9, 'الفيوم');
INSERT INTO public."MohafzatLookup" VALUES (10, 'الغربية');
INSERT INTO public."MohafzatLookup" VALUES (11, 'الجيزة');
INSERT INTO public."MohafzatLookup" VALUES (12, 'الاسماعيلية');
INSERT INTO public."MohafzatLookup" VALUES (13, 'كفر الشيخ');
INSERT INTO public."MohafzatLookup" VALUES (14, 'الأقصر');
INSERT INTO public."MohafzatLookup" VALUES (15, 'مرسى مطروح');
INSERT INTO public."MohafzatLookup" VALUES (16, 'المنيا');
INSERT INTO public."MohafzatLookup" VALUES (17, 'المنوفية');
INSERT INTO public."MohafzatLookup" VALUES (18, 'الوادي الجديد');
INSERT INTO public."MohafzatLookup" VALUES (19, 'شمال سيناء');
INSERT INTO public."MohafzatLookup" VALUES (20, 'بورسعيد');
INSERT INTO public."MohafzatLookup" VALUES (21, 'القليوبية');
INSERT INTO public."MohafzatLookup" VALUES (22, 'قنا');
INSERT INTO public."MohafzatLookup" VALUES (23, 'البحر الأحمر');
INSERT INTO public."MohafzatLookup" VALUES (24, 'الشرقية');
INSERT INTO public."MohafzatLookup" VALUES (25, 'سوهاج');
INSERT INTO public."MohafzatLookup" VALUES (26, 'جنوب سيناء');
INSERT INTO public."MohafzatLookup" VALUES (27, 'السويس');


--
-- TOC entry 3498 (class 0 OID 24623)
-- Dependencies: 231
-- Data for Name: NamesLookup; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3476 (class 0 OID 16398)
-- Dependencies: 209
-- Data for Name: Person; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3481 (class 0 OID 16435)
-- Dependencies: 214
-- Data for Name: PersonAddress; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3477 (class 0 OID 16403)
-- Dependencies: 210
-- Data for Name: PersonAgazaLimit; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3486 (class 0 OID 16472)
-- Dependencies: 219
-- Data for Name: PersonAgazaRequestAndHistoryTable; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3483 (class 0 OID 16453)
-- Dependencies: 216
-- Data for Name: PersonCurrentMorattabAndDarayebPercentage; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3504 (class 0 OID 24649)
-- Dependencies: 237
-- Data for Name: PersonDarayebHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3482 (class 0 OID 16443)
-- Dependencies: 215
-- Data for Name: PersonDocuments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3493 (class 0 OID 16674)
-- Dependencies: 226
-- Data for Name: PersonHafezHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3505 (class 0 OID 24671)
-- Dependencies: 238
-- Data for Name: PersonHodoorEnseraf; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3492 (class 0 OID 16622)
-- Dependencies: 225
-- Data for Name: PersonKhasmHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3478 (class 0 OID 16411)
-- Dependencies: 211
-- Data for Name: PersonMobileNumbers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3479 (class 0 OID 16419)
-- Dependencies: 212
-- Data for Name: PersonPassword; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3503 (class 0 OID 24646)
-- Dependencies: 236
-- Data for Name: PersonPayrollHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3506 (class 0 OID 24679)
-- Dependencies: 239
-- Data for Name: PersonSQLRequestHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3490 (class 0 OID 16573)
-- Dependencies: 223
-- Data for Name: PersonSolfaPerMonth; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3480 (class 0 OID 16427)
-- Dependencies: 213
-- Data for Name: PersonSystemLogging; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3484 (class 0 OID 16461)
-- Dependencies: 217
-- Data for Name: PersonTa2meenatPaidBySherkaAndByPerson; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3494 (class 0 OID 24603)
-- Dependencies: 227
-- Data for Name: PersonTypesLookup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."PersonTypesLookup" VALUES (1, 'ذكر');
INSERT INTO public."PersonTypesLookup" VALUES (2, 'أنثى');


--
-- TOC entry 3487 (class 0 OID 16505)
-- Dependencies: 220
-- Data for Name: PersonWazeefa; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3485 (class 0 OID 16469)
-- Dependencies: 218
-- Data for Name: Ta2meenatFixedPercentage; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Ta2meenatFixedPercentage" VALUES (0.1875, 0.11);


--
-- TOC entry 3495 (class 0 OID 24608)
-- Dependencies: 228
-- Data for Name: WazayefTypesLookup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."WazayefTypesLookup" VALUES (1, 'موظف موارد بشرية', '');
INSERT INTO public."WazayefTypesLookup" VALUES (2, 'IT', '');
INSERT INTO public."WazayefTypesLookup" VALUES (3, 'مدير مبيعات', '');
INSERT INTO public."WazayefTypesLookup" VALUES (4, 'سكرتارية', '');
INSERT INTO public."WazayefTypesLookup" VALUES (5, 'مدير ماليات', '');


--
-- TOC entry 3489 (class 0 OID 16570)
-- Dependencies: 222
-- Data for Name: WorkingHoursLookup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."WorkingHoursLookup" VALUES ('09:00:00', '17:00:00');



