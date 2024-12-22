import React from "react";
import Course from "./Course";
import CardSkeleton from "./CardSkeleton";

const MyLearning = () => { 
  const [myLearning, setMyLearning] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMyLearning = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/learner/myLearning", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setMyLearning(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching my learning:", error);
        setIsLoading(false);
      }
    };
    fetchMyLearning();

    // Simulate loading delay for development
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-24 mb-4">
      <div className="flex justify-center mb-8">
        <div className="text-3xl font-robert-medium text-gray-950">My Learning</div>
      </div>
      
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardSkeleton className="w-full h-36"/>
                <div className="px-5 py-4 space-y-3">
                  <CardSkeleton className="w-3/4 h-6"/>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardSkeleton className="w-6 h-6 rounded-full"/>
                      <CardSkeleton className="w-20 h-4"/>
                    </div>
                    <CardSkeleton className="w-16 h-4"/>
                  </div>
                  <CardSkeleton className="w-1/4 h-4"/>
                </div>
              </div>
            ))}
          </div>
        ) : myLearning.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-robert-medium text-gray-600">
              You have not enrolled in any courses yet
            </h3>
            <p className="mt-2 text-gray-500">
              Explore our courses and start your learning journey
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myLearning.map((course, index) => (
              <Course 
                key={index} 
                {...course} // Spread the course data as props
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
