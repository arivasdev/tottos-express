import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface Item {
    label: string;
    value: string;
}

interface ComboProps {
    items: Item[];
    idField?: string;
    labelField?: string;
    sustantivo?: string;
    onSelect?: (item: any) => void;
    className?: string;
    defaultValue?: string; // Propiedad opcional para react-hook-form
}

export function Combobox({ items, sustantivo = "un elemento", onSelect, className = '', defaultValue }: ComboProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(defaultValue);

    React.useEffect (() => {
        if(defaultValue && !value) {
            const item = items.find((item) => item.value === defaultValue);
            if(item) {
                setValue(item.value);
            }
        }
    }, [defaultValue]);

    const displayValue = value ? items.find((item) => item.value === value)?.label : "Seleccione un elemento...";

    if(items.length === 0) {
        return <div className="text-muted-foreground">No hay elementos para seleccionar</div>
    }

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    aria-expanded={open}
                    role="combobox"
                    className={cn(
                        "w-100 justify-between",
                        !value && "text-muted-foreground"
                    )}
                
                >
                    {displayValue}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={`w-full p-0 ${className}`}>
                <Command>
                    <CommandInput placeholder={`Selecciona ${sustantivo}...`} className="h-9" />
                    <CommandList>
                        <CommandEmpty>No hay resultados.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    value={item.value}
                                    key={item.value}
                                    onSelect={(currentValue) => {
                                        onSelect && onSelect(
                                            currentValue === value ? '' : items.find((item) => item.value === currentValue)
                                        )
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)

                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            item.value === value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}