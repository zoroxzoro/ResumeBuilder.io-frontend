import Header from "../../../costumeComps/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/pages/dashcomp/comp/ResumePreview";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState(null);
  const { resumeId } = useParams();

  // Loading state for the resume
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_URL;
  useEffect(() => {
    GetResumeInfo();
  }, [resumeId]);

  const GetResumeInfo = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER}/resume/${resumeId}`
      );
      console.log(res.data.resume);
      setResumeInfo(res.data.resume);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching resume data:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  const HandleDownload = () => {
    // Make sure resume data is available before triggering print
    if (resumeInfo) {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl">Loading your resume...</h2>
      </div>
    );
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume, and you can share the
            unique resume URL with your friends and family.
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Check out my resume",
                url: `${url}/myresume/${resumeId}/view`,
                title: resumeInfo?.firstName + " " + resumeInfo?.lastName,
              }}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
