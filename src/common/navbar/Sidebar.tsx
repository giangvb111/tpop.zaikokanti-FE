'use client';

import React, { useEffect, useState } from 'react';
import SlidebarMaster from './SlidebarMaster';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import setting from '@/api/setting';

interface ChildrenData {
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

const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathName = usePathname();

    const [language, setLanguage] = useState<string>('en');
    const [isDataOpen, setIsDataOpen] = useState<string>('');
    const [actionMaster, setActionMaster] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const [listItemParent, setListItemParent] = useState([]);
    const [listItemChildren, setListItemChildren] = useState<ChildrenData[]>([]);


    // get languages
    useEffect(() => {
        const userLanguage = navigator.language.split("-")[0] || 'en';
        setLanguage(userLanguage);
        setIsDataOpen(pathName)
    }, []);

    useEffect(() => {
        //master
        if (pathName.split('/')[1] === "master") {
            setActionMaster(true);
        } else {
            setActionMaster(false);
        }
    }, [pathName]);

    const handleSidebarClick = (url: string, parentId: number) => {
        const firstChildUrl = listItemChildren.find((child: ChildrenData) => child.parentId === parentId)?.url;
        router.push(firstChildUrl ? firstChildUrl : url);
        setIsDataOpen(url);
    };

    const handleItemClick = (item: string) => {
        router.push(item);
        setIsDataOpen(item);
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
                                            <li
                                                key={index}
                                                className={`relative cursor-pointer pl-20 hover:bg-[#f2f2f2] truncate hover:text-[#548EA6] ${pathName.split('/')[1] === value.url.split('/')[1] ? "bg-[#f2f2f2] text-[#548EA6]" : ""}`}
                                            >
                                                <button
                                                    id="btn-shukka-toroku"
                                                    className="w-full text-left"
                                                    name='btn-shukka-entry'
                                                    onClick={() => handleSidebarClick(value.url, value.menuId)}
                                                >
                                                    {value.displayName}
                                                </button>
                                                <ul
                                                    id="submenu-shukka-toroku"
                                                    className={`font-gray text-left -translate-x-1/4 item-center w-80 bg-[#f2f2f2] overflow-hidden transition-all duration-300 z-10 ${isDataOpen.split("/")[1] === value.url.split("/")[1] ? 'max-h-48' : 'max-h-0'}`}
                                                >
                                                    {listItemChildren.map((data: any, key) => (
                                                        value.menuId === data.parentId
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
                                    )
                            ))
                        }
                    </ul>
                </nav>
            </div>
            <SlidebarMaster actionMaster={actionMaster} listItemChildren={listItemChildren} />
        </div>
    );
};

export default Sidebar;
