"use client";

import master from '@/api/master';
import BtnClassicCommon from '@/common/button/BtnClassicCommon';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import ErrorMessager from '@/common/error/ErrorMessager';
import Pagination from '@/common/pagination/Pagination';
import TableListCommon from '@/common/table/TableListCommon';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import { AppDispatch } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';

const Customer: React.FC = () => {
  const [customerCd, setCustomerCd] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [language, setLanguage] = useState<string>('en');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElement, setTotalElement] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sizePage, setSizePage] = useState(1);
  const [actionTable, setActionTable] = useState(false);
  const [errorMess, setErrorMess] = useState([]);
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [listIds, setListIds] = useState<string[]>([]);

  const { t } = useTranslation();

  const routerLocationEntry = () => {

  }

  // fake data
  const columns = [
    { title: '', key: 'id', width: 200 },
    { title: t("master.customer.table-list.customer-cod"), key: 'customerCd', width: 200 },
    { title: t("master.customer.table-list.customer-name"), key: 'customerName', width: 200 },
    { title: t("master.customer.table-list.customer-name-formal"), key: 'customerNameFormal', width: 200 },
    { title: t("master.customer.table-list.supplier-flag"), key: 'supplierFlag', width: 200 },
  ];

  // list table data
  const [listHeaderCustomer, setListHeaderCustomer] = useState(columns);
  const [listDataCustomer, setListDataCustomer] = useState([]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // get screen warehouse register
  const routerCustomerRegister = (id?: string) => {
    if (id) {
      router.push(`/master/customer/register?id=${id}`);
    } else {
      router.push("/master/customer/register");
    }
  }

  //handle update data
  const handleUpdateData = (id: string) => {    
    routerCustomerRegister(id);
  }

  // handle search data
  const handleSearchList = () => {
    dispatch(showLoading())

    master.getCustomerList(`customerCd=${customerCd}&customerName=${customerName}&lang=${language}&page=${currentPage - 1}&limit=100`).then(res => {
      if (res.status === 200 && res.data.message === null) {
        setActionTable(true)
        setListDataCustomer(res.data.data.content)
        setTotalElement(res.data.data.page.totalElements);
        setTotalPages(res.data.data.page.totalPages);
        setSizePage(res.data.data.page.size);
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
          <BtnEntryCommon title={t("button.button-register")} style='start' action={() => routerCustomerRegister("")} width={150} height={40} fontSize={20} background={'#548EA6'} disabled={false} />
          <BtnClassicCommon title={t("button.button-import")} style='start' action={routerLocationEntry} width={150} height={40} fontSize={20} border={50} disabled={false} />
        </div>

        {/* button search pro data */}
        <div className='pr-3'>
          <BtnClassicCommon title={t("button.button-search-advance")} style='end' action={routerLocationEntry} width={150} height={35} fontSize={15} border={10} disabled={true} />
        </div>

        {/* item search data */}
        <div className='flex justify-between items-start'>
          <table className='min-w-full'>
            <tbody>
              <tr className='border-b-2'>
                <th className='text-left py-2 text-[#8B8B8B] w-[15%] text-base'>{t("master.customer.list-search.customer-cod")}</th>
                <td className='pr-10 py-2'>
                  <input
                    className='border-[2px] px-2 h-8 rounded-md border-[#9B9B9B]'
                    type="text"
                    value={customerCd}
                    onChange={(e) => setCustomerCd(e.target.value)}
                  />
                </td>
              </tr>
              <tr className='border-b-2'>
                <th className='text-left py-2 text-[#8B8B8B] w-[15%] text-base'>{t("master.customer.list-search.customer-name")}</th>
                <td className='pr-10 py-2'>
                  <input
                    className='border-[2px] px-2 h-8 rounded-md border-[#9B9B9B]'
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
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
                itemsPerPage={sizePage}
                onPageChange={handlePageChange}
                totalPage={totalPages}
              />
              <div className='flex justify-center items-center pr-3'>
                <BtnClassicCommon title={t("button.button-delete")} style='end' width={100} height={40} fontSize={15} border={50} action={routerLocationEntry} disabled={true} />
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
            <TableListCommon columns={listHeaderCustomer} data={listDataCustomer} widthCheckbox={100} handleUpdate={handleUpdateData} listKeyLink={["customerCd"]} handleIdsCheck={setListIds}/>
          </div>
            : <ErrorMessager titles={errorMess} />
        }
      </div>
    </div>
  );
};

export default Customer;
