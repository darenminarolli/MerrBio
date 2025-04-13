"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    farmers: 12,
    clients: 45,
    products: 78,
  },
  {
    name: "Feb",
    farmers: 18,
    clients: 52,
    products: 85,
  },
  {
    name: "Mar",
    farmers: 23,
    clients: 64,
    products: 102,
  },
  {
    name: "Apr",
    farmers: 29,
    clients: 78,
    products: 120,
  },
  {
    name: "May",
    farmers: 35,
    clients: 89,
    products: 136,
  },
  {
    name: "Jun",
    farmers: 42,
    clients: 105,
    products: 148,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="farmers" fill="#4ade80" radius={[4, 4, 0, 0]} />
        <Bar dataKey="clients" fill="#a78bfa" radius={[4, 4, 0, 0]} />
        <Bar dataKey="products" fill="#fb923c" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
