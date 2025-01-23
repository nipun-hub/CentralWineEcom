import toast from 'react-hot-toast'

export const tostAlert = (type, message) => {
  type == 'success' &&
    toast.success(message, { duration: 4000, position: 'top-right' })
  type == 'error' &&
    toast.error(message, { duration: 4000, position: 'top-right' })
}

export const toastPromise = (
  promiseData,
  success = 'Success',
  error = 'Something went wrong',
) => {
  // toast.promise(
  //   promiseData, // The promise being tracked
  //   {
  //     loading: 'Saving...', // Message while the promise is pending
  //     success: <b>{success}</b>, // Message on promise resolution
  //     error: <b>{error}</b>, // Message on promise rejection
  //   },
  // )
}
