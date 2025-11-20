

export default function Form () {

    return (
        
        <div className="bg-gray-100 w-fit p-5 rounded">

            <div className="flex flex-col gap-3 py-2">
                <p className="text-center">Canary Wharf Medical Centre</p>
                <div className="flex gap-5 justify-between">
                    <p>Anne Weyer</p>
                    <p>3 Affinions</p>
                </div>
                <div className="flex gap-5 justify-between">
                    <p>HBA1c: LOT123456</p>
                    <p>Lipids: LOT23456</p>
                </div>
                <p className="text-red-400 text-sm">This Affinion needs to be calibrated: Affinion 1</p>
            </div>

            <div className="py-2 flex flex-col gap-5">
                <p>Dropdown for picking Affinion </p>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">HBA1c</p>
                        <div className="flex gap-5">
                            <div>
                                <div className="flex gap-5 justify-between">
                                    <p>C1</p>
                                    <p>42 - 60</p>
                                </div>
                                <input placeholder="..." className="border-solid border-2 rounded w-full"/>
                            </div>
                            <div>
                                <div className="flex gap-5 justify-between">
                                    <p>C2</p>
                                    <p>60 - 72</p>
                                </div>
                                <input placeholder="..." className="border-solid border-2 rounded w-full"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">Lipids</p>
                        <div>
                            <p>Total Cholesterol</p>
                            <div className="flex gap-5">
                                <div>
                                    <div className="flex gap-5 justify-between">
                                        <p>C1</p>
                                        <p>3.2 - 4.8</p>
                                    </div>
                                    <input placeholder="..." className="border-solid border-2 rounded w-full"/>
                                </div>
                                <div>
                                    <div className="flex gap-5 justify-between">
                                        <p>C2</p>
                                        <p>3.2 - 4.8</p>
                                    </div>
                                    <input placeholder="..." className="border-solid border-2 rounded w-full"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>HDL Cholesterol</p>
                            <div className="flex gap-5">
                                <div>
                                    <div className="flex gap-5 justify-between">
                                        <p>C1</p>
                                        <p>3.2 - 4.8</p>
                                    </div>
                                    <input placeholder="..." className="border-solid border-2 rounded w-full"/>
                                </div>
                                <div>
                                    <div className="flex gap-5 justify-between">
                                        <p>C2</p>
                                        <p>3.2 - 4.8</p>
                                    </div>
                                    <input placeholder="..." className="border-solid border-2 rounded w-full"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Triglycerides</p>
                            <div className="flex gap-5">
                                <div>
                                    <div className="flex gap-5 justify-between">
                                        <p>C1</p>
                                        <p>3.2 - 4.8</p>
                                    </div>
                                    <input placeholder="..." className="border-solid border-2 rounded w-full"/>
                                </div>
                                <div>
                                    <div className="flex gap-5 justify-between">
                                        <p>C2</p>
                                        <p>3.2 - 4.8</p>
                                    </div>
                                    <input placeholder="..." className="border-solid border-2 rounded w-full"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}