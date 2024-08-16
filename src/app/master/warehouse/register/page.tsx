"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import InputTextCommon from '@/common/combobox/InputTextCommon';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import master from '@/api/master';


const WarehouseRegister: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [errorMess, setErrorMess] = useState<{ field: string, message: string }[]>([]);

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

    const postData = [{
      warehouseCd: warehouseCd,
      warehouseName: warehouseName
    }]

    master.createWarehouse(`lang=${language}`, postData)
      .then(res => {
        if (res.status === 200) {
          setWarehouseCd("")
          setWarehouseName("")
          setErrorMess([])
          dispatch(hiddenLoading())
        }
      })
      .catch(err => {
        if (err.response.data.status === 0) {
          setErrorMess(err.response.data.error.errorDetails)
          dispatch(hiddenLoading());
        }
      });
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
            <tr className='flex justify-start items-start'>
              <th className='text-left w-40 py-2 text-[#8B8B8B] text-xl'>倉庫コード<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'>
                <InputTextCommon
                  id='warehouseCd'
                  requid={true}
                  width={200}
                  value={warehouseCd}
                  onChange={setWarehouseCd}
                  errorMess={errorMess.filter(error => error.field === 'warehouseCd').map(error => error.message)}
                />
              </td>
            </tr>
            <tr className='flex justify-start items-start'>
              <th className='text-left w-40 py-2 text-[#8B8B8B] text-xl'>倉庫名<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'>
                <InputTextCommon
                  id='warehouseName'
                  requid={true}
                  width={200}
                  value={warehouseName}
                  onChange={setWarehouseName}
                  errorMess={errorMess.filter(error => error.field === 'warehouseName').map(error => error.message)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='pt-60 pr-20'>
        <BtnEntryCommon title='登録' style='end' action={handleRegisterWarehouse} width={150} height={50} fontSize={25} />
      </div>

    </div>
  );
};

export default WarehouseRegister;
