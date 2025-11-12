import { useReducer } from "react";

interface ResultState {
    sites: {
        data: Array<object>,
        loading: boolean, 
        errors: boolean,
    }
    regions: {
        data: Array<object>,
        loading: boolean, 
        errors: boolean,
    }
}

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

    function setSites(sites) {
        dispatch({
            type: 'SET_SITES',
            value: sites, 
        })
    }

    function setRegions(regions) {
        dispatch({
            type: 'SET_REGIONS',
            value: regions,
        })
    }

    return {complianceData, setSites, setRegions};

}

function reducer(state, action) {

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