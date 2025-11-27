import { useReducer } from "react";
import type { SiteData } from "../../types/site";
import type { RegionData } from "../../types/region";
import type { ResultStateType } from "../../types/dataTypes";

type Action = 
    | { type: "SET_SITES", value: SiteData[] }
    | { type: "SET_REGIONS", value: RegionData[] }

const initializer: ResultStateType = {
    sites: {
        data: [],
        loading: true,
        errors: false,
    },
    regions: {
        data: [],
        loading: true,
        errors: false,
    }
};

export default function SitesReducer() {

    const [complianceData, dispatch] = useReducer(reducer, initializer)

    function setSites(sites: SiteData[]): void {
        dispatch({
            type: 'SET_SITES',
            value: sites, 
        })
    }

    function setRegions(regions: RegionData[]): void {
        dispatch({
            type: 'SET_REGIONS',
            value: regions,
        })
    }

    return {complianceData, setSites, setRegions};

}

function reducer(state: ResultStateType, action: Action) {

    switch (action.type) {
        
        case 'SET_SITES': {
            return {
                ...state,
                sites: {
                    ...state.sites,
                    data: action.value,
                    loading: false,
                }
            }
        }

        case 'SET_REGIONS': {
            return {
                ...state,
                regions: {
                    ...state.regions,
                    data: action.value,
                    loading: false,
                }
            }
        }

    }

}