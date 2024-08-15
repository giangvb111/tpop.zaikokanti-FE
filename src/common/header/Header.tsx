import React from 'react'

const Header: React.FC = () => {
    return (
        <div className="flex justify-between p-2 bg-white top-0 z-50 min-w-[1200px]">
            <div className="flex justify-center item-center pl-10">
                <div className="text-3xl font-extrabold text-[#548EA6] mr-4">eeeCLOUD</div>
                <div>
                    <button className="bg-[#548EA6] text-white h-10 px-5 text-lg transition-colors duration-150 rounded-lg focus:shadow-outline">
                        Standard
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="flex flex-col items-center justify-center w-8 h-6 space-y-1 m-[auto]">
                    <span className="block w-6 h-0.5 bg-[#548EA6]" />
                    <span className="block w-6 h-0.5 bg-[#548EA6]" />
                    <span className="block w-6 h-0.5 bg-[#548EA6]" />
                </button>
                <button className="bg-slate-300 text-white h-8 px-5 text-lg transition-colors duration-150 rounded-[5rem] focus:shadow-outline m-[auto] mr-4 ml-4">
                    テービーテック
                </button>
                <span className="content-center text-[#595959]">ログインユーザー：kashiwazaki</span>
                <a href="#" className="ml-4 text-gray">
                    <button className="bg-inherit border text-[#595959] border-[#595959] h-9 px-3 text-lg transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-slate-500/25">
                        ログアウト
                    </button>
                </a>
            </div>
        </div>
    )
};

export default Header;

