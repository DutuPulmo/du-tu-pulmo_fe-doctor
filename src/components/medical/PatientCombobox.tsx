import * as React from "react"
import { Check, ChevronsUpDown, User, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { usePatients } from "@/hooks/use-patients"
import { useDebounce } from "@/hooks/use-debounce"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PatientComboboxProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}

export function PatientCombobox({
  value,
  onValueChange,
  placeholder = "Tìm và chọn bệnh nhân...",
}: PatientComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebounce(search, 300)

  const { data: patients, isLoading } = usePatients({
    page: 1,
    limit: 10,
    search: debouncedSearch || undefined,
  })

  // Tìm bệnh nhân đang được chọn để hiển thị label
  const selectedPatient = React.useMemo(() => {
    if (!value) return null
    return patients?.items.find((p) => p.id === value)
  }, [value, patients])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12 px-4 border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all"
        >
          <div className="flex items-center gap-3">
            {selectedPatient ? (
              <>
                <Avatar className="h-6 w-6 border border-blue-100">
                  <AvatarImage src={selectedPatient.user?.avatarUrl} />
                  <AvatarFallback className="bg-blue-50 text-blue-600 text-[10px]">
                    {selectedPatient.user?.fullName?.substring(0, 2).toUpperCase() || "BN"}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-900">
                  {selectedPatient.user?.fullName}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {selectedPatient.profileCode}
                </span>
              </>
            ) : (
              <>
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">{placeholder}</span>
              </>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Nhập tên hoặc số điện thoại..."
              value={search}
              onValueChange={setSearch}
              className="h-11 border-none focus:ring-0"
            />
          </div>
          <CommandList>
            <CommandEmpty>
              {isLoading ? (
                <div className="py-6 text-center text-sm text-gray-500">
                  Đang tìm kiếm...
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-sm text-gray-500">Không tìm thấy bệnh nhân</p>
                </div>
              )}
            </CommandEmpty>
            <CommandGroup>
              {patients?.items.map((patient) => (
                <CommandItem
                  key={patient.id}
                  value={patient.id}
                  onSelect={() => {
                    onValueChange(patient.id === value ? "" : patient.id)
                    setOpen(false)
                  }}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                >
                  <Avatar className="h-8 w-8 border border-gray-100">
                    <AvatarImage src={patient.user?.avatarUrl} />
                    <AvatarFallback className="bg-slate-100 text-slate-600">
                      {patient.user?.fullName?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="font-medium truncate">
                      {patient.user?.fullName}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="font-mono">{patient.profileCode}</span>
                      <span>•</span>
                      <span>{patient.user?.phone}</span>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === patient.id ? "opacity-100 text-blue-600" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
