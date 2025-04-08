import { ResumeValues } from "./validation";

export interface EditorFormProps {
  resumeDt: ResumeValues;
  setResumeDt: (data: ResumeValues) => void;
}
