"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Info, ArrowRight, ChevronDown, Filter, ChevronUp, Star, Clock, Users } from "lucide-react"
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

// Define activity category type
interface ActivityCategory {
  id: string
  name: string
  matchScore: number
  description: string
  icon: string
  suggestedActivities: {
    id: string
    title: string
    description: string
    difficulty: "Beginner" | "Intermediate" | "Advanced"
    duration: string
    participants: number
  }[]
}

export default function ActivitiesPage() {
  // Activity categories data
  const [activityCategories, setActivityCategories] = useState<ActivityCategory[]>([
    {
      id: "cat1",
      name: "Math Skills",
      matchScore: 92,
      description: "Number recognition, counting, and basic calculations",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "math1",
          title: "Money Management",
          description: "Practice using money in everyday situations",
          difficulty: "Intermediate",
          duration: "45 min",
          participants: 4,
        },
        {
          id: "math2",
          title: "Measurement Basics",
          description: "Learn to measure length, volume, and weight",
          difficulty: "Beginner",
          duration: "30 min",
          participants: 6,
        },
        {
          id: "math3",
          title: "Budgeting Workshop",
          description: "Create and manage a personal budget",
          difficulty: "Advanced",
          duration: "60 min",
          participants: 3,
        },
      ],
    },
    {
      id: "cat2",
      name: "Social Skills",
      matchScore: 87,
      description: "Communication, cooperation, and community integration",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "social1",
          title: "Conversation Practice",
          description: "Learn to initiate and maintain conversations",
          difficulty: "Beginner",
          duration: "40 min",
          participants: 8,
        },
        {
          id: "social2",
          title: "Community Navigation",
          description: "Practice using public transportation and community resources",
          difficulty: "Intermediate",
          duration: "120 min",
          participants: 5,
        },
        {
          id: "social3",
          title: "Conflict Resolution",
          description: "Develop skills to resolve interpersonal conflicts",
          difficulty: "Advanced",
          duration: "50 min",
          participants: 6,
        },
      ],
    },
    {
      id: "cat3",
      name: "Art Therapy",
      matchScore: 78,
      description: "Creative expression and fine motor skills development",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "art1",
          title: "Collage Making",
          description: "Create expressive collages using various materials",
          difficulty: "Beginner",
          duration: "45 min",
          participants: 10,
        },
        {
          id: "art2",
          title: "Watercolor Techniques",
          description: "Learn basic watercolor painting methods",
          difficulty: "Intermediate",
          duration: "60 min",
          participants: 6,
        },
        {
          id: "art3",
          title: "Sculpture Workshop",
          description: "Create 3D art using clay and other materials",
          difficulty: "Advanced",
          duration: "90 min",
          participants: 4,
        },
      ],
    },
    {
      id: "cat4",
      name: "Music Appreciation",
      matchScore: 65,
      description: "Rhythm, melody, and musical expression",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "music1",
          title: "Percussion Circle",
          description: "Learn basic rhythm patterns with percussion instruments",
          difficulty: "Beginner",
          duration: "30 min",
          participants: 12,
        },
        {
          id: "music2",
          title: "Music and Emotions",
          description: "Explore how music can express and affect emotions",
          difficulty: "Intermediate",
          duration: "45 min",
          participants: 8,
        },
        {
          id: "music3",
          title: "Song Writing",
          description: "Create simple songs and lyrics",
          difficulty: "Advanced",
          duration: "60 min",
          participants: 4,
        },
      ],
    },
  ])

  // Initial recent activities data
  const [recentActivities, setRecentActivities] = useState<Activity[]>([
    {
      id: "5",
      title: "Counting Numbers",
      description: "Basic counting from 1-100",
      category: "Math",
      trainingHours: "Training Hour: 20-25 hrs",
      daysAgo: "2d ago",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      title: "Color & Painting",
      description: "Understanding different colors and painting techniques",
      category: "Art",
      trainingHours: "Training Hour: 30 hrs",
      daysAgo: "4d ago",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "7",
      title: "Music Genres",
      description: "Exploring various music styles and their characteristics",
      category: "Music",
      trainingHours: "Training Hour: 15-20 hrs",
      daysAgo: "8d ago",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "8",
      title: "Trader Joe's Volunteering",
      description: "Community service at local grocery store",
      category: "Social",
      trainingHours: "",
      daysAgo: "9d ago",
      by: "By Will Smith",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "9",
      title: "News Reading",
      description: "Reading and discussing current events",
      category: "Social",
      trainingHours: "",
      daysAgo: "12d ago",
      by: "By Will Smith",
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
      trainingHours: "Training Hours: 20-25 hours",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      title: "Calculating for Change",
      description: "Day-to-day interaction with money",
      category: "Math",
      trainingHours: "Training Hours: 40 hours",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      title: "Color & Painting",
      description: "Understand the different colors",
      category: "Art",
      trainingHours: "Training Hours: 30 hours",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      title: "Music Genres",
      description: "Understand the different genres",
      category: "Music",
      trainingHours: "Training Hours: 35 hours",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "10",
      title: "Social Interaction",
      description: "Practice everyday social skills",
      category: "Social",
      trainingHours: "Training Hours: 45 hours",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "11",
      title: "Drawing Basics",
      description: "Learn fundamental drawing techniques",
      category: "Art",
      trainingHours: "Training Hours: 25 hours",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "12",
      title: "Rhythm & Beat",
      description: "Understanding musical rhythm",
      category: "Music",
      trainingHours: "Training Hours: 20 hours",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "13",
      title: "Basic Addition",
      description: "Adding numbers up to 100",
      category: "Math",
      trainingHours: "Training Hours: 15 hours",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "14",
      title: "Group Conversation",
      description: "Practicing group discussion skills",
      category: "Social",
      trainingHours: "Training Hours: 30 hours",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ])

  // State for active filter
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // State for expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryId]: !expandedCategories[categoryId],
    })
  }

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

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-500 bg-green-50"
      case "Intermediate":
        return "text-blue-500 bg-blue-50"
      case "Advanced":
        return "text-purple-500 bg-purple-50"
      default:
        return "text-gray-500 bg-gray-50"
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
            {/* Suggested Activities Section (Categories) */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#2b3674]">Suggested Activity Categories</h2>
                <div className="flex items-center text-[#707eae]">
                  <span className="mr-2">Based on participant goals</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-4">
                {activityCategories.map((category) => (
                  <div key={category.id} className="rounded-xl border border-[#e0e5f2] overflow-hidden">
                    <div
                      className="flex items-center justify-between bg-[#f4f7fe] p-4 cursor-pointer"
                      onClick={() => toggleCategoryExpansion(category.id)}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mr-4">
                          <Image
                            src={category.icon || "/placeholder.svg"}
                            alt=""
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-[#1b2559] font-medium mr-2">{category.name}</h3>
                            <div className="flex items-center bg-[#4318ff] bg-opacity-10 text-[#4318ff] text-xs font-medium px-2 py-1 rounded-full">
                              <Star className="w-3 h-3 mr-1" />
                              <span>{category.matchScore}% Match</span>
                            </div>
                          </div>
                          <p className="text-sm text-[#707eae]">{category.description}</p>
                        </div>
                      </div>
                      {expandedCategories[category.id] ? (
                        <ChevronUp className="w-5 h-5 text-[#707eae]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#707eae]" />
                      )}
                    </div>

                    {/* Expanded activities */}
                    {expandedCategories[category.id] && (
                      <div className="p-4 bg-white border-t border-[#e0e5f2]">
                        <h4 className="text-sm font-medium text-[#707eae] mb-3">Suggested Activities:</h4>
                        <div className="space-y-3">
                          {category.suggestedActivities.map((activity) => (
                            <div
                              key={activity.id}
                              className="p-3 bg-[#f4f7fe] rounded-lg border border-[#e0e5f2] hover:border-[#4318ff] transition-colors"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-[#2b3674]">{activity.title}</h5>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(activity.difficulty)}`}
                                >
                                  {activity.difficulty}
                                </span>
                              </div>
                              <p className="text-sm text-[#707eae] mb-3">{activity.description}</p>
                              <div className="flex items-center text-xs text-[#707eae] space-x-4">
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>{activity.duration}</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="w-3 h-3 mr-1" />
                                  <span>Up to {activity.participants} participants</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Skills Distribution */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-[#707eae] mb-3">Participant Interest Distribution</h3>
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
                  <div
                    key={activity.id}
                    className="flex items-center justify-between bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
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
                        <p className="text-sm text-[#707eae] line-clamp-1">{activity.description}</p>
                        {activity.trainingHours && <p className="text-xs text-[#707eae]">{activity.trainingHours}</p>}
                        {activity.by && <p className="text-xs text-[#707eae]">{activity.by}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-[#707eae]">{activity.daysAgo}</div>
                      <Link href={`/activities/${activity.id}`}>
                        <button className="bg-white text-[#4318ff] px-4 py-2 rounded-lg border border-[#e0e5f2] hover:bg-[#f4f7fe] transition-colors flex items-center">
                          <span className="mr-1">View</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
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
