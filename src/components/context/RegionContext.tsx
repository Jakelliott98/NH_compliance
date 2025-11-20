import { createContext } from "react";
import type { ResultStateType } from "../../types/dataTypes";

interface ContextType{
    complianceData: ResultStateType,
}

const RegionContext = createContext<ContextType | undefined>(undefined);

export default RegionContext;