'use client';

import React, { useEffect, useState } from 'react';
import SlidebarMaster from './SlidebarMaster';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";

const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathName = usePathname();

    const { t, i18n } = useTranslation();
    
    const [isDataTorokuOpen, setIsDataTorokuOpen] = useState(false);
    const [isDataOpen, setIsDataOpen] = useState(false);
    const [actionTitle, setActionTitle] = useState(pathName.split('/')[1]);
    const [actionMaster, setActionMaster] = useState(false);

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

    const handleShowMaster = () => {
        setActionMaster(!actionMaster);
    };

    return (
        <div className='flex justify-left items-center'>
            <div className="text-white w-80 p-6 pt-10 text-2xl flex flex-col items-center bg-[#548EA6] leading-[4rem] font-black h-screen z-40">
                <nav className="text-white py-4 relative">
                    <ul className='text-left w-80'>
                        <li
                            className={`cursor-pointer pl-20 hover:bg-[#f2f2f2] truncate hover:text-[#548EA6] ${actionTitle === "/" ? "bg-[#f2f2f2] text-[#548EA6]" : ""}`}
                            onClick={() => handleItemClick('/')}
                        >
                            {t("sidebar.home")}
                        </li>
                        <li
                            className={`cursor-pointer pl-20 hover:bg-[#f2f2f2] truncate hover:text-[#548EA6] ${actionTitle === "/inventory" ? "bg-[#f2f2f2] text-[#548EA6]" : ""}`}
                            onClick={() => handleItemClick('/inventory')}
                        >
                            {t("sidebar.inventory")}
                        </li>
                        <li
                            className={`relative cursor-pointer pl-20 hover:bg-[#f2f2f2] truncate hover:text-[#548EA6] ${pathName.split('/')[1] === "register" ? "bg-[#f2f2f2] text-[#548EA6]" : ""}`}
                        >
                            <button
                                id="btn-shukka-toroku"
                                className="w-full text-left"
                                name='btn-shukka-entry'
                                onClick={handleSidebarDataTorokuClick}
                            >
                                {t("sidebar.register")}
                            </button>
                            <ul
                                id="submenu-shukka-toroku"
                                className={`font-gray text-left -translate-x-1/4 item-center w-80 bg-[#f2f2f2] overflow-hidden transition-all duration-300 z-10 ${isDataTorokuOpen ? 'max-h-48' : 'max-h-0'}`}
                            >
                                <li
                                    className={`${pathName === "/register/goods-issue" ? "text-[#616161]" : "text-[#D9D9D9]"} pl-[7rem] bg-[#f2f2f2] hover:bg-gray-100`}
                                    onClick={() => handleItemClick('/register/goods-issue')}
                                >
                                    {t("sidebar.register-goods-issue")}
                                </li>
                                <li
                                    className={`${pathName === "/register/goods-receive" ? "text-[#616161]" : "text-[#D9D9D9]"} pl-[7rem] bg-[#f2f2f2] hover:bg-gray-100`}
                                    onClick={() => handleItemClick('/register/goods-receive')}
                                >
                                    {t("sidebar.register-goods-receive")}
                                </li>
                                <li
                                    className={`${pathName === "/register/other" ? "text-[#616161]" : "text-[#D9D9D9]"} pl-[7rem] bg-[#f2f2f2] hover:bg-gray-100`}
                                    onClick={() => handleItemClick('/register/other')}
                                >
                                    {t("sidebar.register-orther")}
                                </li>
                            </ul>
                        </li>
                        <li
                            className={`relative cursor-pointer pl-20 hover:bg-[#f2f2f2] truncate hover:text-[#548EA6] ${pathName.split('/')[1] === "list" ? "bg-[#f2f2f2] text-[#548EA6]" : ""}`}
                        >
                            <button
                                id="btn-shukka-ichiran"
                                className="w-full text-left"
                                name='btn-shukka-ichiran'
                                onClick={handleSidebarDataClick}
                            >
                                {t("sidebar.list")}
                            </button>
                            <ul
                                id="submenu-shukka-ichiran"
                                className={`font-gray text-left -translate-x-1/4 item-center w-80 bg-[#f2f2f2] overflow-hidden transition-all duration-300 z-10 ${isDataOpen ? 'max-h-48' : 'max-h-0'}`}
                            >
                                <li
                                    className={`${pathName === "/list/goods-issue" ? "text-[#616161]" : "text-[#D9D9D9]"} pl-[7rem] bg-[#f2f2f2] hover:bg-gray-100`}
                                    onClick={() => handleItemClick('/list/goods-issue')}
                                >
                                    {t("sidebar.list-goods-issue")}
                                </li>
                                <li
                                    className={`${pathName === "/list/goods-receive" ? "text-[#616161]" : "text-[#D9D9D9]"} pl-[7rem] bg-[#f2f2f2] hover:bg-gray-100`}
                                    onClick={() => handleItemClick('/list/goods-receive')}
                                >
                                    {t("sidebar.list-goods-receive")}
                                </li>
                                <li
                                    className={`${pathName === "/list/other" ? "text-[#616161]" : "text-[#D9D9D9]"} pl-[7rem] bg-[#f2f2f2] hover:bg-gray-100`}
                                    onClick={() => handleItemClick('/list/other')}
                                >
                                    {t("sidebar.list-orther")}
                                </li>
                            </ul>
                        </li>
                        <li
                            className={`cursor-pointer pl-20 hover:bg-[#f2f2f2] truncate hover:text-[#548EA6] ${actionTitle === "/schedule" ? "bg-[#f2f2f2] text-[#548EA6]" : ""}`}
                            onClick={() => handleItemClick('/schedule')}
                        >
                            {t("sidebar.schedule")}
                        </li>
                        <li
                            className={`cursor-pointer pl-20 hover:bg-[#f2f2f2] truncate hover:text-[#548EA6] ${actionTitle === "/analysis" ? "bg-[#f2f2f2] text-[#548EA6]" : ""}`}
                            onClick={() => handleItemClick('/analysis')}
                        >
                            {t("sidebar.analysis")}
                        </li>
                        <li
                            className={`cursor-pointer pl-20 hover:bg-[#f2f2f2] truncate hover:text-[#548EA6] ${pathName.split('/')[1] === "master" ? "bg-[#f2f2f2] text-[#548EA6]" : ""}`}
                            onClick={() => handleItemClick('/master/product/list')}
                        >
                            {t("sidebar.master")}
                        </li>
                    </ul>
                    <div className={`${!actionMaster ? "flex w-80 justify-end" : "hidden"}`}>
                        <button onClick={handleShowMaster} className='pr-10 pt-10 hover:text-cyan-700 text-base font-thin'>{t("sidebar.detail-setting")}</button>
                    </div>
                </nav>
            </div>
            <SlidebarMaster actionMaster={actionMaster} setActionMaster={setActionMaster} />
        </div>
    );
};

export default Sidebar;
