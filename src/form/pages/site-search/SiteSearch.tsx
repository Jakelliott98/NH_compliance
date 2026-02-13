import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import type { SiteDatabaseType } from "@/types/site"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface SiteSearchProps {
    sites: SiteDatabaseType[],
    setActiveSite: React.Dispatch<React.SetStateAction<SiteDatabaseType | null>>
}

export default function SiteSearch ({ sites, setActiveSite }: SiteSearchProps) {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    const buttonPlaceholder = (
        <div className="w-full flex items-center justify-between">
            <p className="text-neutral-light">Select a site to continue... </p>
            <FontAwesomeIcon icon={ faCaretDown } className="text-neutral-light"/>
        </div>
    )

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="comobox"
                    aria-expanded={open}
                    className="w-full cursor-pointer"
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
                                                setOpen(false)
                                                setActiveSite(site)
                                            }}
                                            className="cursor-pointer"
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