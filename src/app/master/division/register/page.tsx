"use client";

import master from '@/api/master';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import InputTextCommon from '@/common/combobox/InputTextCommon';
import SelectCommon from '@/common/combobox/SelectCommon';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

interface SelectOption {
  value: string;
  label: string;
}

interface Row {
  id: string;
  warehouseId: string;
  isChecked: boolean;
}

const DivisionRegister: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [errorMess, setErrorMess] = useState<{ field: string, message: string }[]>([]);
  const [divisionCd, setDivisionCd] = useState("");
  const [divisionName, setDivisonName] = useState("");
  const [listWareHouse, setListWareHouse] = useState<SelectOption[]>([]);
  const [rows, setRows] = useState<Row[]>([
    {
      id: uuidv4(),
      warehouseId: '',
      isChecked: false
    },
  ]);

  const defaultRows = [
    {
      id: uuidv4(),
      warehouseId: '',
      isChecked: false
    }
  ];

  useEffect(() => {
    // get languages
    const userLanguage = navigator.language.split("-")[0] || 'en';
    setLanguage(userLanguage);

    // get list option warehouse
    master.getWarehouseAllList()
      .then(res => {
        if (res.status === 200) {
          const formattedList = res.data.data.map((item: any) => ({
            value: item.id.toString(),
            label: item.warehouseName,
          }));
          setListWareHouse(formattedList);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  const routerDivisionList = () => {
    router.push("/master/division/list")
  }

  // handle register location
  const handleRegisterDivision = () => {
    dispatch(showLoading())

    const postData = [{
      divisionCd: divisionCd,
      divisionName: divisionName,
      warehouseIdList: rows.map(row => parseInt(row.warehouseId))
    }]

    master.createDivision(`lang=${language}`, postData)
      .then(res => {
        console.log("res :", res);

        if (res.status === 200) {
          setDivisionCd("")
          setDivisonName("")
          setRows(defaultRows)
          setErrorMess([])
          dispatch(hiddenLoading())
          routerDivisionList()
        }
      })
      .catch(err => {
        if (err.response.data.status === 0) {
          setErrorMess(err.response.data.error.errorDetails)
          dispatch(hiddenLoading());
        }
        dispatch(hiddenLoading())

      });
  }

  const columns = [
    { title: '部門コード', key: 'divisionCd', width: 200 },
    { title: '部門', key: 'divisionName', width: 200 },
    { title: '倉庫', key: 'warehouseCd', width: 300 }
  ]
  const [listHeaderDivision, setListHeaderDivision] = useState(columns);

  console.log("row  ", rows);


  const handleWarehouseChange = (index: number, value: string) => {
    console.log("handleWarehouseChange", 111);

    setRows(prevRows => {
      const newRows = [...prevRows];
      newRows[index].warehouseId = value;
      return newRows;
    });
  };

  const addRow = () => {
    setRows([
      ...rows,
      defaultRows[0]
    ]);
  }

  const handleCheckboxChange = (index: number) => {
    const newRows = [...rows];
    newRows[index].isChecked = !newRows[index].isChecked;
    setRows(newRows);
  };

  const deleteSelectedRows = () => {
    const newRows = rows.filter(row => !row.isChecked);
    setRows(newRows);
  };

  return (
    <div className='bg-white h-screen pl-[170px] container-body'>
      <div className='pt-5'>
        {/* button back to list */}
        <button
          className='flex justify-start items-center gap-5 hover:text-black hover:font-bold text-xl'
          onClick={routerDivisionList}
        >
          <span>＜</span>
          <span>一覧に戻る</span>
        </button>
      </div>
      <div className='items-start px-7 py-10'>
        {/* register items */}
        <div className='flex my-3'>
          <div className='w-[12%]'>
            <span className='text-left w-[33%] py-2 text-base font-bold'>部門コード</span>
          </div>
          <div className=''>
            <InputTextCommon
              id='divisionCd'
              requid={true}
              width={200}
              value={divisionCd}
              onChange={setDivisionCd}
              errorMess={errorMess.filter(error => error.field === 'divisionCd').map(error => error.message)}
              disabled={false}
            />
          </div>
        </div>

        <div className='flex my-3'>
          <div className='w-[12%]'>
            <span className='text-left w-[33%] py-2 text-base font-bold'>部門<span className='text-[#b72e30]'>*</span></span>
          </div>
          <div className=''>
            <InputTextCommon
              id='divisionName'
              requid={true}
              width={200}
              value={divisionName}
              onChange={setDivisonName}
              errorMess={errorMess.filter(error => error.field === 'divisionName').map(error => error.message)}
              disabled={false}
            />
          </div>
        </div>

        <div className='my-3'>
          <div className='w-[12%]'>
            <span className='text-left py-2 text-base font-bold'>倉庫</span>
          </div>
        </div>

        <div className='flex my-3'>
          <div className='px-3'>
            <button className={`px-5 bg-[#f38c8d] h-8 border border-[black] font-bold text-white transition-colors duration-150 rounded-md focus:shadow-outline hover:bg-[#f38c8d] truncate`}
              onClick={addRow}
            >追加</button>
          </div>
          <div className='px-3'>
            <button className={`px-5 bg-transparent h-8 border border-[#548ea6] font-bold text-black transition-colors duration-150 rounded-md focus:shadow-outline hover:bg-[#f38c8d] truncate`}
              onClick={deleteSelectedRows}
            >削除</button>
          </div>
        </div>
        <div className=''>
          <table className='table-fixed border-collapse border-[2px] border-[#548EA6]'>
            <thead className='bg-[#548EA6] text-white border-[#548EA6] border-collapse sticky top-[-2px] z-10 py-8'>
              <tr>
                <th className='w-12 border px-3 py-2 relative border-white text-[#FFFFFF] bg-[#548EA6]'></th>
                <th className='w-56'>倉庫</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id} className='border border-white'>
                  <td className='border bg-[#E9EEF1] border-white p-2 text-center'>
                    <input
                      type="checkbox" className="w-[15px] h-[15px]"
                      checked={row.isChecked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className='border bg-[#E9EEF1] border-white p-2 text-center'>
                    <SelectCommon
                      id={`warehouseId-${index}`}
                      onChange={(value: string) => handleWarehouseChange(index, value)}
                      options={listWareHouse}
                      value={row.warehouseId}
                      requid={true}
                      width={250}
                      disabled={false}
                      errorMess={errorMess.filter(error => error.field === 'warehouseId').map(error => error.message)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='pr-20'>
        <BtnEntryCommon title='登録' style='end' action={handleRegisterDivision} width={120} height={40} fontSize={20} background={'#548EA6'} disabled={false} />
      </div>

    </div>
  );
};

export default DivisionRegister;
