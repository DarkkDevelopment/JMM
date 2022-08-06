const getAllEmployees = async () => {
  const employees = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/employee/getAll`
  );
  const employeesJson = await employees.json();
  return employeesJson;
};
export default getAllEmployees;
