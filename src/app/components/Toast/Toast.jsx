const Toast = ({ type, message}) => {
  const backGroundColor = () => {
    switch (type) {
      case "add":
        return "#FFA500";
      case "remove":
        return " #B22222";
        case "update":
            return "#8FBC8F";
    }
  };
    return (
      <div
        style={{ background: backGroundColor()}}
        className="main-component fixed py-2 top-[60px] w-full z-50 text-white"
      >
        <div className="w-[90%] max-w-[1200px] mx-auto ">
            <span className="message">{message}</span>
            <span className="icon"></span>
            </div>
      </div>
    );
};
export default Toast;
