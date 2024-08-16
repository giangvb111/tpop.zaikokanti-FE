"use client";

import BtnClassicCommon from '@/common/button/BtnClassicCommon';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import React, { useState } from 'react';

const Customer: React.FC = () => {
  const routerLocationEntry = () => {

  }

  return (
    <div className='bg-white h-screen pl-[170px] container-body'>
      {/* button register */}
      <div className='flex justify-start items-center gap-3'>
        <BtnEntryCommon title='新規登録' style='start' action={routerLocationEntry} width={200} height={60} fontSize={25} />
        <BtnClassicCommon title='インポート' style='start' action={routerLocationEntry} width={200} height={60} fontSize={25} border={50} />
      </div>
    </div>
  );
};

export default Customer;
