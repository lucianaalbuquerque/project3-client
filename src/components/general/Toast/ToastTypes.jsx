import { toast } from 'react-toastify';
import ToastBody from './ToastBody';

export const toastSuccess = ({ title, message, ctaLink, onClick }) => {
  return toast.success(
    <ToastBody {...{ title: title || 'Success', message, ctaLink, onClick }} />,
    {
      toastId: `toastId-${message}`,
    },
  );
};

export const toastError = ({ title, message, ctaLink, onClick }) => {
  return toast.error(
    <ToastBody {...{ title: title || 'Something went wrong', message, ctaLink, onClick }} />,
    {
      toastId: `toastId-${message}`,
    },
  );
};

export const toastWarning = ({ title, message, ctaLink, onClick }) => {
  return toast.warning(
    <ToastBody {...{ title: title || 'Warning', message, ctaLink, onClick }} />,
    {
      toastId: `toastId-${message}`,
    },
  );
};

export const toastInfo = ({ title, message, ctaLink, onClick }) => {
  return toast.info(
    <ToastBody {...{ title: title || 'Information', message, ctaLink, onClick }} />,
    {
      toastId: `toastId-${message}`,
    },
  );
};