'use client';

import React, { memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface ListItemChild {
    displayName: string;
    displayOrder: number;
    functionCode: string;
    functionId: number;
    functionName: string;
    functionSection: string;
    menuId: number;
    parentId: number;
    url: string;
}


interface MasterAction {
    actionMaster: boolean;
    listItemChildren: ListItemChild[];
}

const SlidebarMaster: React.FC<MasterAction> = ({ actionMaster, listItemChildren }) => {
    const router = useRouter();
    const pathName = usePathname();

    const handleItemClick = (item: string) => {
        router.push(item);
    };

    return (
        <div className={`min-w-[150px] w-auto max-w-[150px] h-screen text-[#7f7f7f] bg-[#F2F2F2] transform transition-transform duration-300 ease-in-out ${actionMaster ? "translate-x-0" : "-translate-x-full"} z-10`}>
            <ul className='text-left pt-10'>
                {listItemChildren.map((data: any, index) => (
                    data.url.split('/')[1] === 'master'
                        ? <li
                            key={index}
                            className={`${pathName.split('/')[2] === data.url.split('/')[2] ? "bg-white text-black" : ""} hover:bg-white hover:text-black text-xl px-6 py-2 cursor-pointer`}
                            onClick={() => handleItemClick(data.url)}
                        >
                            {data.displayName}
                        </li>
                        : ""
                ))}
            </ul>
        </div>
    );
};

export default memo(SlidebarMaster);