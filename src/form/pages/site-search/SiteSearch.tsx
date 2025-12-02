import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import FormContext from "../../context/FormContext"
import { useContext } from "react"
import type { SiteData } from "@/types/site"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface SiteSearchProps {
    sites: Array<SiteData>,
    setActiveSite: React.Dispatch<React.SetStateAction<string>>
}

export default function SiteSearch ({ sites, setActiveSite }: SiteSearchProps) {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    const context = useContext(FormContext)

    if (context === null) {
        throw new Error('FormContext has to be used within <FormContext.Provider>')
    }

    const { setSite } = context;

    const buttonPlaceholder = (
        <div className="flex w-full items-center justify-between">
            <p>Select Site... </p>
            <FontAwesomeIcon icon={ faCaretDown }/>
        </div>
    )

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="comobox"
                    aria-expanded={open}
                    className="flex-1"
                >
                    {value === '' ? buttonPlaceholder : value}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandInput placeholder="Select Site..."/>
                    <CommandList>
                        <CommandEmpty>No site found.</CommandEmpty>
                        <CommandGroup>
                            {
                                sites.map((site) => {
                                    return (
                                        <CommandItem
                                            key={site.site_id}
                                            value={site.site_name}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? '' : currentValue)
                                                setSite(site)
                                                setOpen(false)
                                                setActiveSite(site.slug)
                                            }}
                                        >
                                            { site.site_name }
                                        </CommandItem>
                                    )
                                })
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}