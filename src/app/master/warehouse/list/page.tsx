"use client";

import BtnClassicCommon from '@/common/button/BtnClassicCommon';
import BtnDisabledCommon from '@/common/button/BtnDisabledCommon';
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

  // get languages
  useEffect(() => {
    const userLanguage = navigator.language.split("-")[0] || 'en';
    setLanguage(userLanguage);
  }, []);

  // fake data
  const columns = [
    { title: '倉庫コード', key: 'warehouseCd', width: 200 },
    { title: '倉庫名', key: 'warehouseName', width: 200 }
  ];

  // list table data
  const [listHeaderWarehouse, setListHeaderWarehouse] = useState(columns);
  const [listDataWarehouse, setListDataWarehouse] = useState([]);

  // check data > 100 item
  const itemsPerPage = listDataWarehouse.length > 100 ? 100 : listDataWarehouse.length;

  const routerWarehouseEntry = () => {

  }
  // get screen warehouse register
  const routerWarehouseRegister = () => {
    router.push("/master/warehouse/register")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // handle search data
  const handleSearchList = () => {
    dispatch(showLoading())

    master.getWarehouseList(`warehouseCd=${warehouseCd}&warehouseName=${warehouseName}&lang=${language}&page=${currentPage - 1}&limit=100`).then(res => {
      if (res.status === 200) {
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
          <BtnEntryCommon title='新規登録' style='start' action={routerWarehouseRegister} width={200} height={60} fontSize={25} />
          <BtnClassicCommon title='インポート' style='start' action={routerWarehouseEntry} width={200} height={60} fontSize={25} border={50} />
        </div>

        {/* button search pro data */}
        <div className='pr-3'>
          <BtnClassicCommon title='検索オプション' style='end' action={routerWarehouseEntry} width={150} height={35} fontSize={15} border={10} />
        </div>

        {/* item search data */}
        <div className='flex justify-between items-start'>
          <table className='min-w-full'>
            <tbody>
              <tr className='border-b-2'>
                <th className='text-left py-2 text-[#8B8B8B] w-[15%] text-base'>倉庫コード</th>
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
                <th className='text-left py-2 text-[#8B8B8B] w-[15%] text-base'>倉庫名</th>
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
          <BtnEntryCommon title='この条件で検索' style='center' action={handleSearchList} width={220} height={35} fontSize={15} />
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
                <BtnDisabledCommon title='削除' style='end' width={100} height={40} fontSize={15} />
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
            <TableListCommon columns={listHeaderWarehouse} data={listDataWarehouse} widthCheckbox={100} />
          </div>
            : <ErrorMessager titles={errorMess} />
        }
      </div>
    </div>
  );
};

export default Warehouse;
