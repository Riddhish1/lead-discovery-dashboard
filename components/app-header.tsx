"use client"

import * as React from "react"
import { Bell, Search } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppHeader() {
  const [activeTab, setActiveTab] = React.useState("tender-discovery")

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-6 mr-4 md:mr-6">
          <div className="flex items-center">
            <svg
              viewBox="0 0 150 40"
              className="h-8 w-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Red triangle/arrow */}
              <path
                d="M5 20 L22 4 L22 36 Z"
                fill="#dc2626"
              />
              {/* Blue triangle */}
              <path
                d="M28 4 L45 20 L28 36 Z"
                fill="#2563eb"
              />
              {/* JSW Text */}
              <text
                x="52"
                y="28"
                style={{ fontSize: '24px', fontWeight: 'bold', fill: '#1e293b' }}
              >
                JSW
              </text>
            </svg>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="hidden md:flex"
        >
          <TabsList variant="default">
            <TabsTrigger value="tender-discovery">
              Tender Discovery
            </TabsTrigger>
            <TabsTrigger value="tender-wins">
              Tender Wins
            </TabsTrigger>
            <TabsTrigger value="private-news">
              Private News
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Search Bar */}
          <div className="hidden lg:block">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 bg-muted/50"
              />
            </div>
          </div>

          {/* Separator after search */}
          <Separator orientation="vertical" className="h-8 hidden lg:block" />

          {/* Mobile Search */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">New tender opportunity</p>
                  <p className="text-xs text-muted-foreground">
                    2 hours ago
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Separator */}
          <Separator orientation="vertical" className="h-8" />

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 h-auto py-1.5"
              >
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium leading-tight">Ramesh Sahay</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide leading-tight">
                    HEAD OF GOVT/PSU FLAT SALES - CENTRAL
                  </span>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
                    RS
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
