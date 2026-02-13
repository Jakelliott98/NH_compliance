import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshakeSlash } from "@fortawesome/free-solid-svg-icons";
import AddSiteContainer from "../AddSite";

export default function NoSites () {

    return (
        <div className="flex flex-col items-center justify-center p-20 gap-2">
                <FontAwesomeIcon icon={faHandshakeSlash} className="text-5xl text-neutral-light"/>
                <h2 className="font-semibold text-xl text-neutral-light">Oops! No sites can be found...</h2>
                <p className="text sm text-neutral-light">There is nothing here to view right now, please add sites.</p>
                <AddSiteContainer />
        </div>
    )
}

