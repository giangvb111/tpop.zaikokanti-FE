import axiosAPI from "./axiosAPI";

const master = {

    // warehouse 
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
    }
};

export default master;