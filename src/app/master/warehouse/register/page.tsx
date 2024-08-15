"use client";

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import InputTextCommon from '@/common/combobox/InputTextCommon';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';

const WarehouseRegister: React.FC = () => {

  const router = useRouter();
  const pathName = usePathname();

  const [warehouseCd, setWarehouseCd] = useState("");
  const [warehouseName, setWarehouseName] = useState("");

  const routerWarehouseList = () => {
    router.push("/master/warehouse/list")
  }

  const handleRegisterWarehouse = () => {

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
              <td className='py-2'><InputTextCommon id='warehouseCd' requid={true} width={200} value={warehouseCd} onChange={setWarehouseCd} /></td>
            </tr>
            <tr className=''>
              <th className='text-left py-2 text-[#8B8B8B] text-xl'>倉庫名<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'><InputTextCommon id='warehouseName' requid={true} width={200} value={warehouseName} onChange={setWarehouseName} /></td>
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
