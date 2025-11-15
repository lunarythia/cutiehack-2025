import type { CloseButtonProps } from "react-toastify";

export const ConfirmationCloseButton = ({ closeToast }: CloseButtonProps) => {
  return (
    <button
      aria-label="remove"
      type="button"
      className="w-fit text-nowrap right-4 bg-red-500 text-white ml-2 px-2 py-1 rounded hover:bg-red-600 transition"
      onClick={() => { closeToast(true); }}
    >
      Yes
    </button>
  );
};
