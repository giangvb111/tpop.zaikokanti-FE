"use client";

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import InputTextCommon from '@/common/combobox/InputTextCommon';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import SelectCommon from '@/common/combobox/SelectCommon';

const LocationRegister: React.FC = () => {

  const router = useRouter();
  const pathName = usePathname();

  const listWareHouse = [
    { value: '001', label: 'XXX倉庫A' },
    { value: '002', label: 'XXX倉庫B' },
    { value: '003', label: 'XXX倉庫C' },
  ]

  const [locationCd, setLocationCd] = useState("");
  const [locationName, setLocationName] = useState("");
  const [warehouseName, setWarehouseName] = useState("");

  const routerLocationList = () => {
    router.push("/master/location/list")
  }

  const handleRegisterLocation = () => {

  }

  return (
    <div className='bg-white h-screen pl-[170px] container-body'>
      <div className='pt-5'>
        {/* button back to list */}
        <button
          className='flex justify-start items-center gap-5 hover:text-black hover:font-bold text-xl'
          onClick={routerLocationList}
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
              <th className='text-left py-2 text-[#8B8B8B] text-xl'>ロケーションコード<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'><InputTextCommon id='locationCd' requid={true} width={200} value={locationCd} onChange={setLocationCd} /></td>
            </tr>
            <tr className=''>
              <th className='text-left py-2 text-[#8B8B8B] text-xl'>ロケーション名<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'><InputTextCommon id='locationName' requid={true} width={200} value={locationName} onChange={setLocationName} /></td>
            </tr>
            <tr className=''>
              <th className='text-left py-2 text-[#8B8B8B] text-xl'>倉庫名<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'><SelectCommon id='warehouseName' onChange={setWarehouseName} options={listWareHouse} value={warehouseName} requid={true} width={200}/></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='pt-60 pr-20'>
        <BtnEntryCommon title='登録' style='end' action={handleRegisterLocation} width={150} height={50} fontSize={25} />

      </div>

    </div>
  );
};

export default LocationRegister;
