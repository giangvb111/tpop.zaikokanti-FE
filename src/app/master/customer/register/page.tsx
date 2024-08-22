"use client";

import master from '@/api/master';
import BtnEntryCommon from '@/common/button/BtnEntryCommon';
import InputCheckboxCommon from '@/common/combobox/InputCheckboxCommon';
import InputTextCommon from '@/common/combobox/InputTextCommon';
import SelectCommon from '@/common/combobox/SelectCommon';
import ErrorMessager from '@/common/error/ErrorMessager';
import { hiddenLoading, showLoading } from '@/redux/future/loading-slice';
import { AppDispatch } from '@/redux/store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

interface SelectOption {
  value: string;
  label: string;
}

const CustomerRegister: React.FC = () => {

  const [language, setLanguage] = useState<string>('en');
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [errorTile, setErrorTitle] = useState("");

  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');

  const [errorMess, setErrorMess] = useState<{ field: string, message: string }[]>([]);

  const { t, i18n } = useTranslation();

  const [customerCd, setCustomerCd] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerNameFormal, setCustomerNameFormal] = useState("");
  const [supplierFlag, setSupplierFlag] = useState(0);
  const [deliveryFlag, setDeliveryFlag] = useState(0);
  const [requestFlag, setRequestFlag] = useState(0);
  const [companyFlag, setCompanyFlag] = useState(0);
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [prefectures, setPrefectures] = useState("");
  const [municipalities, setMunicipalities] = useState("");
  const [address, setAddress] = useState("");
  const [building, setBuilding] = useState("");
  const [tel, setTel] = useState("");
  const [fax, setFax] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [picName, setPicName] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [homePage, setHomePage] = useState("");
  const [deliveryId, setDeliveryId] = useState("");

  // check data change
  const [customerCdCheck, setCustomerCdCheck] = useState("");
  const [customerNameCheck, setCustomerNameCheck] = useState("");
  const [customerNameFormalCheck, setCustomerNameFormalCheck] = useState("");
  const [supplierFlagCheck, setSupplierFlagCheck] = useState(0);
  const [deliveryFlagCheck, setDeliveryFlagCheck] = useState(0);
  const [requestFlagCheck, setRequestFlagCheck] = useState(0);
  const [companyFlagCheck, setCompanyFlagCheck] = useState(0);
  const [countryCheck, setCountryCheck] = useState("");
  const [postalCodeCheck, setPostalCodeCheck] = useState("");
  const [prefecturesCheck, setPrefecturesCheck] = useState("");
  const [municipalitiesCheck, setMunicipalitiesCheck] = useState("");
  const [addressCheck, setAddressCheck] = useState("");
  const [buildingCheck, setBuildingCheck] = useState("");
  const [telCheck, setTelCheck] = useState("");
  const [faxCheck, setFaxCheck] = useState("");
  const [departmentNameCheck, setDepartmentNameCheck] = useState("");
  const [picNameCheck, setPicNameCheck] = useState("");
  const [mailAddressCheck, setMailAddressCheck] = useState("");
  const [homePageCheck, setHomePageCheck] = useState("");
  const [deliveryIdCheck, setDeliveryIdCheck] = useState("");

  const listNohinsaki = [
    { value: "1", label: "nohin1" },
    { value: "2", label: "nohin2" },
    { value: "3", label: "nohin3" },
    { value: "4", label: "nohin4" },
    { value: "5", label: "nohin5" },
  ]

  const [listDelivery, setListDelivery] = useState<SelectOption[]>(listNohinsaki);


  // get languages
  useEffect(() => {
    const userLanguage = navigator.language.split("-")[0] || 'en';
    setLanguage(userLanguage);
  }, []);

  //get data update
  useEffect(() => {
    if (idParam) {
      dispatch(showLoading())
      master.getCustomerById(`id=${idParam}&&lang=${language}`)
        .then(res => {
          if (res.status === 200) {
            setCustomerCd(res.data.data.customerCd);
            setCustomerName(res.data.data.customerName);
            setCustomerNameFormal(res.data.data.customerNameFormal);
            setSupplierFlag(res.data.data.supplierFlag === null ? 0 : res.data.data.supplierFlag);
            setDeliveryFlag(res.data.data.deliveryFlag === null ? 0 : res.data.data.deliveryFlag);
            setRequestFlag(res.data.data.requestFlag === null ? 0 : res.data.data.requestFlag);
            setCompanyFlag(res.data.data.companyFlag === null ? 0 : res.data.data.companyFlag);
            setCountry(res.data.data.country);
            setPostalCode(res.data.data.postalCode);
            setPrefectures(res.data.data.prefectures);
            setMunicipalities(res.data.data.municipalities);
            setAddress(res.data.data.address);
            setBuilding(res.data.data.building);
            setTel(res.data.data.tel);
            setFax(res.data.data.fax);
            setDepartmentName(res.data.data.departmentName);
            setPicName(res.data.data.picName);
            setMailAddress(res.data.data.mailAddress);
            setHomePage(res.data.data.homePage);
            setDeliveryId(res.data.data.deliveryId);

            //set value data check
            setCustomerCdCheck(res.data.data.customerCd);
            setCustomerNameCheck(res.data.data.customerName);
            setCustomerNameFormalCheck(res.data.data.customerNameFormal);
            setSupplierFlagCheck(res.data.data.supplierFlag === null ? 0 : res.data.data.supplierFlag);
            setDeliveryFlagCheck(res.data.data.deliveryFlag === null ? 0 : res.data.data.deliveryFlag);
            setRequestFlagCheck(res.data.data.requestFlag === null ? 0 : res.data.data.requestFlag);
            setCompanyFlagCheck(res.data.data.companyFlag === null ? 0 : res.data.data.companyFlag);
            setCountryCheck(res.data.data.country);
            setPostalCodeCheck(res.data.data.postalCode);
            setPrefecturesCheck(res.data.data.prefectures);
            setMunicipalitiesCheck(res.data.data.municipalities);
            setAddressCheck(res.data.data.address);
            setBuildingCheck(res.data.data.building);
            setTelCheck(res.data.data.tel);
            setFaxCheck(res.data.data.fax);
            setDepartmentNameCheck(res.data.data.departmentName);
            setPicNameCheck(res.data.data.picName);
            setMailAddressCheck(res.data.data.mailAddress);
            setHomePageCheck(res.data.data.homePage);
            setDeliveryIdCheck(res.data.data.deliveryId);

            setErrorMess([])
            dispatch(hiddenLoading())
          }
        })
    }
  }, [])

  const routerCustomerList = () => {
    router.push("/master/customer/list")
  }

  //handle register entry
  const handleRegisterCustomer = () => {
    dispatch(showLoading())

    let checkChange = false;

    const postData = [{
      id: idParam,
      customerCd: customerCd,
      customerName: customerName,
      customerNameFormal: customerNameFormal,
      supplierFlag: supplierFlag,
      deliveryFlag: deliveryFlag,
      requestFlag: requestFlag,
      companyFlag: companyFlag,
      country: country,
      postalCode: postalCode,
      prefectures: prefectures,
      municipalities: municipalities,
      address: address,
      building: building,
      tel: tel,
      fax: fax,
      departmentName: departmentName,
      picName: picName,
      mailAddress: mailAddress,
      homePage: homePage,
      deliveryId: deliveryId,
    }];

    if (idParam) {
      if (
        customerCd === customerCdCheck &&
        customerName === customerNameCheck &&
        customerNameFormal === customerNameFormalCheck &&
        supplierFlag === supplierFlagCheck &&
        deliveryFlag === deliveryFlagCheck &&
        requestFlag === requestFlagCheck &&
        companyFlag === companyFlagCheck &&
        country === countryCheck &&
        postalCode === postalCodeCheck &&
        prefectures === prefecturesCheck &&
        municipalities === municipalitiesCheck &&
        address === addressCheck &&
        building === buildingCheck &&
        tel === telCheck &&
        fax === faxCheck &&
        departmentName === departmentNameCheck &&
        picName === picNameCheck &&
        mailAddress === mailAddressCheck &&
        homePage === homePageCheck &&
        deliveryId === deliveryIdCheck
      ) {
        setErrorTitle(t('error.check-data-change'));
        dispatch(hiddenLoading())
        checkChange = true;
      } else {
        checkChange = false;
      }
    }
    if (!checkChange) {
      master.createCustomer(`lang=${language}`, postData)
        .then(res => {
          if (res.status === 200) {
            // clear data
            setCustomerCd("");
            setCustomerName("");
            setCustomerNameFormal("");
            setSupplierFlag(0);
            setDeliveryFlag(0);
            setRequestFlag(0);
            setCompanyFlag(0);
            setCountry("");
            setPostalCode("");
            setPrefectures("");
            setMunicipalities("");
            setAddress("");
            setBuilding("");
            setTel("");
            setFax("");
            setDepartmentName("");
            setPicName("");
            setMailAddress("");
            setHomePage("");
            setDeliveryId("");

            setErrorMess([])
            dispatch(hiddenLoading())
            routerCustomerList();
          }
        })
        .catch(err => {
          if (err.response.data.status === 0) {
            setErrorMess(err.response.data.error.errorDetails)
            dispatch(hiddenLoading());
          }
          dispatch(hiddenLoading())

        });
    }
  }

  return (
    <div className='bg-white h-screen pl-[170px] container-body'>
      <div className='pt-5'>
        {/* button back to list */}
        <button
          className='flex justify-start items-center gap-5 hover:text-black hover:font-bold text-xl'
          onClick={routerCustomerList}
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
              <th className='text-left w-60 py-2 text-[#8B8B8B] text-base'>{t("master.customer.register.customer-cod")}<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'>
                <InputTextCommon
                  id='customerCd'
                  requid={true}
                  width={200}
                  value={customerCd}
                  onChange={setCustomerCd}
                  errorMess={errorMess.filter(error => error.field === 'customerCd').map(error => error.message)}
                  disabled={false}
                />
              </td>
            </tr>
            <tr className='flex justify-start items-start'>
              <th className='text-left w-60 py-2 text-[#8B8B8B] text-base'>{t("master.customer.register.customer-name")}<span className='text-[#b72e30]'>*</span></th>
              <td className='py-2'>
                <InputTextCommon
                  id='customerName'
                  requid={true}
                  width={200}
                  value={customerName}
                  onChange={setCustomerName}
                  errorMess={errorMess.filter(error => error.field === 'customerName').map(error => error.message)}
                  disabled={false}
                />
              </td>
            </tr>
            <tr className='flex justify-start items-start'>
              <th className='text-left w-60 py-2 text-[#8B8B8B] text-base'>{t("master.customer.register.customer-name-formal")}</th>
              <td className='py-2'>
                <InputTextCommon
                  id='customerNameFormal'
                  requid={false}
                  width={200}
                  value={customerNameFormal}
                  onChange={setCustomerNameFormal}
                  errorMess={errorMess.filter(error => error.field === 'customerNameFormal').map(error => error.message)}
                  disabled={false}
                />
              </td>
            </tr>

            {/* flag start */}
            <tr className='flex justify-start items-start'>
              <th className='text-left w-60 py-2 text-[#8B8B8B] text-base'>{t("master.customer.register.supplier-flag")}</th>
              <td className='py-2'>
                <InputCheckboxCommon
                  id='supplierFlag'
                  requid={true}
                  width={25}
                  value={supplierFlag}
                  onChange={setSupplierFlag}
                  errorMess={errorMess.filter(error => error.field === 'supplierFlag').map(error => error.message)}
                  disabled={false}
                />
              </td>
            </tr>
            <tr className='flex justify-start items-start'>
              <th className='text-left w-60 py-2 text-[#8B8B8B] text-base'>{t("master.customer.register.delivery-flag")}</th>
              <td className='py-2'>
                <InputCheckboxCommon
                  id='deliveryFlag'
                  requid={true}
                  width={25}
                  value={deliveryFlag}
                  onChange={setDeliveryFlag}
                  errorMess={errorMess.filter(error => error.field === 'deliveryFlag').map(error => error.message)}
                  disabled={false}
                />
              </td>
            </tr>
            {/* flag end */}

            <tr className='flex justify-start items-start'>
              <th className='text-left w-60 py-2 text-[#8B8B8B] text-base'>{t("master.customer.register.delivery")}</th>
              <td className='py-2'>
                <SelectCommon
                  id='deliveryId'
                  onChange={setDeliveryId}
                  options={listDelivery}
                  value={deliveryId}
                  requid={false}
                  width={200}
                  errorMess={errorMess.filter(error => error.field === 'deliveryId').map(error => error.message)}
                  disabled={requestFlag === 1 ? false : true}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='pt-60 pr-20'>
        <BtnEntryCommon title={t("button.button-register-submit")} style='end' action={handleRegisterCustomer} width={150} height={50} fontSize={25} background={'#548EA6'} disabled={false} />
      </div>
    </div>
  );
};

export default CustomerRegister;
