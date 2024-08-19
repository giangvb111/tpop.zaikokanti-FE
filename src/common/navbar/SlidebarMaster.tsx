'use client';

import React, { memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";

interface MasterAction {
    actionMaster: boolean;
    setActionMaster: (value: boolean) => void;
}

const SlidebarMaster: React.FC<MasterAction> = ({ actionMaster, setActionMaster }) => {
    const router = useRouter();
    const pathName = usePathname();

    const { t, i18n } = useTranslation();
    
    const handleItemClick = (item: string) => {
        router.push(item);
    };

    return (
        <div className={`min-w-[150px] w-auto max-w-[150px] h-screen text-[#7f7f7f] bg-[#F2F2F2] transform transition-transform duration-300 ease-in-out ${actionMaster ? "translate-x-0" : "-translate-x-full"} z-10`}>
            <ul className='text-left pt-10'>
                <li
                    className={`${pathName.split('/')[2] === "product" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/product/list')}
                >
                    {t("sidebar-master.product")}
                </li>
                <li
                    className={`${pathName.split('/')[2] === "category" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/category/list')}
                >
                    {t("sidebar-master.category")}
                </li>
                <li
                    className={`${pathName.split('/')[2] === "warehouse" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/warehouse/list')}
                >
                    {t("sidebar-master.warehouse")}
                </li>
                <li
                    className={`${pathName.split('/')[2] === "location" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/location/list')}
                >
                    {t("sidebar-master.location")}
                </li>
                <li
                    className={`${pathName.split('/')[2] === "customer" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/customer/list')}
                >
                    {t("sidebar-master.customer")}
                </li>
                <li
                    className={`${pathName.split('/')[2] === "user" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/user/list')}
                >
                    {t("sidebar-master.user")}
                </li>
                <li
                    className={`${pathName.split('/')[2] === "kengen/list" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/kengen/list')}
                >
                    {t("sidebar-master.role")}
                </li>
                <li
                    className={`${pathName.split('/')[2] === "division" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/division/list')}
                >
                    {t("sidebar-master.division")}
                </li>
                <li
                    className={`${pathName.split('/')[2] === "setting" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/setting')}
                >
                    {t("sidebar-master.setting")}
                </li>
            </ul>
        </div>
    );
};

export default memo(SlidebarMaster);