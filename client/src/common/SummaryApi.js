export const baseURL = import.meta.env.VITE_API_URL

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login : {
        url : '/api/user/login',
        method : 'post'
    },
    forgot_password : {
        url : "/api/user/forgot-password",
        method : 'put'
    },
    forgot_password_otp_verification : {
        url : 'api/user/verify-forgot-password-otp',
        method : 'put'
    },
    resetPassword : {
        url : "/api/user/reset-password",
        method : 'put'
    },
    refreshToken : {
        url : 'api/user/refresh-token',
        method : 'post'
    },
    userDetails : {
        url : '/api/user/user-details',
        method : "get"
    },
    logout : {
        url : "/api/user/logout",
        method : 'get'
    },
    updateUserDetails : {
        url : '/api/user/update-user',
        method : 'put'
    },
    // Categories
    categories_list: {
        url: '/api/category',
        method: 'get'
    },
    categories_get: (id) => ({
        url: `/api/category/${id}`,
        method: 'get'
    }),
    categories_create: {
        url: '/api/category',
        method: 'post'
    },
    categories_update: (id) => ({
        url: `/api/category/${id}`,
        method: 'put'
    }),
    categories_delete: (id) => ({
        url: `/api/category/${id}`,
        method: 'delete'
    }),
}

export default SummaryApi