import axiosAPI from "./axiosAPI";

const master = {

    // warehouse 
    getWarehouseAllList() {
        const url = `master/warehouse/get-all-list`;
        return axiosAPI.get(url);
    },

    getWarehouseList(payload) {
        const url = `master/warehouse/get-list?${payload}`;
        return axiosAPI.get(url);
    },

    createWarehouse(payload, data) {
        const url = `master/warehouse/create?${payload}`;
        return axiosAPI.post(url, data);
    },

    // location
    getLocationList(payload) {
        const url = `master/location/get-list?${payload}`;
        return axiosAPI.get(url);
    },

    createLocation(payload, data) {
        const url = `master/location/create?${payload}`;
        return axiosAPI.post(url, data);
    },

    // customer
    getCustumerList(payload) {
        const url = `master/customer/get-list?${payload}`;
        return axiosAPI.get(url);
    },
};

export default master;