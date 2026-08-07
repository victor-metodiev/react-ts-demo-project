import { Oval } from "react-loader-spinner";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <Oval
        height={60}
        width={60}
        color="#4fa94d"
        wrapperClass=""
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  );
};
