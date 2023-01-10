import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./skeleton.css";

const HomeSkeleton = () => {
  return (
    <div className="homeSkeletonContainer">
      <div className="asideSkeletonContainer">
        <Skeleton className="asideSkeleton" width={320} />
      </div>
      <div className="contentSkeletonContainer">
        <Skeleton className="titleSkeleton" width={906} />

        <Skeleton className="contentSkeleton" width={906} />
      </div>
    </div>
  );
};

export default HomeSkeleton;
