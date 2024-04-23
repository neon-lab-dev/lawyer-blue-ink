import warning from "@/assets/images/warning.jpg";

/**
 *  NotSupported component is used to display a message when the user tries to access the website from a device that is not supported.
 * ie mobile or some small screen devices
 */
const NotSupported = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen p-2 w-full m-auto">
      <img src={warning} />
      <div className="text-3xl tracking-wide text-center">
        Device not supported!
      </div>
      <div className=" text-xl opacity-75 mt-5 text-center">
        Please use a desktop or laptop to access this website.
      </div>
    </div>
  );
};
export default NotSupported;
