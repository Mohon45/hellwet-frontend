import { Icon } from "@iconify/react";

export const Modal = ({ title, setModal, body }) => {
  const styles = {
    modalWrapper:
      "fixed flex items-center justify-center top-0 right-0 left-0 bottom-0 bg-black backdrop-blur-sm bg-opacity-10 z-[700]",
    modalCloseButton:
      "my-0 mx-0 bg-none hover:opacity-80 focus:opacity-80 active:opacity-80 text-black text-[16px] w-[130px] py-2 px-3 rounded-md flex justify-center items-center",
    modalButton:
      "my-0 mx-0 bg-brand hover:bg-brand hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-white text-[16px] w-[130px] py-2 px-3 rounded-md flex justify-center items-center",
  };
  return (
    <div className={styles.modalWrapper}>
      <div className="bg-white relative px-4 pt-5 rounded-md w-[50%]">
        <h1 className="text-[20px] font-bold tracking-tight">
          {title ? title : "Enter your modal title"}
        </h1>
        <hr />

        <div className="bg-brand w-[100%] h-[1px]"></div>
        <div
          className="text-[14px] text-black absolute right-5 top-3 cursor-pointer"
          onClick={() => setModal(false)}
        >
          <Icon icon="radix-icons:cross-2" fontSize={28} color={"gray"} />
        </div>
        <div className="my-5">{body}</div>
      </div>
    </div>
  );
};
