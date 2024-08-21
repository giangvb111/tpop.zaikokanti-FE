"use client";

import BtnClassicCommon from '@/common/button/BtnClassicCommon';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import Pagination from '@/common/pagination/Pagination';
import TableListCommon from '@/common/table/TableListCommon';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import master from '@/api/master';
import ErrorMessager from '@/common/error/ErrorMessager';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import { useTranslation } from "react-i18next";

const Warehouse: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElement, setTotalElement] = useState(0)
  const [actionTable, setActionTable] = useState(false);
  const [errorMess, setErrorMess] = useState([]);
  const [warehouseCd, setWarehouseCd] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const { t, i18n } = useTranslation();  

  // get languages
  useEffect(() => {
    const userLanguage = navigator.language.split("-")[0] || 'en';
    setLanguage(userLanguage);
  }, []);

  // fake data
  const columns = [
    { title: '', key: 'id', width: 200 },
    { title: t("master.warehouse.table-list.warehouse-cod"), key: 'warehouseCd', width: 200 },
    { title: t("master.warehouse.table-list.warehouse-name"), key: 'warehouseName', width: 200 }
  ];

  // list table data
  const [listHeaderWarehouse, setListHeaderWarehouse] = useState(columns);
  const [listDataWarehouse, setListDataWarehouse] = useState([]);

  // check data > 100 item
  const itemsPerPage = listDataWarehouse.length > 100 ? 100 : listDataWarehouse.length;

  const routerWarehouseEntry = () => {

  }
  // get screen warehouse register
  const routerWarehouseRegister = (id?: string) => {
    if (id) {
      router.push(`/master/warehouse/register?id=${id}`);
    } else {
      router.push("/master/warehouse/register");
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // handle search data
  const handleSearchList = () => {
    dispatch(showLoading())

    master.getWarehouseList(`warehouseCd=${warehouseCd}&warehouseName=${warehouseName}&lang=${language}&page=${currentPage - 1}&limit=100`).then(res => {
      if (res.status === 200 && res.data.message === null) {
        setActionTable(true)
        setListDataWarehouse(res.data.data.content)
        setTotalElement(res.data.data.page.totalElements);
        dispatch(hiddenLoading())
      } else {
        setActionTable(false)
        const errorMessages = Array.isArray(res.data.message) ? res.data.message : [res.data.message];
        setErrorMess(errorMessages);
        dispatch(hiddenLoading())

      }
    })
  }

  //handle update data
  const handleUpdateData = (id: string) => {
    routerWarehouseRegister(id);
  }

  // search when render
  useEffect(() => {
    handleSearchList();
  }, [])

  // render when page change
  useEffect(() => {
    handleSearchList();
  }, [currentPage])

  return (
    <div className='bg-white h-screen pl-[170px] container-body'>

      <div className='px-3'>
        {/* button register */}
        <div className='flex justify-start items-center gap-3'>
          <BtnEntryCommon title={t("button.button-register")} style='start' action={() => routerWarehouseRegister("")} width={150} height={40} fontSize={20} background={'#548EA6'} disabled={false} />
          <BtnClassicCommon title={t("button.button-import")} style='start' action={routerWarehouseEntry} width={150} height={40} fontSize={20} border={50} disabled={false} />
        </div>


        {/* button search pro data */}
        <div className='pr-3'>
          <BtnClassicCommon title={t("button.button-search-advance")} style='end' action={routerWarehouseEntry} width={150} height={35} fontSize={15} border={10} disabled={false} />
        </div>

        {/* item search data */}
        <div className='flex justify-between items-start'>
          <table className='min-w-full'>
            <tbody>
              <tr className='border-b-2'>
                <th className='text-left pr-20 py-2 text-[#8B8B8B] text-base w-[20%]'>{t("master.warehouse.list-search.warehouse-cod")}</th>
                <td className='pr-10 py-2'>
                  <input
                    className='border-[2px] px-2 h-8 rounded-md border-[#9B9B9B]'
                    type="text"
                    value={warehouseCd}
                    onChange={(e) => setWarehouseCd(e.target.value)}
                  />
                </td>
              </tr>
              <tr className='border-b-2'>
                <th className='text-left pr-20 py-2 text-[#8B8B8B] text-base w-[20%]'>{t("master.warehouse.list-search.warehouse-name")}</th>
                <td className='pr-10 py-2'>
                  <input
                    className='border-[2px] px-2 h-8 rounded-md border-[#9B9B9B]'
                    type="text"
                    value={warehouseName}
                    onChange={(e) => setWarehouseName(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* button search data */}
        <div id='btn-search-data'>
          <BtnEntryCommon title={t("button.button-search")} style='center' action={handleSearchList} width={220} height={35} fontSize={15} background={'#548EA6'} disabled={false} />
        </div>

        {/* paging and button option */}
        {
          actionTable ? <div className='pt-20'>
            <div className='flex justify-between items-center pl-3 pb-2'>
              <Pagination
                currentPage={currentPage}
                totalItems={totalElement}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
              <div className='flex justify-center items-center pr-3'>
                <BtnClassicCommon title={t("button.button-delete")} style='end' width={100} height={40} fontSize={15} action={routerWarehouseEntry} border={50} disabled={true} />
                {/* <BtnClassicCommon title='・・・' action={routerWarehouseEntry} border={50} style='center' width={40} height={40} fontSize={15} /> */}
                <div className={`flex justify-end items-center pt-3`}>
                  <button
                    type="button"
                    style={{
                      width: 40,
                      height: 40,
                      fontWeight: 900
                    }}
                    className={`bg-white border-[2px] flex justify-center text-[10px] items-center font-bold border-[#595959] text-[#595959] transition-colors duration-150 hover:bg-[#548EA6]/75 rounded-full truncate focus:shadow-outline m-[auto] mr-4`}
                  >
                    ・・・
                  </button>
                </div>
              </div>
            </div>

            {/* table data list  */}
            <TableListCommon columns={listHeaderWarehouse} data={listDataWarehouse} widthCheckbox={100} handleUpdate={handleUpdateData} listKeyLink={["warehouseCd"]} />
          </div>
            : <ErrorMessager titles={errorMess} />
        }
      </div>
    </div>
  );
};

export default Warehouse;
