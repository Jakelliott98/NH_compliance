import { createContext } from "react";
import type { FetchState } from "../custom-hooks/useFetchData";
import type { CalibrationType } from "@/types/calibration";
import type { AffinionCardType } from "@/types/affinion";

interface SiteFormContextType {
    affinions: FetchState<AffinionCardType>,
    controls: FetchState<CalibrationType>,
}

const SiteFormContext = createContext< SiteFormContextType | null>(null);

export default SiteFormContext;