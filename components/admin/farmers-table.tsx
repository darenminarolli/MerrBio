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

// Sample data
const farmers = [
  {
    id: "F001",
    name: "John Smith",
    email: "john.smith@example.com",
    location: "California, USA",
    products: 24,
    status: "active",
    joinedDate: "Jan 12, 2023",
    avatar: "/placeholder.svg?height=40&width=40&query=farmer1",
    initials: "JS",
  },
  {
    id: "F002",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    location: "Texas, USA",
    products: 18,
    status: "active",
    joinedDate: "Feb 3, 2023",
    avatar: "/placeholder.svg?height=40&width=40&query=farmer2",
    initials: "MG",
  },
  {
    id: "F003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    location: "Oregon, USA",
    products: 32,
    status: "active",
    joinedDate: "Mar 15, 2023",
    avatar: "/placeholder.svg?height=40&width=40&query=farmer3",
    initials: "RJ",
  },
  {
    id: "F004",
    name: "Lisa Brown",
    email: "lisa.brown@example.com",
    location: "Washington, USA",
    products: 12,
    status: "inactive",
    joinedDate: "Apr 22, 2023",
    avatar: "/placeholder.svg?height=40&width=40&query=farmer4",
    initials: "LB",
  },
  {
    id: "F005",
    name: "David Wilson",
    email: "david.wilson@example.com",
    location: "Florida, USA",
    products: 8,
    status: "pending",
    joinedDate: "May 7, 2023",
    avatar: "/placeholder.svg?height=40&width=40&query=farmer5",
    initials: "DW",
  },
]

export function FarmersTable() {
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
                Farmer
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
              <Button variant="ghost" onClick={() => handleSort("products")} className="flex items-center gap-1">
                Products
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
          {farmers.map((farmer) => (
            <TableRow key={farmer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={farmer.avatar || "/placeholder.svg"} alt={farmer.name} />
                    <AvatarFallback>{farmer.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{farmer.name}</div>
                    <div className="text-sm text-muted-foreground">{farmer.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{farmer.location}</TableCell>
              <TableCell className="text-center">{farmer.products}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    farmer.status === "active" ? "default" : farmer.status === "inactive" ? "destructive" : "outline"
                  }
                >
                  {farmer.status}
                </Badge>
              </TableCell>
              <TableCell>{farmer.joinedDate}</TableCell>
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
                    <DropdownMenuItem>View products</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit farmer</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Suspend farmer</DropdownMenuItem>
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
