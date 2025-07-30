import expense from "../../../backend/models/expense";

export const BASE_URL="http://localhost:3000";
export const API_PATHS={
    AUTH:{
        LOGIN:"/api/v1/auth/login",
        REGISTER:"/api/v1/auth/register",
        GET_USER_INFO:"/api/v1/auth/getuser"
    },

    DASHBOARD:{
        GET_USER_INFO:"/api/v1/dashboard/dashboarddata",
    },

    INCOME:{
        ADD_INCOME:"/api/v1/income/add",
        GET_INCOME:"/api/v1/income/get",
        DOWNLOAD_INCOME:"/api/v1/income/download",
        DELETE_INCOME:(incomeid)=>"/api/v1/income/${incomeid}"
    },

     EXPENSE:{
        ADD_EXPENSE:"/api/v1/expense/add",
        GET_EXPENSE:"/api/v1/expense/get",
        DOWNLOAD_EXPENSE:"/api/v1/expense/download",
        DELETE_EXPENSE:(expenseid)=>"/api/v1/expense/${expenseid}"
     },

     IMAGE:{
        UPLOAD_IMAGE:"/api/v1/image/upload-image"
     }
}