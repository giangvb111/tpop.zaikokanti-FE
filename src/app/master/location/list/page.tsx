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

const Location: React.FC = () => {

    const [language, setLanguage] = useState<string>('en');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElement, setTotalElement] = useState(0)
    const [actionTable, setActionTable] = useState(false);
    const [errorMess, setErrorMess] = useState([]);
    const [locationCd, setLocationCd] = useState("");
    const [locationName, setLocationName] = useState("");
    const [warehouseName, setWarehouseName] = useState("");
    const router = useRouter();
    const pathName = usePathname();
    const dispatch = useDispatch<AppDispatch>();

    // get languages
    useEffect(() => {
        const userLanguage = navigator.language.split("-")[0] || 'en';
        setLanguage(userLanguage);
    }, []);

    // fake header data
    const columns = [
        { title: '', key: 'id', width: 135 },
        { title: 'ロケーションコード', key: 'locationCd', width: 135 },
        { title: 'ロケーション名', key: 'locationName', width: 200 },
        { title: '倉庫名', key: 'warehouseName', width: 200 }
    ];

    // list table data
    const [listHeaderLocation, setListHeaderLocation] = useState(columns);
    const [listDataLocation, setListDataLocation] = useState([]);

    // check data > 100 item
    const itemsPerPage = listDataLocation.length > 100 ? 100 : listDataLocation.length;

    const routerLocationEntry = () => {

    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // get screen warehouse register
    const routerLocationRegister = (id?: string) => {
        if (id) {
            router.push(`/master/location/register?id=${id}`);
        } else {
            router.push("/master/location/register");
        }
    }

    // handle search data
    const handleSearchList = () => {
        dispatch(showLoading())

        master.getLocationList(`locationCd=${locationCd}&locationName=${locationName}&warehouseName=${warehouseName}&lang=${language}&page=${currentPage - 1}&limit=100`)
            .then(res => {
                if (res.status === 200 && res.data.message === null) {
                    setActionTable(true)
                    setListDataLocation(res.data.data.content)
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
        routerLocationRegister(id);
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
                    <BtnEntryCommon title='新規登録' style='start' action={() => routerLocationRegister("")} width={200} height={60} fontSize={25} background={'#548EA6'} disabled={false} />
                    <BtnClassicCommon title='インポート' style='start' action={routerLocationEntry} width={200} height={60} fontSize={25} border={50} disabled={false} />
                </div>

                {/* button search pro data */}
                <div className='pr-3'>
                    <BtnClassicCommon title='検索オプション' style='end' action={routerLocationEntry} width={150} height={35} fontSize={15} border={10} disabled={false} />
                </div>
                {/* item search data */}
                <div className='flex justify-between items-start'>
                    <table className='min-w-[520px]'>
                        <tbody>
                            <tr className='border-b-2'>
                                <th className='text-left pr-20 py-2 text-[#8B8B8B] text-xl'>ロケーションコード</th>
                                <td className='pr-10 py-2'>
                                    <input
                                        className='border-[2px] h-8 rounded-md px-2 border-[#9B9B9B]'
                                        type="text"
                                        value={locationCd}
                                        onChange={(e) => setLocationCd(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className='border-b-2'>
                                <th className='text-left pr-20 py-2 text-[#8B8B8B] text-xl'>ロケーション名</th>
                                <td className='pr-10 py-2'>
                                    <input
                                        className='border-[2px] h-8 rounded-md px-2 border-[#9B9B9B]'
                                        type="text"
                                        value={locationName}
                                        onChange={(e) => setLocationName(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className='border-b-2'>
                                <th className='text-left pr-20 py-2 text-[#8B8B8B] text-xl'>倉庫名</th>
                                <td className='pr-10 py-2'>
                                    <input
                                        className='border-[2px] h-8 rounded-md px-2 border-[#9B9B9B]'
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
                    <BtnEntryCommon title='この条件で検索' style='center' action={handleSearchList} width={220} height={35} fontSize={15} background={'#548EA6'} disabled={false} />
                </div>

                {/* paging and button option */}
                {
                    actionTable ?
                        <div className='pt-20'>
                            <div className='flex justify-between items-center pl-3 pb-2'>
                                <Pagination
                                    currentPage={currentPage}
                                    totalItems={totalElement}
                                    itemsPerPage={itemsPerPage}
                                    onPageChange={handlePageChange}
                                />
                                <div className='flex justify-center items-center pr-3'>
                                    <BtnClassicCommon title='削除' style='end' width={100} height={40} fontSize={15} disabled={true} action={routerLocationEntry} border={50} />
                                    {/* <BtnClassicCommon title='・・・' action={routerLocationEntry} border={50} style='center' width={40} height={40} fontSize={15} /> */}
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
                            <TableListCommon columns={listHeaderLocation} data={listDataLocation} widthCheckbox={100} handleUpdate={handleUpdateData} />
                        </div>
                        : <ErrorMessager titles={errorMess} />
                }
            </div>
        </div>
    );
};

export default Location;
