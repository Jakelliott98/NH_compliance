import { createContext } from "react";
import type { SiteData } from "@/types/site";

interface FormContextType {
    site: SiteData | null, 
    setSite: React.Dispatch<React.SetStateAction<SiteData | null>>,
}

const FormContext = createContext<FormContextType | null>(null)

export default FormContext;