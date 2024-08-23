"use client";

import BtnClassicCommon from '@/common/button/BtnClassicCommon';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import Pagination from '@/common/pagination/Pagination';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import TableListCommon from '@/common/table/TableListCommon';
import ErrorMessager from '@/common/error/ErrorMessager';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import master from '@/api/master';

const Category: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElement, setTotalElement] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sizePage, setSizePage] = useState(1);
  const { t, i18n } = useTranslation();
  const [actionTable, setActionTable] = useState(false);
  const [errorMess, setErrorMess] = useState([]);
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [listIds, setListIds] = useState<string[]>([]);

  const [categoryCd, setCategoryCd] = useState("");
  const [majorCategory, setMajorCategory] = useState("");
  const [mediumCategory, setMediumCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");


  const handleTest = () => { }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // get languages
  useEffect(() => {
    const userLanguage = navigator.language.split("-")[0] || 'en';
    setLanguage(userLanguage);
  }, []);

  // get screen warehouse register
  const routerCategoryRegister = (id?: string) => {
    if (id) {
      router.push(`/master/category/register?id=${id}`);
    } else {
      router.push("/master/category/register");
    }
  }

  // fake data
  const columns = [
    { title: '', key: 'id', width: 200 },
    { title: t("master.category.table-list.category-cod"), key: 'categoryCd', width: 200 },
    { title: t("master.category.table-list.major-category"), key: 'majorCategory', width: 200 },
    { title: t("master.category.table-list.medium-category"), key: 'mediumCategory', width: 200 },
    { title: t("master.category.table-list.sub-category"), key: 'subCategory', width: 200 },
  ];

  // list table data
  const [listHeaderCategory, setListHeaderCategory] = useState(columns);
  const [listDataCategory, setListDataCategory] = useState([]);

  // handle search data
  const handleSearchList = () => {
    dispatch(showLoading())

    master.getCategoryList(`categoryCd=${categoryCd}&majorCategory=${majorCategory}&mediumCategory=${mediumCategory}&subCategory=${subCategory}&lang=${language}&page=${currentPage - 1}&limit=`).then(res => {
      if (res.status === 200 && res.data.message === null) {
        setActionTable(true)
        setListDataCategory(res.data.data.content)
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

  //handle update data
  const handleUpdateData = (id: string) => {
    routerCategoryRegister(id);
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
          <BtnEntryCommon title={t("button.button-register")} style='start' action={() => routerCategoryRegister("")} width={150} height={40} fontSize={20} background={'#548EA6'} disabled={false} />
          <BtnClassicCommon title={t("button.button-import")} style='start' action={handleTest} width={150} height={40} fontSize={20} border={50} disabled={false} />
        </div>

        {/* item search data */}
        <div className='flex justify-between items-start'>
          <table className='min-w-full mt-5'>
            <tbody>
              <tr className='border-b-2'>
                <th className='text-left pr-20 py-2 text-[#8B8B8B] text-base w-[20%]'>{t("master.category.list-search.category-cod")}</th>
                <td className='pr-10 py-2'>
                  <input
                    className='border-[2px] px-2 h-8 rounded-md border-[#9B9B9B]'
                    type="text"
                    value={categoryCd}
                    onChange={(e) => setCategoryCd(e.target.value)}
                  />
                </td>
              </tr>
              <tr className='border-b-2'>
                <th className='text-left pr-20 py-2 text-[#8B8B8B] text-base w-[20%]'>{t("master.category.list-search.major-category")}</th>
                <td className='pr-10 py-2'>
                  <input
                    className='border-[2px] px-2 h-8 rounded-md border-[#9B9B9B]'
                    type="text"
                    value={majorCategory}
                    onChange={(e) => setMajorCategory(e.target.value)}
                  />
                </td>
              </tr>
              <tr className='border-b-2'>
                <th className='text-left pr-20 py-2 text-[#8B8B8B] text-base w-[20%]'>{t("master.category.list-search.medium-category")}</th>
                <td className='pr-10 py-2'>
                  <input
                    className='border-[2px] px-2 h-8 rounded-md border-[#9B9B9B]'
                    type="text"
                    value={mediumCategory}
                    onChange={(e) => setMediumCategory(e.target.value)}
                  />
                </td>
              </tr>
              <tr className='border-b-2'>
                <th className='text-left pr-20 py-2 text-[#8B8B8B] text-base w-[20%]'>{t("master.category.list-search.sub-category")}</th>
                <td className='pr-10 py-2'>
                  <input
                    className='border-[2px] px-2 h-8 rounded-md border-[#9B9B9B]'
                    type="text"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
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
                <BtnClassicCommon title={t("button.button-delete")} style='end' width={100} height={40} fontSize={15} action={handleTest} border={50} disabled={true} />
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
            <TableListCommon columns={listHeaderCategory} data={listDataCategory} widthCheckbox={100} handleUpdate={handleUpdateData} listKeyLink={["categoryCd"]} handleIdsCheck={setListIds}/>
          </div>
            : <ErrorMessager titles={errorMess} />
        }
      </div>
    </div>
  );
};

export default Category;
