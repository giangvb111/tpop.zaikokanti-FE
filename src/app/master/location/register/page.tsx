"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import InputTextCommon from '@/common/combobox/InputTextCommon';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import SelectCommon from '@/common/combobox/SelectCommon';
import master from '@/api/master';
import { useDispatch } from 'react-redux';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import { AppDispatch } from '@/redux/store';


interface SelectOption {
  value: string;
  label: string;
}

const LocationRegister: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');

  const [errorMess, setErrorMess] = useState<{ field: string, message: string }[]>([]);

  const [listWareHouse, setListWareHouse] = useState<SelectOption[]>([]);

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

  const [locationCd, setLocationCd] = useState("");
  const [locationName, setLocationName] = useState("");
  const [warehouseId, setWarehouseId] = useState("");

  const routerLocationList = () => {
    router.push("/master/location/list")
  }

  //get data update
  useEffect(() => {
    if (idParam) {
      dispatch(showLoading())
      master.getLocationById(`id=${idParam}&&lang=${language}`)
        .then(res => {
          if (res.status === 200) {
            setLocationCd(res.data.data.locationCd)
            setLocationName(res.data.data.locationName)
            setErrorMess([])
            dispatch(hiddenLoading())
          }
        })
    }
  }, [])

  // handle register location
  const handleRegisterLocation = () => {
    dispatch(showLoading())

    const postData = [{
      locationCd: locationCd,
      locationName: locationName,
      warehouseId: warehouseId
    }]

    master.createLocation(`lang=${language}`, postData)
      .then(res => {
        if (res.status === 200) {
          setLocationCd("")
          setLocationName("")
          setWarehouseId("")
          setErrorMess([])
          dispatch(hiddenLoading())
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
            <tr className='flex justify-start items-start'>
              <th className='text-left w-60 py-2 text-[#8B8B8B] text-xl'>ロケーションコード<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'>
                <InputTextCommon
                  id='locationCd'
                  requid={true}
                  width={200}
                  value={locationCd}
                  onChange={setLocationCd}
                  errorMess={errorMess.filter(error => error.field === 'locationCd').map(error => error.message)}
                  disabled={false}
                />
              </td>
            </tr>
            <tr className='flex justify-start items-start'>
              <th className='text-left w-60 py-2 text-[#8B8B8B] text-xl'>ロケーション名<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'>
                <InputTextCommon
                  id='locationName'
                  requid={true}
                  width={200}
                  value={locationName}
                  onChange={setLocationName}
                  errorMess={errorMess.filter(error => error.field === 'locationName').map(error => error.message)}
                  disabled={false}
                />
              </td>
            </tr>
            <tr className='flex justify-start items-start'>
              <th className='text-left w-60 py-2 text-[#8B8B8B] text-xl'>倉庫名<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'>
                <SelectCommon
                  id='warehouseId'
                  onChange={setWarehouseId}
                  options={listWareHouse}
                  value={warehouseId}
                  requid={true}
                  width={200}
                  errorMess={errorMess.filter(error => error.field === 'warehouseId').map(error => error.message)}
                  disabled={false}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='pt-60 pr-20'>
        <BtnEntryCommon title='登録' style='end' action={handleRegisterLocation} width={150} height={50} fontSize={25} background={'#548EA6'} disabled={false} />

      </div>

    </div>
  );
};

export default LocationRegister;
