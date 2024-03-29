const commonErrorMessage = 'An error occurred. Please try again later.'

export const handleApiError = (error, errorCallback) => {
    if (error.response) {
        if (Array.isArray(error.response.data.error)) {
            const firstError = error.response.data.error[0]
            console.error('Server error:', error.response.data.error)
            errorCallback(firstError.msg)
        } else {
            errorCallback(error.response.data.error)
        }
    } else {
        console.error('An error occurred:', error)
        errorCallback(commonErrorMessage)
    }
}

export const handleAuthorizationError = (error, navigate) => {
    if (error.response) {
        if (error.response.status === 403) {
            console.error('Error:', error.response.data)
            localStorage.removeItem('authKey')
            localStorage.removeItem('token')
            navigate('/auth-admin')
        } else if (error.response.status === 401) {
            console.error('Unauthorized:', error.response.data)
        }
    } else {
        console.error('Error:', error)
    }
}
