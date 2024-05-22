"use client";
import { BallTriangle } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="loader">
      <BallTriangle color="#3B82F6" height={150} width={150}>
        loading...
      </BallTriangle>
    </div>
  );
};
export default Loading;
