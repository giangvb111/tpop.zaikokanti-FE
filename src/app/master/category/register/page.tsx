"use client";
import master from '@/api/master';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import InputTextCommon from '@/common/combobox/InputTextCommon';
import ErrorMessager from '@/common/error/ErrorMessager';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import { AppDispatch } from '@/redux/store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const CategoryRegister: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [errorMess, setErrorMess] = useState<{ field: string, message: string }[]>([]);
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');

  const { t, i18n } = useTranslation();

  const [errorTile, setErrorTitle] = useState("");

  const [categoryCd, setCategoryCd] = useState("");
  const [majorCategory, setMajorCategory] = useState("");
  const [mediumCategory, setMediumCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // check data change
  const [categoryCdCheck, setCategoryCdCheck] = useState("");
  const [majorCategoryCheck, setMajorCategoryCheck] = useState("");
  const [mediumCategoryCheck, setMediumCategoryCheck] = useState("");
  const [subCategoryCheck, setSubCategoryCheck] = useState("");

  const routerCategoryList = () => {
    router.push("/master/category/list")
  }

  // get languages
  useEffect(() => {
    const userLanguage = navigator.language.split("-")[0] || 'en';
    setLanguage(userLanguage);
  }, []);

  //get data update
  useEffect(() => {
    if (idParam) {
      dispatch(showLoading())
      master.getCategoryById(`id=${idParam}&&lang=${language}`)
        .then(res => {
          if (res.status === 200) {
            setCategoryCd(res.data.data.categoryCd)
            setMajorCategory(res.data.data.majorCategory)
            setMediumCategory(res.data.data.mediumCategory)
            setSubCategory(res.data.data.subCategory)
            //set value data check
            setCategoryCdCheck(res.data.data.categoryCd)
            setMajorCategoryCheck(res.data.data.majorCategory)
            setMediumCategoryCheck(res.data.data.mediumCategory)
            setSubCategoryCheck(res.data.data.subCategory)
            setErrorMess([])
            dispatch(hiddenLoading())
          }
        })
    }
  }, [])

  // register category
  const handleRegisterCategory = () => {
    dispatch(showLoading())

    let checkChange = false;

    const postData = [{
      id: idParam,
      categoryCd: categoryCd,
      majorCategory: majorCategory,
      mediumCategory: mediumCategory,
      subCategory: subCategory,
    }]

    // check data change
    if (idParam) {
      if (
        categoryCd === categoryCdCheck
        && majorCategory === majorCategoryCheck
        && mediumCategory === mediumCategoryCheck
        && subCategory === subCategoryCheck
      ) {
        setErrorTitle(t('error.check-data-change'));
        dispatch(hiddenLoading())
        checkChange = true;
      } else {
        checkChange = false;
      }
    }

    if (!checkChange) {
      master.createCategory(`lang=${language}`, postData)
        .then(res => {
          if (res.status === 200) {
            setCategoryCd("")
            setMajorCategory("")
            setMediumCategory("")
            setSubCategory("")
            setErrorMess([])
            dispatch(hiddenLoading())
            routerCategoryList()
          }
        })
        .catch(err => {
          if (err.response.data.status === 0) {
            setErrorMess(err.response.data.error.errorDetails)
            dispatch(hiddenLoading());
          }
        });
    }

  }

  return (
    <div className='bg-white h-screen pl-[170px] container-body'>
      <div className='pt-5'>
        {/* button back to list */}
        <button
          className='flex justify-start items-center gap-5 hover:text-black hover:font-bold text-base'
          onClick={routerCategoryList}
        >
          <span>＜</span>
          <span>{t("button.button-back")}</span>
        </button>
      </div>
      <div>
        <ErrorMessager titles={[errorTile]} />
      </div>
      <div className='flex justify-between items-start px-7 py-10'>
        {/* register items */}
        <table className='min-w-[520px]'>
          <tbody>
            <tr className='flex justify-start items-start'>
              <th className='text-left w-40 py-2 text-[#8B8B8B] text-base'>{t("master.category.register.category-cod")}<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'>
                <InputTextCommon
                  id='categoryCd'
                  requid={true}
                  width={200}
                  value={categoryCd}
                  onChange={setCategoryCd}
                  errorMess={errorMess.filter(error => error.field === 'categoryCd').map(error => error.message)}
                  disabled={false}
                />
              </td>
            </tr>
            <tr className='flex justify-start items-start'>
              <th className='text-left w-40 py-2 text-[#8B8B8B] text-base'>{t("master.category.register.major-category")}<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'>
                <InputTextCommon
                  id='majorCategory'
                  requid={true}
                  width={200}
                  value={majorCategory}
                  onChange={setMajorCategory}
                  errorMess={errorMess.filter(error => error.field === 'majorCategory').map(error => error.message)}
                  disabled={false}
                />
              </td>
            </tr>
            <tr className='flex justify-start items-start'>
              <th className='text-left w-40 py-2 text-[#8B8B8B] text-base'>{t("master.category.register.medium-category")}</th>
              <td className='py-2'>
                <InputTextCommon
                  id='mediumCategory'
                  requid={false}
                  width={200}
                  value={mediumCategory}
                  onChange={setMediumCategory}
                  errorMess={errorMess.filter(error => error.field === 'mediumCategory').map(error => error.message)}
                  disabled={false}
                />
              </td>
            </tr>
            <tr className='flex justify-start items-start'>
              <th className='text-left w-40 py-2 text-[#8B8B8B] text-base'>{t("master.category.register.sub-category")}</th>
              <td className='py-2'>
                <InputTextCommon
                  id='subCategory'
                  requid={false}
                  width={200}
                  value={subCategory}
                  onChange={setSubCategory}
                  errorMess={errorMess.filter(error => error.field === 'subCategory').map(error => error.message)}
                  disabled={false}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='pt-60 pr-20'>
        <BtnEntryCommon title={t("button.button-register-submit")} style='end' action={handleRegisterCategory} width={150} height={50} fontSize={25} background={'#548EA6'} disabled={false} />
      </div>
    </div>
  );
};

export default CategoryRegister;
