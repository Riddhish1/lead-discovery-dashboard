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
    <header className="fixed top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-6">
        {/* Logo */}
        <div className="flex items-center mr-45">
          <img 
            src="/logo.png" 
            alt="JSW Logo" 
            className="h-10 w-auto"
          />
        </div>

        {/* Navigation Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex"
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
        <div className="flex items-center gap-3 ml-auto">
          {/* Search Bar */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="SEARCH"
              className="w-full pl-9 bg-gray-50 border-gray-200 placeholder:text-gray-500 placeholder:text-xs placeholder:font-medium h-9"
            />
          </div>

          

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell className="h-8 w-8 text-gray-600" />
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
          <div className="w-px h-6 bg-gray-300 mx-1"></div>


          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 px-2 h-auto py-2"
              >
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold leading-tight text-gray-900">Ramesh Sahay</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide leading-tight font-medium">
                    HEAD OF GOV T/PSU FLAT SALES-CENTRAL
                  </span>
                </div>
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm font-bold">
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
