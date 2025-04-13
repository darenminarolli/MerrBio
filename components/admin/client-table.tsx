"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

const clients = [
  {
    id: "C001",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    location: "New York, USA",
    orders: 12,
    status: "active",
    joinedDate: "Jan 5, 2023",
    avatar: "/placeholder.svg?height=40&width=40&query=client1",
    initials: "EW",
  },
  {
    id: "C002",
    name: "James Taylor",
    email: "james.taylor@example.com",
    location: "Illinois, USA",
    orders: 8,
    status: "active",
    joinedDate: "Feb 12, 2023",
    avatar: "/placeholder.svg?height=40&width=40&query=client2",
    initials: "JT",
  },
  {
    id: "C003",
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    location: "California, USA",
    orders: 24,
    status: "active",
    joinedDate: "Mar 3, 2023",
    avatar: "/placeholder.svg?height=40&width=40&query=client3",
    initials: "SM",
  },
  {
    id: "C004",
    name: "Michael Davis",
    email: "michael.davis@example.com",
    location: "Texas, USA",
    orders: 5,
    status: "inactive",
    joinedDate: "Apr 18, 2023",
    avatar: "/placeholder.svg?height=40&width=40&query=client4",
    initials: "MD",
  },
  {
    id: "C005",
    name: "Olivia Johnson",
    email: "olivia.johnson@example.com",
    location: "Florida, USA",
    orders: 15,
    status: "active",
    joinedDate: "May 22, 2023",
    avatar: "/placeholder.svg?height=40&width=40&query=client5",
    initials: "OJ",
  },
]

export function ProductsTable() {
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">
              <Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center gap-1">
                Client
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("location")} className="flex items-center gap-1">
                Location
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button variant="ghost" onClick={() => handleSort("orders")} className="flex items-center gap-1">
                Orders
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("status")} className="flex items-center gap-1">
                Status
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("joinedDate")} className="flex items-center gap-1">
                Joined Date
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                    <AvatarFallback>{client.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground">{client.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{client.location}</TableCell>
              <TableCell className="text-center">{client.orders}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    client.status === "active" ? "default" : client.status === "inactive" ? "destructive" : "outline"
                  }
                >
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell>{client.joinedDate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>View orders</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit client</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Suspend client</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
