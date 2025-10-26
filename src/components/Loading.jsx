import loadingStyle from "../loading.module.css";

const Loading = () => {
  return (
    <div
      className={`${loadingStyle.page} container mx-auto flex justify-center items-center z-20 absolute top-0 left-0 w-full h-full`}
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
