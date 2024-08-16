"use client";

import BtnClassicCommon from '@/common/button/BtnClassicCommon';
import BtnDisabledCommon from '@/common/button/BtnDisabledCommon';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import InputDateCommon from '@/common/combobox/InputDateCommon';
import SelectCommon from '@/common/combobox/SelectCommon';
import TableListCommon from '@/common/table/TableListCommon';
import TitleCommon from '@/common/title/TitleCommon';
import Pagination from '@/common/pagination/Pagination';
import React, { useEffect, useState } from 'react';
import Loading from '@/common/loading/Loading';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import master from '@/api/master';


const Home: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(hiddenLoading())
  }

  const [selectedValue, setSelectedValue] = useState("option1");

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const [dateValue, setDateValue] = useState("")


  const columns = [
    { title: 'Name', key: 'name', width: 200 },
    { title: 'Age', key: 'age', width: 100 },
    { title: 'Address', key: 'address', width: 300 },
    { title: 'Phone', key: 'phone', width: 300 },
    { title: 'City', key: 'city', width: 300 },
    { title: 'City1', key: 'city1', width: 300 },
    { title: 'City2', key: 'city2', width: 300 },
    { title: 'City3', key: 'city3', width: 300 },
    { title: 'City4', key: 'city4', width: 300 },
  ];

  const data = [
    { name: 'John Doe', age: 28, address: '123 Main St', phone: '123456', city: 'hn', city1: 'hn', city2: 'hn', city3: 'hn', city4: 'hn' },
    { name: 'Jane Smith', age: 32, address: '456 Oak Ave', phone: '123456', city: 'hn', city1: 'hn', city2: 'hn', city3: 'hn', city4: 'hn' },
    { name: 'Sam Green', age: 22, address: '789 Maple Dr', phone: '123456', city: 'hn', city1: 'hn', city2: 'hn', city3: 'hn', city4: 'hn' },
  ];

  const totalItems = 367;
  const itemsPerPage = 100;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    master.getWarehouseList("warehouseCd=&warehouseName&lang=en&page&limit")
  }, [])

  return (
    <div className='w-full h-full'>
      <TitleCommon title='出荷一覧' />
      <BtnEntryCommon title='検索オプション' style='center' action={handleClick} width={200} height={50} fontSize={20}/>
      <BtnClassicCommon title='検索オプション' style='center' action={handleClick} width={200} height={50} fontSize={20} border={40}/>
      <BtnDisabledCommon title='検索オプション' style='center' width={200} height={50} fontSize={20}/>
      <br />
      <br />
      <br />
      <SelectCommon
        options={options}
        value={selectedValue}
        onChange={setSelectedValue}
        id="select-example"
        width={80}
        requid={true}
      />

      <InputDateCommon
        value={dateValue}
        onChange={setDateValue}
        id="date-picker"
        width={200}
        requid={true}
        errorMess={["huhu","hihi"]}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <TableListCommon columns={columns} data={data} widthCheckbox={30} />
      {/* <Loading /> */}
    </div>
  );
};

export default Home;
