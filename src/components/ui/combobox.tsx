
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface ComboProps {
    items: Array<any>,
    idField?: string,
    labelField?: string,
    sustantivo?: string
}
export function Combobox({ items, idField, labelField, sustantivo }: ComboProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {/* <FormControl> */}
                <Button
                    variant="outline"
                    role="combobox"

                    aria-expanded={open}
                    className={cn(
                        "w-[200px] justify-between",
                        !value && "text-muted-foreground"
                    )}
                >
                    {value
                        ? items.find(
                            (item) => item[idField ?? "id"] === value
                        )[labelField ?? "name"]
                        : `Selecciona ${sustantivo ?? "un Elemento"}...`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
                {/* </FormControl> */}
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Selecciona ${sustantivo ?? "un Elemento"}...`} />
                    <CommandList aria-disabled={false}>
                        <CommandEmpty>No hay resultados.</CommandEmpty>
                        <CommandGroup aria-disabled={false}>
                            {items.map((item) => (
                                <CommandItem
                                    value={item[labelField ?? "name"]}
                                    key={item[idField ?? "id"]}
                                    onSelect={() => {
                                        setValue(item[idField ?? "id"]);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            item[idField ?? "id"] === value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {item[labelField ?? "name"]}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}