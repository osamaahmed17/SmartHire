/** -----------------------
 * Import API 
 --------------------------*/
import { API } from '../../Backend'
import ReactGa from 'react-ga';
import axios from 'axios'

/** **************************
 * Trainee SignUp API 
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
/** **************************
 * Trainee Login or SignIn API 
*******************************/
export const TraineeSignIn = Trainee => {
    console.log(Trainee)
    return axios.post(`${API}rest/api/v1/traineelogin`, Trainee)
        .then(function (res) {
            return res;
        })
        

}
/** **************************
 * Trainee Login or SignIn API 
*******************************/
export const sendOTPOnmail = Trainee => {
    return axios.post(`${API}rest/api/v1/verifyemail`, Trainee)
        .then(function (res) {
            console.log(res)
            return res;
        })
        .catch(function (error) {
            console.log(error);
        });



}
/** **************************
 * Trainee forgot Password API 
*******************************/
export const forgotpassword = Trainee => {
    return axios.put(`${API}rest/api/v1/traineeforgetpassword`, Trainee)
        .then(function (res) {
            return res;
        })
        .catch(function (error) {
            console.log(error);
        });
}
/** **************************
 * Update Trainee Profile API 
*******************************/
export const updateProfile = Trainee => {
    return axios.put(`${API}rest/api/v1/updateprofile`, Trainee)
    .then(function (res) {
        return res;
    })
    .catch(function (error) {
        console.log(error);
    });
}

/** **************************
 * Trainee Auth API 
*******************************/
export const isAuthenticated = () => {
    ReactGa.initialize('G-HH20HZVZWJ');

    ReactGa.pageview(window.location.pathname + window.location.search);
    if (typeof window === undefined)
        return false;
    if (localStorage.getItem('trainee'))
        return true;
    else
        return false;
}

/** **************************
 * Trainee Logout API 
*******************************/
export const TraineeLogout = () => {
    if (typeof window !== undefined) {
        localStorage.clear();
    }
}
//  /** **************************
//   * Trainee Logout API 
//  *******************************/
//  export const AlumniData = (val) => {
//      return axios(`${API}Trainee/convertExcelToJson/${val}`, {
//          method: "GET",
//          headers: {
//              Accept: "application/json",
//              "Content-Type": "application/json"
//          },
//      })
//          .then((res) => {
//              return res.json();
//          })
//          .catch(err => {
//              console.log(err);
//          });
//  }

/** **************************
 * add Interview Exp 
*******************************/
export const AddInterviewExp = (values) => {
    return axios(`${API}/rest/api/v1/experience`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    })
        .then((res) => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        });
}
/** **************************
 * Get Interview Exp Details 
*******************************/
export const GetInterviewExpDetails = () => {
    return axios(`${API}/rest/api/v1/experience`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
        .then((res) => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        });
}
//  /** *********************************
//   * update Approval of Interview Exp  
//  *************************************/
//  export const ApprovalInterviewDetails = (values) => {
//      return axios(`${API}Trainee/InterviewExp/update_approval`, {
//          method: "PUT",
//          headers: {
//              Accept: "application/json",
//              "Content-Type": "application/json"
//          },
//          body: JSON.stringify(values)
//      })
//          .then((res) => {
//              return res.json();
//          })
//          .catch(err => {
//              console.log(err);
//          })
//  }