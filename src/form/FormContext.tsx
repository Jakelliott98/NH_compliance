import { createContext } from "react";
import type { SiteData } from "@/types/site";

interface FormContextType {
    site: SiteData, 
    setSite: React.Dispatch<React.SetStateAction<SiteData>>,
}

const FormContext = createContext<FormContextType | null>(null)

export default FormContext;