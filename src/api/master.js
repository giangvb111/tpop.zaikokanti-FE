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

    getWarehouseById(payload) {
        const url = `master/warehouse/get-warehouse-by-id?${payload}`;
        return axiosAPI.get(url);
    },

    createWarehouse(payload, data) {
        const url = `master/warehouse/create?${payload}`;
        return axiosAPI.post(url, data);
    },

    deleteWarehouse(payload, data) {
        const url = `master/warehouse/delete-by-id-list?${payload}`;
        return axiosAPI.delete(url, { data: data });
    },

    // location
    getLocationList(payload) {
        const url = `master/location/get-list?${payload}`;
        return axiosAPI.get(url);
    },

    getLocationById(payload) {
        const url = `master/location/get-location-by-id?${payload}`;
        return axiosAPI.get(url);
    },

    createLocation(payload, data) {
        const url = `master/location/create?${payload}`;
        return axiosAPI.post(url, data);
    },

    deleteLocation(payload, data) {
        const url = `master/location/delete-by-id-list?${payload}`;
        return axiosAPI.delete(url, { data: data });
    },

    //Division
    getDivisionList(payload) {
        const url = `master/division/get-list?${payload}`;
        return axiosAPI.get(url);
    },

    createDivision(payload, data) {
        const url = `master/division/create?${payload}`;
        return axiosAPI.post(url, data);
    },

    getDivisionById(payload) {
        const url = `master/division/get-division-by-id?${payload}`;
        return axiosAPI.get(url);
    },

    deleteDivision(payload, data) {
        const url = `master/division/delete-by-id-list?${payload}`;
        return axiosAPI.delete(url, { data: data });
    },

    // customer
    getCustomerList(payload) {
        const url = `master/customer/get-list?${payload}`;
        return axiosAPI.get(url);
    },
    createCustomer(payload, data) {
        const url = `master/customer/create?${payload}`;
        return axiosAPI.post(url, data);
    },
    getCustomerById(payload) {
        const url = `master/customer/get-customer-by-id?${payload}`;
        return axiosAPI.get(url);
    },

    deleteCustomer(payload, data) {
        const url = `master/customer/delete-by-id-list?${payload}`;
        return axiosAPI.delete(url, { data: data });
    },

    //category
    getCategoryList(payload) {
        const url = `master/category/get-list?${payload}`;
        return axiosAPI.get(url);
    },
    createCategory(payload, data) {
        const url = `master/category/create?${payload}`;
        return axiosAPI.post(url, data);
    },
    getCategoryById(payload) {
        const url = `master/category/get-category-by-id?${payload}`;
        return axiosAPI.get(url);
    },

    deleteCategory(payload, data) {
        const url = `master/category/delete-by-id-list?${payload}`;
        return axiosAPI.delete(url, { data: data });
    },
};

export default master;