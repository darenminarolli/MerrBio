import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    user: "John Doe",
    action: "added a new product",
    time: "2 minutes ago",
    avatar: "/vibrant-city-market.png",
    initials: "JD",
  },
  {
    user: "Sarah Smith",
    action: "registered as a new farmer",
    time: "1 hour ago",
    avatar: "/diverse-group-brainstorming.png",
    initials: "SS",
  },
  {
    user: "Michael Brown",
    action: "placed an order",
    time: "3 hours ago",
    avatar: "/diverse-group-brainstorming.png",
    initials: "MB",
  },
  {
    user: "Emily Johnson",
    action: "updated their profile",
    time: "5 hours ago",
    avatar: "/diverse-group-celebrating.png",
    initials: "EJ",
  },
  {
    user: "David Wilson",
    action: "left a review",
    time: "1 day ago",
    avatar: "/placeholder.svg?height=32&width=32&query=user5",
    initials: "DW",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
            <AvatarFallback>{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user} <span className="text-muted-foreground">{activity.action}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
