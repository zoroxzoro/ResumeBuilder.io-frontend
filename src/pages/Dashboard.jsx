import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import AddResume from "./dashcomp/AddResume";
import ResumeCardItem from "./dashcomp/ResumeCardItem";
import axios from "axios";

function Dashboard() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const email = user?.primaryEmailAddress.emailAddress;

  const [resumeList, setResumeList] = useState([]);

  // Save the logged-in user to the database
  useEffect(() => {
    const saveUserToDB = async () => {
      try {
        const token = await getToken();

        await fetch(`${import.meta.env.VITE_SERVER}/user/create`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: email,
            name: `${user.firstName} ${user.lastName}`,
          }),
        });
      } catch (error) {
        console.error("Error saving user to the database:", error);
      }
    };

    if (user) saveUserToDB();
  }, [user, getToken]);

  // Fetch the resumes for the logged-in user
  const GetResumesList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/resume/user/${user.id}`
      );

      // Assuming the backend API sends resumes in `data.resumes`
      const { resumes } = response.data;
      resumes.forEach((resume) => {
        console.log(resume.resumeTitle); // Logs each resumeTitle
      });

      setResumeList(resumes || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    if (user) GetResumesList();
  }, [user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h1>Welcome, {user?.firstName}!</h1>
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>

      <div
        className="grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10
      "
      >
        <AddResume refreshData={GetResumesList} />

        {resumeList.length > 0
          ? resumeList.map((resume, index) => (
              <ResumeCardItem
                resume={resume}
                key={resume._id || index} // Use a unique ID if available
                refreshData={GetResumesList}
              />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
