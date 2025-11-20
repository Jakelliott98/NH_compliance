import type { SiteData } from "./site"
import type { RegionData } from "./region"


export interface ResultStateType{
    sites: {
        data: Array<SiteData>,
        loading: boolean, 
        errors: boolean,
    }
    regions: {
        data: Array<RegionData>,
        loading: boolean, 
        errors: boolean,
    }
}