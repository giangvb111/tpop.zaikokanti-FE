"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import InputTextCommon from '@/common/combobox/InputTextCommon';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import ErrorMessager from '@/common/error/ErrorMessager';
import master from '@/api/master';


const WarehouseRegister: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [errorMess, setErrorMess] = useState([""]);

  const [warehouseCd, setWarehouseCd] = useState("");
  const [warehouseName, setWarehouseName] = useState("");

  const routerWarehouseList = () => {
    router.push("/master/warehouse/list")
  }

  // get languages
  useEffect(() => {
    const userLanguage = navigator.language.split("-")[0] || 'en';
    setLanguage(userLanguage);
  }, []);

  // register warehouse
  const handleRegisterWarehouse = () => {
    dispatch(showLoading())

    const errors = [];

    if (warehouseCd === "") {
      errors.push("倉庫コードは必須です。");
    }

    if (warehouseName === "") {
      errors.push("倉庫名は必須です。");
    }

    if (errors.length > 0) {
      setErrorMess(errors);
      dispatch(hiddenLoading());
      return;
    }

    const postData = [{
      warehouseCd: warehouseCd,
      warehouseName: warehouseName
    }]

    master.createWarehouse(`lang=${language}`, postData).then(res => {
      if (res.data.message === null) {
        setWarehouseCd("")
        setWarehouseName("")
        dispatch(hiddenLoading())
      } else {
        const errorMessages = Array.isArray(res.data.message) ? res.data.message : [res.data.message];
        setErrorMess(errorMessages);
        setWarehouseCd("")
        setWarehouseName("")
        dispatch(hiddenLoading())
      }
    })
  }

  return (
    <div className='bg-white h-screen pl-[170px] container-body'>
      <div className='pt-5'>
        {/* button back to list */}
        <button
          className='flex justify-start items-center gap-5 hover:text-black hover:font-bold text-xl'
          onClick={routerWarehouseList}
        >
          <span>＜</span>
          <span>一覧に戻る</span>
        </button>
      </div>
      <div className='flex justify-between items-start px-7 py-10'>
        {/* register items */}
        <table className='min-w-[520px]'>
          <tbody>
            <tr className=''>
              <th className='text-left py-2 text-[#8B8B8B] text-xl'>倉庫コード<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'>
                <InputTextCommon id='warehouseCd' requid={true} width={200} value={warehouseCd} onChange={setWarehouseCd} />
              </td>
            </tr>
            <tr className=''>
              <th className='text-left py-2 text-[#8B8B8B] text-xl'>倉庫名<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'>
                <InputTextCommon id='warehouseName' requid={true} width={200} value={warehouseName} onChange={setWarehouseName} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <ErrorMessager titles={errorMess} />
      </div>
      <div className='pt-60 pr-20'>
        <BtnEntryCommon title='登録' style='end' action={handleRegisterWarehouse} width={150} height={50} fontSize={25} />
      </div>

    </div>
  );
};

export default WarehouseRegister;
