
"use client";

import master from '@/api/master';
import setting from '@/api/setting';
import BtnClassicCommon from '@/common/button/BtnClassicCommon';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import ErrorMessager from '@/common/error/ErrorMessager';
import Pagination from '@/common/pagination/Pagination';
import TableListCommon from '@/common/table/TableListCommon';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import { AppDispatch } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const Division: React.FC = () => {

  const [language, setLanguage] = useState<string>('en');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElement, setTotalElement] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sizePage, setSizePage] = useState(1);
  const [actionTable, setActionTable] = useState(false);
  const [errorMess, setErrorMess] = useState([]);
  const [divisionCd, setDivisionCd] = useState("");
  const [divisionName, setDivisionName] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [listIds, setListIds] = useState<string[]>([]);

  const { t, i18n } = useTranslation();

  // get languages
  useEffect(() => {
    const userLanguage = navigator.language.split("-")[0] || 'en';
    setLanguage(userLanguage);
  }, []);

  // fake data
  const columns = [
    { title: '', key: 'id' },
    { title: t("master.division.table-list.division-cod"), key: 'divisionCd' },
    { title: t("master.division.table-list.division-name"), key: 'divisionName' },
    { title: t("master.division.table-list.warehouse-name"), key: 'warehouseName' }
  ];

  // list table data
  const [listHeaderDivision, setListHeaderDivision] = useState(columns);
  const [listDataDivision, setlistDataDivision] = useState([]);

  const routerDivisionImport = () => {

  }

  //get header table list
  useEffect(() => {
    setting.getSettingTableDivision(`lang=${language}`)
      .then(res => {
        // console.log(res.data.data);

      })
      .catch(err => {

      })
  }, [i18n.language])

  // get screen warehouse register
  const routerDivisionEntry = (id?: string) => {
    if (id) {
      router.push(`/master/division/register?id=${id}`);
    } else {
      router.push("/master/division/register");
    }
  }

  //handle update data
  const handleUpdateData = (id: string) => {
    routerDivisionEntry(id);
  }

  // handle delete data
  const handleDeleteData = () => {
    dispatch(showLoading())
    setErrorMess([])

    master.deleteDivision(`lang=${language}`, listIds)
      .then(res => {
        if (res.status === 200) {
          handleSearchList();
          setListIds([])
          dispatch(hiddenLoading())
        }
      })
      .catch(err => {
        if (err.response.data.status === 0) {
          setErrorMess(err.response.data.error.errorDetails?.map((e: any) => e.message));
          dispatch(hiddenLoading())
        }
        dispatch(hiddenLoading())
      })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // handle search data
  const handleSearchList = () => {
    dispatch(showLoading())
    setListIds([])

    master.getDivisionList(`divisionCd=${divisionCd}&divisionName=${divisionName}&warehouseName=${warehouseName}&lang=${language}&page=${currentPage - 1}&limit=100`)
      .then(res => {
        if (res.data.message === null) {
          setActionTable(true)
          setlistDataDivision(res.data.data.content)
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

  //search when render
  useEffect(() => {
    handleSearchList();
  }, [])

  useEffect(() => {
    setListHeaderDivision(columns)
  }, [i18n.language])

  return (
    <div className='bg-white h-screen pl-[170px] container-body'>
      <div className='px-3'>
        {/* button register */}
        <div className='flex justify-start items-center gap-3'>
          <BtnEntryCommon title={t("button.button-register")} style='start' action={() => routerDivisionEntry("")} width={150} height={40} fontSize={20} background={'#548EA6'} disabled={false} />
          <BtnClassicCommon title={t("button.button-import")} style='start' action={routerDivisionImport} width={150} height={40} fontSize={20} border={50} disabled={false} />
        </div>

        {/* error message */}
        <ErrorMessager titles={errorMess} />

        {/* item search data */}
        <div className='flex justify-between items-start mt-8'>
          <table className='min-w-full'>
            <tbody>
              <tr className='border-b-2'>
                <th className='text-left w-[12%] py-2 text-[#8B8B8B] text-base'>{t("master.division.list-search.division-cod")}</th>
                <td className='pr-10 py-1.5'>
                  <input
                    className='border-[2px] px-2 h-7 rounded-md border-[#9B9B9B]'
                    type="text"
                    value={divisionCd}
                    onChange={(e) => setDivisionCd(e.target.value)}
                  />
                </td>
              </tr>
              <tr className='border-b-2'>
                <th className='text-left w-[12%] py-2 text-[#8B8B8B] text-base'>{t("master.division.list-search.division-name")}</th>
                <td className='pr-10 py-1.5'>
                  <input
                    className='border-[2px] px-2 h-7 rounded-md border-[#9B9B9B]'
                    type="text"
                    value={divisionName}
                    onChange={(e) => setDivisionName(e.target.value)}
                  />
                </td>
              </tr>
              <tr className='border-b-2'>
                <th className='text-left w-[12%] py-2 text-[#8B8B8B] text-base'>{t("master.division.list-search.warehouse-name")}</th>
                <td className='pr-10 py-1.5'>
                  <input
                    className='border-[2px] px-2 h-7 rounded-md border-[#9B9B9B]'
                    type="text"
                    value={warehouseName}
                    onChange={(e) => setWarehouseName(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id='btn-search-data'>
          <BtnEntryCommon title={t("button.button-search")} style='center' action={handleSearchList} width={220} height={35} fontSize={15} background={'#548EA6'} disabled={false} />
        </div>

        {/* paging and button option */}
        {
          actionTable ?
            <div className='pt-20'>
              <div className='flex justify-between items-center pl-3 pb-2'>
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalElement}
                  itemsPerPage={sizePage}
                  onPageChange={handlePageChange}
                  totalPage={totalPages}
                />
                <div className='flex justify-center items-center pr-3'>
                  <BtnClassicCommon title={t("button.button-delete")} style='end' width={100} height={40} fontSize={15} disabled={listIds.length == 0} action={handleDeleteData} border={50} />
                  {/* <BtnClassicCommon title='・・・' action={routerDivisionImport} border={50} style='center' width={40} height={40} fontSize={15} /> */}
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
              <TableListCommon columns={listHeaderDivision} data={listDataDivision} widthCheckbox={100} handleUpdate={handleUpdateData} listKeyLink={['divisionCd']} handleIdsCheck={setListIds} />
            </div>
            : ""
        }
      </div >
    </div>
  );
};

export default Division;
