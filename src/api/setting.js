import axiosAPI from "./axiosAPI";
const setting = {

    // SIDEBAR
    // sidebar parent
    getSidebarParent(payload) {
        const url = `/master/menu-setting/get-parent-screen-display-setting?${payload}`;
        return axiosAPI.get(url);
    },

    // sidebar children
    getSidebarChildren(payload) {
        const url = `/master/menu-setting/get-children-screen-display-setting?${payload}`;
        return axiosAPI.get(url);
    },

    //MASTER
    //warehouse
    //location
    //division
    getSettingTableDivision(payload) {
        const url = `master/screen-detail-setting/get-screen-by-function-code?${payload}&functionCode=MS-021`;
        return axiosAPI.get(url);
    },

    //category
    //customer

}
export default setting;