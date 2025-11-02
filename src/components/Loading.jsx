import loadingStyle from "../loading.module.css";

const Loading = () => {
  return (
    <div
      className={`${loadingStyle.page} pointer-events-none container mx-auto flex justify-center items-center z-20 absolute top-0 left-1/2 -translate-x-1/2 w-full h-full`}
    >
      <div className={loadingStyle.container}>
        <div className={loadingStyle.ring}></div>
        <div className={loadingStyle.ring}></div>
        <div className={loadingStyle.ring}></div>
        <div className={loadingStyle.ring}></div>
        <h3 className={loadingStyle.text}>loading</h3>
      </div>
    </div>
  );
};

export default Loading;
