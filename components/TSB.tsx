import router, { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import logo from "../public/images/logo.png";
import vacationLogo from "../public/icons/sunbed.png";
import employeeLogo from "../public/icons/employee.png";
import insuranceLogo from "../public/icons/insurance.png";
import loanLogo from "../public/icons/loan.png";
import moneyLogo from "../public/icons/money.png";
import incentive from "../public/icons/incentive.png";
import discounts from "../public/icons/discounts.png";
import attendanceLogo from "../public/icons/user.png";
import absentLogo from "../public/icons/absent.png";
import conslogo from "../public/icons/cons.png";
import { Icon } from "@iconify/react";

const NestedList = (props: any) => {
  const [open, setOpen] = React.useState(true);
  const pageName = props.pageName;
  const router = useRouter();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="fixed top-0 right-0 z-40 h-full overflow-y-scroll text-black duration-300 ease-in-out bg-white border-2 border-solid p-15 font-display basis-2/6">
      <List
        sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <div className="flex flex-col p-10 space-y-7 ">
              <Image src={logo} alt="logo" width={200} height={200} />
              <hr className="border-b-2 border-gray-400 border-solid" />
            </div>
          </ListSubheader>
        }
      >
        <ListItemButton onClick={handleClick}>
          <Icon icon="fluent:person-28-regular" width={25} height={25} />
          <ListItemText primary="HR" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                paddingX: 6,
                marginTop: 2,
                marginBottom: 2,
                justifyContent: "space-between",
              }}
              onClick={() => {
                router.push("/HR/Employees");
              }}
            >
              <div>
                <h3
                  className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${
              pageName === "employees"
                ? "text-red-600 text-2xl"
                : "text-blue-900 text-2xl"
            }`}
                >
                  الموظفين
                </h3>
              </div>
              <div>
                <Image
                  src={employeeLogo}
                  alt="employee"
                  width={50}
                  height={50}
                />
              </div>
            </ListItemButton>
            <ListItemButton
              sx={{
                paddingX: 6,
                marginTop: 2,
                marginBottom: 2,
                justifyContent: "space-between",
              }}
              onClick={() => {
                router.push("/HR/Vacations");
              }}
            >
              <div>
                <h3
                  className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
              ${
                pageName === "vacations"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
              }`}
                >
                  الاجازات
                </h3>{" "}
              </div>
              <div>
                {" "}
                <Image
                  src={vacationLogo}
                  alt="employee"
                  width={50}
                  height={50}
                />
              </div>
            </ListItemButton>

            <ListItemButton
              sx={{
                paddingX: 6,
                marginTop: 2,
                marginBottom: 2,
                justifyContent: "space-between",
              }}
              onClick={() => {
                router.push("/HR/Money");
              }}
            >
              <div className="items-center ">
                <h3
                  className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${
              pageName === "money"
                ? "text-red-600 text-2xl"
                : "text-blue-900 text-2xl"
            }`}
                >
                  المرتبات
                </h3>
              </div>
              <div>
                {" "}
                <Image src={moneyLogo} alt="employee" width={50} height={50} />
              </div>
            </ListItemButton>

            <ListItemButton
              sx={{
                paddingX: 6,
                marginTop: 2,
                marginBottom: 2,
                justifyContent: "space-between",
              }}
              onClick={() => {
                router.push("/HR/Insurance");
              }}
            >
              <div className="flex flex-row items-center justify-between space-x-4">
                <h3
                  className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${
              pageName === "insurance"
                ? "text-red-600 text-2xl"
                : "text-blue-900 text-2xl"
            }`}
                >
                  التأمينات
                </h3>
              </div>
              <div>
                <Image
                  src={insuranceLogo}
                  alt="employee"
                  width={50}
                  height={50}
                />
              </div>
            </ListItemButton>

            <ListItemButton
              sx={{
                paddingX: 6,
                marginTop: 2,
                marginBottom: 2,
                justifyContent: "space-between",
              }}
              onClick={() => {
                router.push("/HR/Attendance");
              }}
            >
              <div className="flex flex-row items-center justify-between space-x-4">
                <h3
                  className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${
              pageName === "attendance"
                ? "text-red-600 text-2xl"
                : "text-blue-900 text-2xl"
            }`}
                >
                  حضور
                </h3>
              </div>
              <div>
                <Image
                  src={attendanceLogo}
                  alt="employee"
                  width={50}
                  height={50}
                />
              </div>
            </ListItemButton>

            <ListItemButton
              sx={{
                paddingX: 6,
                marginTop: 2,
                marginBottom: 2,
                justifyContent: "space-between",
              }}
              onClick={() => {
                router.push("/HR/Absence");
              }}
            >
              <div className="flex flex-row items-center justify-between space-x-4">
                <h3
                  className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${
              pageName === "attendance"
                ? "text-red-600 text-2xl"
                : "text-blue-900 text-2xl"
            }`}
                  onClick={() => {
                    router.push("/HR/Absence");
                  }}
                >
                  غياب
                </h3>
              </div>

              <div>
                <Image
                  src={absentLogo}
                  alt="absence logo"
                  width={50}
                  height={50}
                />
              </div>
            </ListItemButton>

            <ListItemButton
              sx={{
                paddingX: 6,
                marginTop: 2,
                marginBottom: 2,
                justifyContent: "space-between",
              }}
              onClick={() => {
                router.push("/HR/Loan");
              }}
            >
              <div className="flex flex-row items-center justify-between space-x-4">
                <h3
                  className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${
              pageName === "loan"
                ? "text-red-600 text-2xl"
                : "text-blue-900 text-2xl"
            }`}
                >
                  السلفة
                </h3>
              </div>

              <div>
                <Image src={loanLogo} alt="employee" width={50} height={50} />
              </div>
            </ListItemButton>

            <ListItemButton
              sx={{
                paddingX: 6,
                marginTop: 2,
                marginBottom: 2,
                justifyContent: "space-between",
              }}
              onClick={() => {
                router.push("/HR/Incentive");
              }}
            >
              <div className="flex flex-row items-center space-x-4 justify-between">
                <h3
                  className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${
              pageName === "incentive"
                ? "text-red-600 text-2xl"
                : "text-blue-900 text-2xl"
            }`}
                  onClick={() => {
                    router.push("/HR/Incentive");
                  }}
                >
                  الحوافز
                </h3>
              </div>
              <div>
                <Image src={incentive} alt="employee" width={60} height={60} />
              </div>
            </ListItemButton>

            <ListItemButton
              sx={{
                paddingX: 6,
                marginTop: 2,
                marginBottom: 2,
                justifyContent: "space-between",
              }}
              onClick={() => {
                router.push("/HR/Discounts");
              }}
            >
              <div className="flex flex-row items-center justify-between space-x-4">
                <h3
                  className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${
              pageName === "discounts"
                ? "text-red-600 text-2xl"
                : "text-blue-900 text-2xl"
            }`}
                >
                  الخصومات
                </h3>
              </div>
              <div>
                <Image src={discounts} alt="employee" width={50} height={50} />
              </div>
            </ListItemButton>

            <ListItemButton
              sx={{
                paddingX: 6,
                marginTop: 2,
                marginBottom: 2,
                justifyContent: "space-between",
              }}
              onClick={() => {
                router.push("/HR/constants");
              }}
            >
              <div className="flex flex-row items-center space-x-4 justify-between">
                <h3
                  className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${
              pageName === "const"
                ? "text-red-600 text-2xl"
                : "text-blue-900 text-2xl"
            }`}
                >
                  الثوابت
                </h3>
              </div>
              <div>
                <Image src={conslogo} alt="employee" width={50} height={50} />
              </div>
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          onClick={handleClick}
          sx={{
            marginTop: 2,
            marginBottom: 2,
            justifyContent: "space-between",
          }}
        >
          <div className="flex flex-row items-center space-x-4 justify-between">
            <div>
              <Icon
                icon="material-symbols:inventory-2-outline-rounded"
                width={25}
                height={25}
              />
            </div>

            <div
              className={
                "text-2xl font-bold text-center  cursor-pointer hover:text-red-600 "
              }
            >
              <ListItemText primary="مخازن" />
            </div>
          </div>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                paddingX: 6,
                marginTop: 2,
                marginBottom: 2,
                justifyContent: "space-between",
              }}
              onClick={() => {
                router.push("/Inventory/Quality");
              }}
            >
              <div className="flex flex-row items-center space-x-4 justify-between">
                <h3
                  className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${
              pageName === "const"
                ? "text-red-600 text-2xl"
                : "text-blue-900 text-2xl"
            }`}
                >
                  الجوده
                </h3>
              </div>
              <div>
                <Icon icon="heroicons-outline:beaker" width={50} height={50} />
              </div>
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}></ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default NestedList;
