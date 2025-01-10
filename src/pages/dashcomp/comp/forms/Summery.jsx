import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { AIChatSession } from "@/services/Ai";
import axios from "axios";
import { Brain, LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Summery = () => {
  const [summery, setSummery] = useState("");
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER}/resume/${params.id}`,
        resumeInfo
      );
      setLoading(false);
      toast.success("Resume Updated Successfully", { position: "top-center" });
    } catch (error) {
      console.log(error);
      toast("Something went wrong");
    }
  };
  const prompt = `give me a job description summery for resume as a ${
    resumeInfo?.jobTitle
  } in 5 to 6 lines the skills of that candidate have is ${resumeInfo?.skills
    .map((skill) => skill.name)
    .join(
      ", "
    )}, Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 5-6 lines in array format, With summery and experience_level Field in JSON Format `;

  const genarateSummeryFromAi = async () => {
    setLoading(true);

    const result = await AIChatSession.sendMessage(prompt);

    setAiGenerateSummeryList(JSON.parse(result.response.text()));
    setLoading(false);
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={genarateSummeryFromAi}
              className="border-primary text-primary flex gap-2"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Brain className="h-4 w-4" />
              )}
              {"Genarate from AI"}
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery || resumeInfo?.summery || ""}
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summery)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summery}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summery;
