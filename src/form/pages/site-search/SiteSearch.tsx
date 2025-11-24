import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import FormContext from "../../FormContext"
import { useContext } from "react"

export default function SiteSearch ({ sites }) {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    const { setSite, site } = useContext(FormContext)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="comobox"
                    aria-expanded={open}
                >{value === '' ? 'Select Site...' : value}</Button>
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