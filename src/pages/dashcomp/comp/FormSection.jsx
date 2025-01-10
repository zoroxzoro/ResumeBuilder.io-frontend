import { Button } from "@/components/ui/button";

import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Skills from "./forms/Skills";
import Education from "./forms/Education";
import Experience from "./forms/Experience";
import Summery from "./forms/Summery";
import PersonalDetail from "./forms/PersonalDetail";
import { useState } from "react";
import ThemeColor from "./ThemeEditor";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const resumeId = useParams().id;
  console.log(resumeId);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              {" "}
              <ArrowLeft />{" "}
            </Button>
          )}
          <Button
            className="flex gap-2"
            size="sm"
            disabled={!enableNext}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            {" "}
            Next
            <ArrowRight />{" "}
          </Button>
        </div>
      </div>
      {/* Personal Detail  */}
      {activeFormIndex == 1 ? (
        <PersonalDetail enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summery />
      ) : activeFormIndex == 3 ? (
        <Experience />
      ) : activeFormIndex == 4 ? (
        <Education />
      ) : activeFormIndex == 5 ? (
        <Skills />
      ) : activeFormIndex == 6 ? (
        <Navigate to={"/myresume/" + resumeId + "/view"} />
      ) : null}

      {/* Experience  */}

      {/* Educational Detail  */}

      {/* Skills  */}
    </div>
  );
};

export default FormSection;
