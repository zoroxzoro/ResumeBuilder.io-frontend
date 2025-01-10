import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Loader2, PlusSquare } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const [loading, setloading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const onCreateResume = async () => {
    try {
      setloading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/resume/create`,
        {
          userId: user.id,
          resumeTitle: resumeTitle,
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
        }
      );
      const id = res.data.resume._id;
      console.log(id);

      if (res) {
        setloading(false);
        navigate("/dashboard/resume/" + id + "/edit");
      }
      console.log(res);
    } catch (error) {
      console.error("Error creating resume:", error);
      setloading(false);
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border 
  items-center flex 
  justify-center bg-secondary
  rounded-lg h-[280px]
  hover:scale-105 transition-all hover:shadow-md
  cursor-pointer border-dashed"
        onClick={() => setopenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex.Full Stack resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button variant="ghost" onClick={() => setopenDialog(false)}>
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={onCreateResume}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
