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

}
export default setting;