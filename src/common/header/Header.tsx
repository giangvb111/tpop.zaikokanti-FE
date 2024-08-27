"use client"

import React, { useEffect } from 'react'
import { useTranslation } from "react-i18next";
import '@/i18n/i18n';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();


    useEffect(() => {
        const userLanguage = navigator.language.split("-")[0] || 'en';
        changeLanguage(userLanguage)
    }, []);

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <div className="fixed left-0 h-14 flex w-full justify-between p-2 bg-white top-0 z-50 min-w-[1200px]">
            <div className="flex justify-center item-center pl-10">
                <div className="text-3xl font-extrabold text-[#548EA6] mr-4">eeeCLOUD</div>
                <div>
                    <button className="bg-[#548EA6] text-white h-10 px-5 text-lg transition-colors duration-150 rounded-lg focus:shadow-outline">
                        Standard
                    </button>
                </div>
                <div className="flex items-center border-2 border-[#548EA6] mx-2 rounded-full relative bg-white">
                    <div className=''>
                        <div
                            className={`absolute top-0 left-0 w-1/2 h-full rounded-full border-black border transition-all duration-300 ease-in-out bg-[#548EA6] transform ${i18n.language === 'en' ? 'translate-x-0' : 'translate-x-full'
                                }`}
                        ></div>

                        <button
                            onClick={() => changeLanguage('en')}
                            className={`p-3 w-1/2 z-10 relative transition-all duration-300 ${i18n.language === 'en' ? 'text-white' : 'text-[#D0CECE]'
                                }`}
                        >
                            English
                        </button>

                        <button
                            onClick={() => changeLanguage('ja')}
                            className={`p-3 w-1/2 z-10 relative transition-all duration-300 ${i18n.language === 'ja' ? 'text-white' : 'text-[#D0CECE]'
                                }`}
                        >
                            日本語
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="flex flex-col items-center justify-center w-8 h-6 space-y-1 m-[auto]">
                    <span className="block w-6 h-0.5 bg-[#548EA6]" />
                    <span className="block w-6 h-0.5 bg-[#548EA6]" />
                    <span className="block w-6 h-0.5 bg-[#548EA6]" />
                </button>
                <button className="bg-slate-300 text-white h-8 px-5 text-lg transition-colors duration-150 rounded-[5rem] focus:shadow-outline m-[auto] mr-4 ml-4">
                    {t("navbar.btn-TBTTech")}
                </button>
                <span className="content-center text-[#595959]">{t("navbar.user-login")}：kashiwazaki</span>
                <a href="#" className="ml-4 text-gray">
                    <button className="bg-inherit border text-[#595959] border-[#595959] h-9 px-3 text-lg transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-slate-500/25">
                        {t("navbar.logout")}
                    </button>
                </a>
            </div>
        </div>
    )
};

export default Header;

