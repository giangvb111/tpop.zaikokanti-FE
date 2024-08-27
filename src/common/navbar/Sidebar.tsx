'use client';

import React, { useEffect, useState } from 'react';
import SlidebarMaster from './SlidebarMaster';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import setting from '@/api/setting';

const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathName = usePathname();

    const [language, setLanguage] = useState<string>('en');
    const [isDataTorokuOpen, setIsDataTorokuOpen] = useState(false);
    const [isDataOpen, setIsDataOpen] = useState(false);
    const [actionTitle, setActionTitle] = useState(pathName.split('/')[1]);
    const [actionMaster, setActionMaster] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const [listItemParent, setListItemParent] = useState([]);
    const [listItemChildren, setListItemChildren] = useState([]);


    // get languages
    useEffect(() => {
        const userLanguage = navigator.language.split("-")[0] || 'en';
        setLanguage(userLanguage);
    }, []);

    useEffect(() => {
        //master
        if (pathName.split('/')[1] === "master") {
            setActionMaster(true);
        } else {
            setActionMaster(false);
        }

        //register
        if (pathName.split('/')[1] === "register") {
            setIsDataTorokuOpen(true);
        } else {
            setIsDataTorokuOpen(false);
        }

        //list
        if (pathName.split('/')[1] === "list") {
            setIsDataOpen(true);
        } else {
            setIsDataOpen(false);
        }

        setActionTitle(pathName);
    }, [pathName]);

    const handleSidebarDataTorokuClick = () => {
        if (pathName.split("/")[1] !== "register") {
            router.push("/register/goods-issue");
        }
        setIsDataTorokuOpen(!isDataTorokuOpen);
        setIsDataOpen(false);
    };

    const handleSidebarDataClick = () => {
        if (pathName.split("/")[1] !== "list") {
            router.push("/list/goods-issue");
        }
        setIsDataOpen(!isDataOpen);
        setIsDataTorokuOpen(false);
    };

    const handleItemClick = (item: string) => {
        setActionTitle(item);
        router.push(item);

        //master
        if (pathName.split('/')[1] === "master") {
            setActionMaster(!actionMaster);
        } else {
            setActionMaster(false);
        }
    };

    const handleSetting = () => {
        router.push("/setting");
    };

    // handle search data
    useEffect(() => {
        dispatch(showLoading())

        setting.getSidebarParent(`lang=${language}`)
            .then(res => {
                dispatch(hiddenLoading())
                setListItemParent(res.data.data);
            })

        setting.getSidebarChildren(`lang=${language}`)
            .then(res => {
                dispatch(hiddenLoading())
                setListItemChildren(res.data.data);
                console.log(res.data.data);

            })
    }, [language])

    return (
        <div className='flex justify-left items-center'>
            <div className="text-white w-80 p-6 pt-10 text-2xl flex flex-col items-center bg-[#548EA6] leading-[4rem] font-black h-screen z-40">
                <nav className="text-white py-4 relative">
                    <ul className='text-left w-80'>
                        {
                            listItemParent.map((value: any, index) => (
                                value.url === "/setting"
                                    ? <div key={index} className={`flex w-80 justify-end`}>
                                        <button onClick={handleSetting} className='pr-10 pt-10 hover:text-cyan-700 text-base font-thin'>{value.displayName}</button>
                                    </div>
                                    : (
                                        value.url === "/master"
                                            ? <li
                                                key={index}
                                                className={`cursor-pointer pl-20 hover:bg-[#f2f2f2] truncate hover:text-[#548EA6] ${pathName.split('/')[1] === "master" ? "bg-[#f2f2f2] text-[#548EA6]" : ""}`}
                                                onClick={() => handleItemClick('/master/product/list')}
                                            >
                                                {value.displayName}
                                            </li>
                                            :
                                            (
                                                value.url === "/register"
                                                    ? <li
                                                        key={index}
                                                        className={`relative cursor-pointer pl-20 hover:bg-[#f2f2f2] truncate hover:text-[#548EA6] ${pathName.split('/')[1] === value.url.split('/')[1] ? "bg-[#f2f2f2] text-[#548EA6]" : ""}`}
                                                    >
                                                        <button
                                                            id="btn-shukka-toroku"
                                                            className="w-full text-left"
                                                            name='btn-shukka-entry'
                                                            onClick={handleSidebarDataTorokuClick}
                                                        >
                                                            {value.displayName}
                                                        </button>
                                                        <ul
                                                            id="submenu-shukka-toroku"
                                                            className={`font-gray text-left -translate-x-1/4 item-center w-80 bg-[#f2f2f2] overflow-hidden transition-all duration-300 z-10 ${isDataTorokuOpen ? 'max-h-48' : 'max-h-0'}`}
                                                        >
                                                            {listItemChildren.map((data: any, key) => (
                                                                data.url.split("/")[1] === "register"
                                                                    ? <li
                                                                        key={key}
                                                                        className={`${pathName === data.url ? "text-[#616161]" : "text-[#D9D9D9]"} pl-[7rem] bg-[#f2f2f2] hover:bg-gray-100`}
                                                                        onClick={() => handleItemClick(data.url)}
                                                                    >
                                                                        {data.displayName}
                                                                    </li>
                                                                    : ""
                                                            ))}
                                                        </ul>
                                                    </li>
                                                    : (
                                                        value.url === "/list"
                                                            ? <li
                                                                key={index}
                                                                className={`relative cursor-pointer pl-20 hover:bg-[#f2f2f2] truncate hover:text-[#548EA6] ${pathName.split('/')[1] === value.url.split('/')[1] ? "bg-[#f2f2f2] text-[#548EA6]" : ""}`}
                                                            >
                                                                <button
                                                                    id="btn-shukka-toroku"
                                                                    className="w-full text-left"
                                                                    name='btn-shukka-entry'
                                                                    onClick={handleSidebarDataClick}
                                                                >
                                                                    {value.displayName}
                                                                </button>
                                                                <ul
                                                                    id="submenu-shukka-toroku"
                                                                    className={`font-gray text-left -translate-x-1/4 item-center w-80 bg-[#f2f2f2] overflow-hidden transition-all duration-300 z-10 ${isDataOpen ? 'max-h-48' : 'max-h-0'}`}
                                                                >
                                                                    {listItemChildren.map((data: any, key) => (
                                                                        data.url.split("/")[1] === "list"
                                                                            ? <li
                                                                                key={key}
                                                                                className={`${pathName === data.url ? "text-[#616161]" : "text-[#D9D9D9]"} pl-[7rem] bg-[#f2f2f2] hover:bg-gray-100`}
                                                                                onClick={() => handleItemClick(data.url)}
                                                                            >
                                                                                {data.displayName}
                                                                            </li>
                                                                            : ""
                                                                    ))}
                                                                </ul>
                                                            </li>
                                                            : (
                                                                <li
                                                                    key={index}
                                                                    className={`cursor-pointer pl-20 hover:bg-[#f2f2f2] truncate hover:text-[#548EA6] ${actionTitle === value.url ? "bg-[#f2f2f2] text-[#548EA6]" : ""}`}
                                                                    onClick={() => handleItemClick(value.url)}
                                                                >
                                                                    {value.displayName}
                                                                </li>
                                                            )
                                                    )
                                            )
                                    )
                            ))
                        }
                    </ul>
                </nav>
            </div>
            <SlidebarMaster actionMaster={actionMaster} setActionMaster={setActionMaster} />
        </div>
    );
};

export default Sidebar;
