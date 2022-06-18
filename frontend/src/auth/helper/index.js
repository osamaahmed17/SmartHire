/** -----------------------
 * Import API 
 --------------------------*/
import { API } from '../../Backend'
import axios from 'axios'

/** **************************
 * Admin Login API 
*******************************/


export const TraineeSignUp = Trainee => {
    return axios.post(`${API}rest/api/v1/traineesignup`, Trainee)
        .then(function (res) {
            console.log(res)
            return res;
        })
        .catch(function (error) {
            console.log(error);
        });

}


export const adminLogin = admin => {

    return axios.post(`${API}rest/api/v1/login`, admin)
        .then(function (res) {
            console.log(res)
            return res;
        })
        .catch(function (error) {
            console.log(error);
        });

}

/** **************************
 * Admin Logout API 
*******************************/
export const adminLogout = () => {
    if (typeof window !== undefined) {
        localStorage.clear();
    }
}

/** ************************************
 * Add Department Details API
****************************************/


export const addDepartmentDetails = details => {
    return axios.post(`${API}rest/api/v1/department`, details)
        .then(function (res) {
            console.log(res)
            return res;
        })
        .catch(function (error) {
            console.log(error);
        });
}



/** ***************************************
 * Get Department Details API 
******************************************/
export const getDepartmentDetails = () => {
    return axios.get(`${API}rest/api/v1/department`)
        .then(function (res) {
            console.log(res)
            return res;
        })
        .catch(function (error) {
            console.log(error);
        });
}
/*******************************************
 * Delete Department Details API
********************************************/

export const deleteDepartmentDetail  = (id, next) => (event) => {
    return axios.delete(`${API}rest/api/v1/department/` + id)
    .then((res) => {
        console.log(res)
        next();
    })
    .catch(e => {
        alert(e);
    })
}

/** ---------------------------------------
 * Store Data in localstorage
 ------------------------------------------*/
export const localStore = (val, data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem(val, JSON.stringify(data));
        next();
    }
}
/**
 * Get Data from Local Storage
 */
export const getlocalstore = (val) => {
    let datapartmentData = []
    if (typeof window !== undefined) {
        if (localStorage.getItem(val)) {
            datapartmentData = JSON.parse(localStorage.getItem(val));
        }
    }
    return datapartmentData;
}

/**
 * Dashboard count
 */
export const dataStoreLocal = (val) => {
    console.log(localStorage.getItem(val))
    if (typeof window !== undefined) {
        if (localStorage.getItem(val)) {
            return JSON.parse(localStorage.getItem(val)).length;
        }
    }
}

/** ***************************************
 * Get Trainee Details API 
******************************************/
export const getStudentDetails = () => {

    return axios.get(`${API}rest/api/v1/traineedetail`)
    .then(function (res) {
        console.log(res)
        return res;
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

/**********************************************
 * Add Department Form Details by Admin
 ***********************************************/
export const add_department_form_details = Formdetails => {
    return axios.post(`${API}rest/api/v1/departmentform`, Formdetails)
    .then(function (res) {
        console.log(res)
        return res;
    })
    .catch(function (error) {
        console.log(error);
    });
}
/** ***************************************
 * Get Department Form Details API 
******************************************/
export const getDepartmentFormDetails = () => {
    return axios.get(`${API}rest/api/v1/departmentform`)
    .then(function (res) {
        console.log(res)
        return res;
    })
    .catch(function (error) {
        console.log(error);
    });
}
/** **************************
 * Admin Auth API 
*******************************/
export const isAdminAuthenticated = () => {
    if (typeof window === undefined)
        return false;
    if (localStorage.getItem('admin'))
        return true;
    else
        return false;
}

