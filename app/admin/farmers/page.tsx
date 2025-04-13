import { FarmersTable } from "@/components/admin/farmers-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

export default function FarmersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farmers</h1>
          <p className="text-muted-foreground">Manage all farmers registered on the platform</p>
        </div>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Farmer
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search farmers..." className="pl-8 w-full" />
        </div>
      </div>

      <FarmersTable />
    </div>
  )
}
