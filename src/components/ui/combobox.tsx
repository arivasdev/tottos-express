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
    id: string;
    name: string;
    [key: string]: any;
}

interface ComboProps {
    items: Array<Item>;
    idField?: string;
    labelField?: string;
    sustantivo?: string;
    onSelect?: (item: any) => void;
}

export function Combobox({ items, idField = "id", labelField = "name", sustantivo = "un Elemento",onSelect }: ComboProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const selectedItem = items.find((item) => item[idField] === value);
    const displayValue = selectedItem ? selectedItem[labelField] : `Selecciona ${sustantivo}...`;

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    aria-expanded={open}
                    className={cn(
                        "w-[200px] justify-between",
                        !value && "text-muted-foreground"
                    )}
                >
                    {displayValue}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Selecciona ${sustantivo}...`} />
                    <CommandList>
                        <CommandEmpty>No hay resultados.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    value={item[labelField]}
                                    key={item[idField]}
                                    onSelect={() => {
                                        onSelect && onSelect({target : {name: idField, value: item[idField]}});
                                        setValue(item[idField]);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            item[idField] === value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {item[labelField]}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}