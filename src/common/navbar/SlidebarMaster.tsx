'use client';

import React, { memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface MasterAction {
    actionMaster: boolean;
    setActionMaster: (value: boolean) => void;
}

const SlidebarMaster: React.FC<MasterAction> = ({ actionMaster, setActionMaster }) => {
    const router = useRouter();
    const pathName = usePathname();

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
                    製品
                </li>
                <li
                    className={`${pathName.split('/')[2] === "category" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/category/list')}
                >
                    カテゴリ
                </li>
                <li
                    className={`${pathName.split('/')[2] === "warehouse" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/warehouse/list')}
                >
                    倉庫
                </li>
                <li
                    className={`${pathName.split('/')[2] === "location" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/location/list')}
                >
                    ロケーション
                </li>
                <li
                    className={`${pathName.split('/')[2] === "customer" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/customer/list')}
                >
                    取引先
                </li>
                <li
                    className={`${pathName.split('/')[2] === "user" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/user/list')}
                >
                    ユーザー
                </li>
                <li
                    className={`${pathName.split('/')[2] === "kengen/list" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/kengen/list/list')}
                >
                    権限
                </li>
                <li
                    className={`${pathName.split('/')[2] === "department" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/department/list')}
                >
                    部門
                </li>
                <li
                    className={`${pathName.split('/')[2] === "setting" ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                    onClick={() => handleItemClick('/master/setting')}
                >
                    詳細設定
                </li>
            </ul>
        </div>
    );
};

export default memo(SlidebarMaster);