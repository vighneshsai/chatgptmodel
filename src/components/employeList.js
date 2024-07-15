import React, { useEffect, useState } from 'react'
import ReactTable from './ReactTable';
import MakeGetRequest from '../api/getApi';
import { useAppContext } from '../context/AppContext';
// import dateConversion from "../common/utils"
import { dateConversion } from '../common/utils';

function EmployeList() {
  const [searchValue, setSearchValue] = useState('');
  const [dummy, setDummy] = useState(false)
  const {State, dispatch} = useAppContext()
  const {employee} = State;
  const [employeeData, setEmployeeData] = useState();

  useEffect(()=> {
    getEmployees();
  },[]);

 
  const getEmployees = async () => {
    const data = await MakeGetRequest(`/employee`);
    if (data?.response?.status != 403) {
      await dispatch({ type: "SET_EMPLOYEE_ARRAY", payload: data.result });
      console.log(data.result)
      employeeList()
    }
    else {
      setDummy(true)
    }
  }
  useEffect(() => {
    if (employee?.employeeArr?.length > 0) {
      employeeList();
    }
  }, [employee?.employeeArr]);

  const employeeList = () => {
    var  temp = employee.employeeArr.map(emp => ({
      name: emp.name,
      id: emp.id,
      age: emp.age,
      dob: dateConversion(emp.dob),
      startDate: dateConversion(emp.startDate),
      bloodGroup: emp.bloodGroup
    }));
     setEmployeeData(temp)
    }
    
  const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
  };
  

  var columns = [
    {
      header: 'Employee Id',
      accessor: 'id',
      width: 150,
      render: props =>( <div style={{textAlign: 'center'}}>{props.value}</div> ),
    },
    {
      header: 'Name',
      accessor: 'name',
      width: 150,
      render: props =>( <div style={{textAlign: 'center'}}>{props.value}</div> ),
    },
    {
      header: 'Age',
      accessor: 'age',
      width: 150,
      render: props =>( <div style={{textAlign: 'center'}}>{props.value}</div> ),
    },
    {
      header: 'Date Of Birth',
      accessor: 'dob',
      width: 150,
      render: props =>( <div style={{textAlign: 'center'}}>{dateConversion(props.value)}</div> ),
    },
    {
      header: 'Start Date',
      accessor: 'startDate',
      width: 150,
      render: props =>( <div style={{textAlign: 'center'}}>{dateConversion(props.value)}</div> ),
    },
    {
      header: 'Blood Group',
      accessor: 'bloodGroup',
      width: 150,
      render: props =>( <div style={{textAlign: 'center'}}>{props.value}</div> ),
    }
  ]
 

  return (
    <div className='employee_body'>
      {console.log(employeeData)}
      <div className='flex space-between align_center'>
        <div className='page_header'>EMPLOYEE</div>
        <button className='addButton'>ADD EMPLOYEE</button>
      </div>

      <div className='tableContainer'>
        <input
          className='search_field'
          value={searchValue}
          onChange={handleSearchChange}
          placeholder='Seach Student Name, Age, Id'
        />
        <div style= {{marginTop: "20px"}}>
          <ReactTable
            columns={columns}
            data={employeeData ? employeeData : []}
            searchValue={searchValue}
          />
        </div>
        
      </div>
    </div>
  )
}

export default EmployeList
