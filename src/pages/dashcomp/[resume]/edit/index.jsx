import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../comp/FormSection";
import ResumePreview from "../../comp/ResumePreview";
import Dummy from "@/data/Dummy";
import axios from "axios";

const EditResume = () => {
  const params = useParams();

  const [resumeInfo, setResumeInfo] = useState();
  useEffect(() => {
    setResumeInfo(Dummy);
    getResumeInfo();
  }, []);
  const getResumeInfo = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/resume/${params.id}`
    );
    console.log(res.data.resume);
    setResumeInfo(res.data.resume);
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section  */}
        <FormSection />
        {/* Preview Section  */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
