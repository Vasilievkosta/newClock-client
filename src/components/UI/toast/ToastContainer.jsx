import { Slide, toast, ToastContainer } from 'react-toastify'

export const notifyError = (error) => toast.error(error)

export const notify = (message) =>
    toast.info(message, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: 'colored',
    })

export const ToastContainerWrap = () => {
    return (
        <ToastContainer
            position='bottom-left'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
            theme='colored'
        />
    )
}
