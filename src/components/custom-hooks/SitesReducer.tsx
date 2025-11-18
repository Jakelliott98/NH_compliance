import { useReducer } from "react";
import type { SiteData } from "../../types/site";
import type { RegionData } from "../../types/region";

export interface ResultState {
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

type Action = 
    | { type: "SET_SITES", value: SiteData[] }
    | { type: "SET_REGIONS", value: RegionData[] }

const initializer: ResultState = {
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

    function setSites(sites: SiteData[]) {
        dispatch({
            type: 'SET_SITES',
            value: sites, 
        })
    }

    function setRegions(regions: RegionData[]) {
        dispatch({
            type: 'SET_REGIONS',
            value: regions,
        })
    }

    return {complianceData, setSites, setRegions};

}

function reducer(state: ResultState, action: Action) {

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