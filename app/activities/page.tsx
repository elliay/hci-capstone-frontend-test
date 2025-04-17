"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Info, ArrowRight, ChevronDown, Filter } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

// Define activity type
interface Activity {
  id: string
  title: string
  description: string
  category: "Art" | "Music" | "Math" | "Social"
  trainingHours: string
  daysAgo?: string
  by?: string
  icon: string
}

export default function ActivitiesPage() {
  // Initial activities data
  const [suggestedActivities, setSuggestedActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Counting Numbers",
      description: "Basic counting from 1-100",
      category: "Math",
      trainingHours: "Time: 2 hrs",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      title: "Calculating for Change",
      description: "Day-to-day interaction with money",
      category: "Math",
      trainingHours: "Time: 30 mins",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      title: "Color & Painting",
      description: "Understand the different colors",
      category: "Art",
      trainingHours: "Time: 2 hrs",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      title: "Music Genres",
      description: "Understand the different genres",
      category: "Music",
      trainingHours: "Time: 1 hr",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [recentActivities, setRecentActivities] = useState<Activity[]>([
    {
      id: "5",
      title: "Counting Numbers",
      description: "",
      category: "Math",
      trainingHours: "Time: 20 mins",
      daysAgo: "2d ago",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      title: "Color & Painting",
      description: "",
      category: "Art",
      trainingHours: "Time: 2 hrs",
      daysAgo: "4d ago",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "7",
      title: "Music Genres",
      description: "",
      category: "Music",
      trainingHours: "Time: 1 hrs",
      daysAgo: "8d ago",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "8",
      title: "Trader Joe's Volunteering",
      description: "",
      category: "Social",
      trainingHours: "Time: 1 hr",
      daysAgo: "9d ago",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "9",
      title: "News Reading",
      description: "",
      category: "Social",
      trainingHours: "Time: 1 hr",
      daysAgo: "12d ago",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ])

  // All activities data (for the filterable section)
  const [allActivities, setAllActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Counting Numbers",
      description: "Basic counting from 1-100",
      category: "Math",
      trainingHours: "Training Hours: 20-25 hrs",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      title: "Calculating for Change",
      description: "Day-to-day interaction with money",
      category: "Math",
      trainingHours: "Training Hours: 40 hrs",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      title: "Color & Painting",
      description: "Understand the different colors",
      category: "Art",
      trainingHours: "Training Hours: 30 hrs",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      title: "Music Genres",
      description: "Understand the different genres",
      category: "Music",
      trainingHours: "Training Hours: 35 hrs",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "10",
      title: "Social Interaction",
      description: "Practice everyday social skills",
      category: "Social",
      trainingHours: "Training Hours: 45 hrs",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "11",
      title: "Drawing Basics",
      description: "Learn fundamental drawing techniques",
      category: "Art",
      trainingHours: "Training Hours: 25 hrs",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "12",
      title: "Rhythm & Beat",
      description: "Understanding musical rhythm",
      category: "Music",
      trainingHours: "Training Hours: 20 hrs",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "13",
      title: "Basic Addition",
      description: "Adding numbers up to 100",
      category: "Math",
      trainingHours: "Training Hours: 15 hrs",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "14",
      title: "Group Conversation",
      description: "Practicing group discussion skills",
      category: "Social",
      trainingHours: "Training Hours: 30 hrs",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ])

  // State for active filter
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Filter all activities by category
  const filteredActivities = activeFilter
    ? allActivities.filter((activity) => activity.category === activeFilter)
    : allActivities

  // Function to handle filter click
  const handleFilterClick = (category: string) => {
    if (activeFilter === category) {
      setActiveFilter(null) // Toggle off if already active
    } else {
      setActiveFilter(category)
    }
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Art":
        return "bg-[#FF5733]"
      case "Music":
        return "bg-[#4318FF]"
      case "Math":
        return "bg-[#23FBC5]"
      case "Social":
        return "bg-[#63B7E6]"
      default:
        return "bg-gray-400"
    }
  }

  // Get icon background color
  const getIconBgColor = (category: string) => {
    switch (category) {
      case "Art":
        return "bg-gradient-to-br from-orange-300 to-red-400"
      case "Music":
        return "bg-gradient-to-br from-indigo-300 to-purple-500"
      case "Math":
        return "bg-gradient-to-br from-green-300 to-teal-500"
      case "Social":
        return "bg-gradient-to-br from-blue-300 to-cyan-500"
      default:
        return "bg-gradient-to-br from-gray-300 to-gray-500"
    }
  }

  return (
    <div className="flex h-screen bg-[#edf8ff]">
      {/* Sidebar Component */}
      <Sidebar activePage="activities" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="text-sm text-[#707eae] mb-1">
                <span>Pages / Activities</span>
              </div>
              <h1 className="text-3xl font-bold text-[#2b3674]">Activities</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8f9bba] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 rounded-full bg-white border border-[#e0e5f2] w-64 focus:outline-none focus:ring-2 focus:ring-[#4318ff] focus:border-transparent"
                />
              </div>
              <button className="w-10 h-10 rounded-full bg-white border border-[#e0e5f2] flex items-center justify-center">
                <Info className="w-5 h-5 text-[#8f9bba]" />
              </button>
            </div>
          </div>

          {/* Top Row: Suggested and Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Suggested Activities Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#2b3674]">Suggested Activities</h2>
                <div className="flex items-center text-[#707eae]">
                  <span className="mr-2">Interest Level</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-4">
                {suggestedActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between bg-[#f4f7fe] rounded-xl p-4 border-l-4 border-[#4318ff]"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mr-4">
                        <Image
                          src={activity.icon || "/placeholder.svg"}
                          alt=""
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-[#1b2559] font-medium">{activity.title}</h3>
                        <p className="text-sm text-[#707eae]">{activity.description}</p>
                        <p className="text-xs text-[#707eae]">{activity.trainingHours}</p>
                      </div>
                    </div>
                    <Link href={`/activities/${activity.id}`}>
                      <button className="bg-white text-[#4318ff] px-4 py-2 rounded-lg border border-[#e0e5f2] hover:bg-[#f4f7fe] transition-colors flex items-center">
                        <span className="mr-1">View</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Skills Distribution */}
              <div className="mt-8">
              <h2 className="text-xl font-bold text-[#2b3674]">Today's Participant Stats</h2>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#4318ff] mr-2"></div>
                    <span className="text-sm text-[#707eae]">Social Skills</span>
                  </div>
                  <span className="text-sm font-medium text-[#2b3674]">63%</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#23FBC5] mr-2"></div>
                    <span className="text-sm text-[#707eae]">Math Skills</span>
                  </div>
                  <span className="text-sm font-medium text-[#2b3674]">27%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#63B7E6] mr-2"></div>
                    <span className="text-sm text-[#707eae]">Music Skills</span>
                  </div>
                  <span className="text-sm font-medium text-[#2b3674]">15%</span>
                </div>
              </div>
            </div>

            {/* Recent Activities Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#2b3674]">Recent Activities</h2>
                <button className="text-[#4318ff] text-sm font-medium">See all</button>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <Link href={`/activities/${activity.id}`} key={activity.id}>
                    <div className="flex items-center justify-between bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <div
                          className={`w-12 h-12 rounded-lg ${getIconBgColor(
                            activity.category,
                          )} flex items-center justify-center mr-4`}
                        >
                          <Image
                            src={activity.icon || "/placeholder.svg"}
                            alt=""
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-[#1b2559] font-medium">{activity.title}</h3>
                          {activity.trainingHours && <p className="text-sm text-[#707eae]">{activity.trainingHours}</p>}
                          {activity.by && <p className="text-sm text-[#707eae]">{activity.by}</p>}
                        </div>
                      </div>
                      <div className="text-sm text-[#707eae]">{activity.daysAgo}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* All Activities Section with Filters */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#2b3674]">All Activities</h2>
              <div className="flex items-center gap-2">
                <button
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === null ? "bg-[#4318ff] text-white" : "bg-white text-[#707eae] hover:bg-[#f4f7fe]"
                  }`}
                  onClick={() => setActiveFilter(null)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  All
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === "Art" ? "bg-[#FF5733] text-white" : "bg-white text-[#707eae] hover:bg-[#f4f7fe]"
                  }`}
                  onClick={() => handleFilterClick("Art")}
                >
                  Art
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === "Music" ? "bg-[#4318FF] text-white" : "bg-white text-[#707eae] hover:bg-[#f4f7fe]"
                  }`}
                  onClick={() => handleFilterClick("Music")}
                >
                  Music
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === "Math" ? "bg-[#23FBC5] text-white" : "bg-white text-[#707eae] hover:bg-[#f4f7fe]"
                  }`}
                  onClick={() => handleFilterClick("Math")}
                >
                  Math
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === "Social" ? "bg-[#63B7E6] text-white" : "bg-white text-[#707eae] hover:bg-[#f4f7fe]"
                  }`}
                  onClick={() => handleFilterClick("Social")}
                >
                  Social
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <Link href={`/activities/${activity.id}`} key={activity.id}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-40 bg-[#f4f4f4] relative">
                      <div className={`absolute inset-0 ${getIconBgColor(activity.category)} opacity-20`}></div>
                      <div className="absolute top-4 right-4">
                        <div
                          className={`${getCategoryColor(
                            activity.category,
                          )} text-white px-3 py-1 rounded-full text-xs font-medium`}
                        >
                          {activity.category}
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                          <Image
                            src={activity.icon || "/placeholder.svg"}
                            alt=""
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-[#1b2559] mb-2">{activity.title}</h3>
                      <p className="text-sm text-[#707eae] mb-4 line-clamp-2">{activity.description}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-[#707eae]">{activity.trainingHours}</p>
                        <button className="text-[#4318ff] hover:text-[#2a0ca5] transition-colors">
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
