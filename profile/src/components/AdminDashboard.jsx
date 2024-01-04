import React from "react";
import Sidebar from "./Sidebar";
import DashCards from "./DashCards";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {

  const { role } = useSelector((state) => state.user);

  const navigate=useNavigate();
  const toStudentData=()=>{
    navigate(`/${role}/allstudents`);
  }
  return (
    <>
      <div className="mt-10 h-auto md:h-screen flex justify-center items-center">
        <div className="w-11/12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <figure onClick={toStudentData} className="flex flex-col items-center justify-center p-8 text-center border-b border-r border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:border-gray-700">
              {/* Content for the first figure */}
              <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Very easy this was to integrate
                </h3>
                <p class="my-4">
                  If you care for your time, I hands down would go with this."
                </p>
              </blockquote>
              <figcaption class="flex items-center justify-center ">
                <img
                  class="rounded-full w-9 h-9"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                  alt="profile picture"
                />
                <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <div>Bonnie Green</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 ">
                    Developer at Open AI
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure onClick={toStudentData} className="flex flex-col items-center justify-center p-8 text-center border-b border-r border-gray-200 dark:border-gray-700">
              {/* Content for the second figure */}
              <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Solid foundation for any project
                </h3>
                <p class="my-4">
                  Designing with Figma components that can be easily translated
                  to the utility classes of Tailwind CSS is a huge timesaver!"
                </p>
              </blockquote>
              <figcaption class="flex items-center justify-center ">
                <img
                  class="rounded-full w-9 h-9"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                  alt="profile picture"
                />
                <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <div>Roberta Casas</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Lead designer at Dropbox
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center justify-center p-8 text-center border-b border-r border-gray-200 md:rounded-se-lg dark:border-gray-700">
              {/* Content for the third figure */}
              <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Mindblowing workflow
                </h3>
                <p class="my-4">
                  Aesthetically, the well designed components are beautiful and
                  will undoubtedly level up your next application."
                </p>
              </blockquote>
              <figcaption class="flex items-center justify-center ">
                <img
                  class="rounded-full w-9 h-9"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                  alt="profile picture"
                />
                <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <div>Jese Leos</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Software Engineer at Facebook
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center justify-center p-8 text-center border-b border-gray-200 rounded-b-lg md:rounded-se-lg dark:border-gray-700">
              {/* Content for the fourth figure */}
              <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Efficient Collaborating
                </h3>
                <p class="my-4">
                  You have many examples that can be used to create a fast
                  prototype for your team."
                </p>
              </blockquote>
              <figcaption class="flex items-center justify-center ">
                <img
                  class="rounded-full w-9 h-9"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                  alt="profile picture"
                />
                <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <div>Joseph McFall</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    CTO at Google
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;