import { useContext, useState } from "react"
import FormContext from "@/form/FormContext"

export default function CalibrationForm () {

    const [selectedFluid, setSelectedFluid] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <div className="bg-gray-100 w-full p-5 rounded flex flex-col items-center">
            <CalibrationHeader />
            {
                !isFormOpen ? <CalibrationSection setSelectedFluid={setSelectedFluid} setIsFormOpen={setIsFormOpen}/> : <CalibrationFormInput selectedFluid={selectedFluid}/>
            }
        </div>
    )
}

function CalibrationHeader () {
    const { site } = useContext(FormContext)

    return (
        <div className="flex flex-col gap-3 py-2 w-fit">
            <p className="text-center font-bold">{site.site_name}</p>
            <div className="flex gap-5 justify-center">
                <p>{site.team_leader}</p>
            </div>
            <div className="flex gap-5 justify-between">
                <div>
                    <p>HBA1c</p>
                    <p>LOT3456784</p>
                    <p>Expires:</p>
                </div>
                <div>
                    <p>Lipids</p>
                    <p>LOT3456784</p>
                    <p>Expires:</p>
                </div>
            </div>
        </div>
    )
}

function CalibrationSection ({ setSelectedFluid, setIsFormOpen }) {
    return (
        <div>
            <p>Which calibration are you updating?</p>
            <div className="flex gap-5">
                <div className="p-4 bg-red-200 rounded flex-1 cursor-pointer" 
                    onClick={() => {
                        setSelectedFluid('hba1c')
                        setIsFormOpen(true)
                    }}
                >
                    <p className="text-center font-bold text-red-900">HBA1C</p>
                </div>
                <div className="p-4 bg-yellow-200 rounded flex-1 cursor-pointer"
                    onClick={() => {
                        setSelectedFluid('lipids')
                        setIsFormOpen(true)
                    }}
                >
                    <p className="text-center font-bold text-yellow-900">Lipids</p>
                </div>
            </div>
        </div>
    )
}

function CalibrationFormInput ({ selectedFluid }) {

    return (
        <form className="bg-white p-4 rounded flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <label>Lot Number</label>
                <input className="outline rounded"/>
            </div>
            <div className="flex flex-col gap-1">
                <label>Expiry Date</label>
                <input className="outline rounded"/>
            </div>
            { selectedFluid === 'hba1c' ? <HBA1cForm /> : <LipidsForm /> }
            <button className="rounded p-2 bg-green-300 w-full">Submit</button>
        </form>
    )
}

function HBA1cForm () {

    return (
        <div className="flex flex-col">
            <p className="font-bold">HBA1c</p>
            <div className="flex gap-2 justify-center items-center">
                <p className="font-bold">C1</p>
                <div className="flex flex-col">
                    <label>Lower</label>
                    <input className="outline rounded"/>
                </div>
                <div className="flex flex-col">
                    <label>Upper</label>
                    <input className="outline rounded"/>
                </div>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <p className="font-bold">C2</p>
                <div className="flex flex-col">
                    <label>Lower</label>
                    <input className="outline rounded"/>
                </div>
                <div className="flex flex-col">
                    <label>Upper</label>
                    <input className="outline rounded"/>
                </div>
            </div>
        </div>
    )
}

function LipidsForm () {

    return (
        <div className="flex flex-col">
            <p className="font-bold">Lipids</p>
            <div>
                <p className="font-bold">C1</p>
                <div className="flex items-center gap-1">
                    <p>Total Cholesterol</p>
                    <div className="flex flex-col">
                        <label>Lower</label>
                        <input className="outline rounded"/>
                    </div>
                    <div className="flex flex-col">
                        <label>Upper</label>
                        <input className="outline rounded"/>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <p>HDL Cholesterol</p>
                    <div className="flex flex-col">
                        <label>Lower</label>
                        <input className="outline rounded"/>
                    </div>
                    <div className="flex flex-col">
                        <label>Upper</label>
                        <input className="outline rounded"/>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <p>Triglycerides</p>
                    <div className="flex flex-col">
                        <label>Lower</label>
                        <input className="outline rounded"/>
                    </div>
                    <div className="flex flex-col">
                        <label>Upper</label>
                        <input className="outline rounded"/>
                    </div>
                </div>
                <div>
                    <p className="font-bold">C2</p>
                </div>
            </div>
        </div>   
    )
}