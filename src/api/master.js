import axiosAPI from "./axiosAPI";

const master = {
    getWarehouseList(payload) {
        const url = `master/warehouse/get-list?${payload}`;
        return axiosAPI.get(url);
    },

    getLocationList(payload) {
        const url = `master/location/get-list?${payload}`;
        return axiosAPI.get(url);
    }
};

export default master;