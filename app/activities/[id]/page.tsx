"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { ArrowLeft, Clock, Calendar, Users, MapPin, Pencil, UserPlus, HelpCircle } from "lucide-react"

// Define activity type
interface Activity {
  id: string
  title: string
  description: string
  category: "Art" | "Music" | "Math" | "Social"
  duration: string
  date: string
  time: string
  location: string
  participants: {
    id: string
    name: string
    avatar: string
    supportLevel: "Minimal" | "Moderate" | "Substantial" | "Full"
    notes?: string
  }[]
  materials: string[]
  objectives: string[]
  notes: string
  image: string
}

// Sample activities data
const activitiesData: Record<string, Activity> = {
  "1": {
    id: "1",
    title: "Counting Numbers",
    description:
      "Basic counting from 1-100. This activity helps participants develop fundamental numeracy skills through interactive counting exercises. Participants will practice counting forward and backward, identifying patterns, and recognizing numbers.",
    category: "Math",
    duration: "45 min",
    date: "May 15, 2024",
    time: "2:00 PM - 2:45 PM",
    location: "Classroom 105",
    participants: [
      {
        id: "1",
        name: "Luke Carter",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Needs occasional reminders to stay on task",
      },
      {
        id: "2",
        name: "Jack Hughes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Benefits from visual aids and concrete examples",
      },
      {
        id: "4",
        name: "Mary Jarris",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Works well independently",
      },
      {
        id: "7",
        name: "Harry Zhang",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "Needs frequent check-ins and step-by-step guidance",
      },
    ],
    materials: ["Number cards", "Counting blocks", "Number line", "Worksheets", "Pencils", "Whiteboard and markers"],
    objectives: [
      "Count from 1 to 100 forward and backward",
      "Identify missing numbers in a sequence",
      "Recognize patterns in counting",
      "Apply counting skills to simple problems",
    ],
    notes:
      "Harry may need additional support with numbers above 50. Luke has shown significant improvement in the last two sessions. Mary can help demonstrate counting techniques to others.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "2": {
    id: "2",
    title: "Calculating for Change",
    description:
      "Day-to-day interaction with money. This practical session focuses on handling money, making change, and understanding basic financial transactions. Participants will practice using different denominations of currency in simulated real-world scenarios.",
    category: "Math",
    duration: "60 min",
    date: "May 16, 2024",
    time: "10:00 AM - 11:00 AM",
    location: "Classroom 105",
    participants: [
      {
        id: "3",
        name: "Hans Beckham",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "Needs concrete examples and hands-on practice",
      },
      {
        id: "5",
        name: "Hilary Canes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Benefits from visual aids and step-by-step instructions",
      },
      {
        id: "6",
        name: "McArthur Jin",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Strong with calculations but needs practice with real-world applications",
      },
      {
        id: "8",
        name: "Connor Douglas",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Full",
        notes: "Requires one-on-one assistance throughout the activity",
      },
    ],
    materials: [
      "Play money (bills and coins)",
      "Cash register",
      "Price tags",
      "Shopping items",
      "Calculators",
      "Worksheets",
    ],
    objectives: [
      "Identify different denominations of currency",
      "Calculate total costs of items",
      "Make change correctly",
      "Complete simple transactions independently",
    ],
    notes:
      "Connor needs consistent support throughout the session. McArthur excels at mental math but needs practice with handling physical money. Hans responds well to role-playing scenarios.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "3": {
    id: "3",
    title: "Color & Painting",
    description:
      "Understand the different colors. This creative session explores color theory, mixing colors, and expressing emotions through color choices. Participants will experiment with various painting techniques while learning about primary, secondary, and tertiary colors.",
    category: "Art",
    duration: "50 min",
    date: "May 15, 2024",
    time: "4:30 PM - 5:20 PM",
    location: "Art Room 102",
    participants: [
      {
        id: "1",
        name: "Luke Carter",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Needs help with fine motor control for detailed work",
      },
      {
        id: "3",
        name: "Hans Beckham",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "May need sensory breaks due to texture sensitivity",
      },
      {
        id: "5",
        name: "Hilary Canes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Very creative and works well independently",
      },
      {
        id: "8",
        name: "Connor Douglas",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Benefits from demonstrations before attempting techniques",
      },
    ],
    materials: [
      "Watercolor paints",
      "Paintbrushes (various sizes)",
      "Watercolor paper",
      "Water cups",
      "Color wheels",
      "Aprons",
    ],
    objectives: [
      "Identify primary, secondary, and tertiary colors",
      "Mix colors to create new shades",
      "Use colors to express emotions",
      "Apply basic painting techniques",
    ],
    notes:
      "Hans may need alternative tools if he's sensitive to brush textures. Hilary has shown exceptional talent with color mixing. Luke benefits from using larger brushes for better control.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "4": {
    id: "4",
    title: "Music Genres",
    description:
      "Understand the different genres. This interactive session introduces participants to various music genres, their characteristics, and cultural significance. Participants will listen to examples, identify instruments, and discuss emotional responses to different styles of music.",
    category: "Music",
    duration: "90 min",
    date: "May 17, 2024",
    time: "1:00 PM - 2:30 PM",
    location: "Music Room 203",
    participants: [
      {
        id: "2",
        name: "Jack Hughes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Highly engaged with music activities",
      },
      {
        id: "4",
        name: "Mary Jarris",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "May need volume adjustments due to sensitivity",
      },
      {
        id: "6",
        name: "McArthur Jin",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "Needs visual aids to supplement audio content",
      },
      {
        id: "7",
        name: "Harry Zhang",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Has extensive knowledge of music and can assist others",
      },
    ],
    materials: [
      "Audio equipment",
      "Music samples from different genres",
      "Visual aids showing instruments",
      "Headphones",
      "Worksheets",
      "Simple percussion instruments",
    ],
    objectives: [
      "Identify at least 5 different music genres",
      "Recognize characteristic instruments in each genre",
      "Express preferences and emotional responses",
      "Understand cultural contexts of different genres",
    ],
    notes:
      "McArthur is deaf and uses ASL; ensure visual components are available for all audio content. Harry has a strong interest in music and can be encouraged to share his knowledge. Jack responds well to hands-on activities with instruments.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "5": {
    id: "5",
    title: "Trader Joe's Volunteering",
    description:
      "Community service activity at Trader Joe's grocery store. Participants will assist with bagging groceries, cart collection, and customer service under supervision. This real-world experience helps develop social skills, work habits, and community integration.",
    category: "Social",
    duration: "120 min",
    date: "May 19, 2024",
    time: "10:00 AM - 12:00 PM",
    location: "Trader Joe's - Main Street",
    participants: [
      {
        id: "1",
        name: "Luke Carter",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Needs reminders about appropriate customer interaction",
      },
      {
        id: "3",
        name: "Hans Beckham",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Full",
        notes: "Requires consistent one-on-one support in busy environments",
      },
      {
        id: "5",
        name: "Hilary Canes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Works well independently after initial instruction",
      },
      {
        id: "7",
        name: "Harry Zhang",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "Needs frequent check-ins and structured tasks",
      },
    ],
    materials: [
      "Transportation to location",
      "Name tags",
      "Schedule of tasks",
      "Emergency contact information",
      "Snacks and water",
    ],
    objectives: [
      "Practice appropriate workplace behavior",
      "Develop customer service skills",
      "Follow multi-step instructions",
      "Work collaboratively with store staff",
    ],
    notes:
      "Hans may need breaks if the environment becomes overwhelming. Hilary has shown excellent customer service skills in previous outings. Luke should be paired with a staff member for the first hour.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "6": {
    id: "6",
    title: "News Reading",
    description:
      "Practice reading and discussing current events from simplified news sources. This activity focuses on reading comprehension, critical thinking, and discussion skills while keeping participants informed about age-appropriate current events.",
    category: "Social",
    duration: "45 min",
    date: "May 18, 2024",
    time: "11:00 AM - 11:45 AM",
    location: "Library",
    participants: [
      {
        id: "2",
        name: "Jack Hughes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Needs help with complex vocabulary",
      },
      {
        id: "4",
        name: "Mary Jarris",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Strong reader who can help model for others",
      },
      {
        id: "6",
        name: "McArthur Jin",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "Benefits from visual supports and simplified text",
      },
      {
        id: "8",
        name: "Connor Douglas",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Full",
        notes: "Requires one-on-one reading support and simplified content",
      },
    ],
    materials: [
      "Simplified news articles",
      "Pictures related to news stories",
      "Discussion question cards",
      "Highlighters",
      "Vocabulary lists",
      "World map",
    ],
    objectives: [
      "Read and comprehend age-appropriate news articles",
      "Identify key information in a text",
      "Participate in group discussions",
      "Form and express opinions about current events",
    ],
    notes:
      "Connor needs articles with picture support. McArthur benefits from pre-teaching key vocabulary. Mary can be paired with peers who need additional support. Jack is particularly interested in sports news.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "7": {
    id: "7",
    title: "Social Interaction",
    description:
      "Practice everyday social skills through role-playing, games, and guided activities. This session focuses on greetings, conversations, active listening, and appropriate responses in various social situations.",
    category: "Social",
    duration: "60 min",
    date: "May 20, 2024",
    time: "2:30 PM - 3:30 PM",
    location: "Community Room",
    participants: [
      {
        id: "1",
        name: "Luke Carter",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Needs prompting to maintain appropriate personal space",
      },
      {
        id: "5",
        name: "Hilary Canes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Strong social skills, can model for others",
      },
      {
        id: "6",
        name: "McArthur Jin",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "Needs communication accommodations and visual supports",
      },
      {
        id: "7",
        name: "Harry Zhang",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Benefits from clear expectations and feedback",
      },
    ],
    materials: [
      "Role-play scenario cards",
      "Social skills games",
      "Visual cue cards",
      "Timer for conversation practice",
      "Feedback forms",
    ],
    objectives: [
      "Initiate and maintain appropriate conversations",
      "Demonstrate active listening skills",
      "Recognize and respond to social cues",
      "Practice problem-solving in social situations",
    ],
    notes:
      "McArthur communicates primarily through ASL; ensure interpreter is available. Luke has been working on maintaining appropriate distance during conversations. Harry benefits from immediate feedback on interactions.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "8": {
    id: "8",
    title: "Drawing Basics",
    description:
      "Learn fundamental drawing techniques including line, shape, proportion, and shading. This introductory art session helps participants develop observational skills and fine motor control while exploring creative expression.",
    category: "Art",
    duration: "60 min",
    date: "May 21, 2024",
    time: "10:00 AM - 11:00 AM",
    location: "Art Room 102",
    participants: [
      {
        id: "2",
        name: "Jack Hughes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "Needs adaptive drawing tools and frequent encouragement",
      },
      {
        id: "3",
        name: "Hans Beckham",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Benefits from step-by-step visual demonstrations",
      },
      {
        id: "4",
        name: "Mary Jarris",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Shows natural talent for drawing",
      },
      {
        id: "8",
        name: "Connor Douglas",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Full",
        notes: "Requires hand-over-hand assistance and simplified tasks",
      },
    ],
    materials: [
      "Drawing pencils (various hardness)",
      "Drawing paper",
      "Erasers",
      "Pencil sharpeners",
      "Drawing boards",
      "Simple objects for still life",
    ],
    objectives: [
      "Draw basic shapes with proper proportion",
      "Apply simple shading techniques",
      "Create a still life drawing",
      "Express creativity through drawing",
    ],
    notes:
      "Connor may need modified activities focusing on simple shapes. Jack benefits from larger paper and ergonomic pencil grips. Hans responds well to clear, sequential instructions. Mary can be encouraged to try more advanced techniques.",
    image: "/placeholder.svg?height=300&width=500",
  },
}

export default function ActivityDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [activity, setActivity] = useState<Activity | null>(null)

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    if (typeof id === "string" && activitiesData[id]) {
      setActivity(activitiesData[id])
    }
  }, [id])

  if (!activity) {
    return (
      <div className="flex h-screen bg-[#edf8ff]">
        <Sidebar activePage="activities" />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p>Activity not found</p>
        </div>
      </div>
    )
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

  // Get support level color and style
  const getSupportLevelStyle = (level: string) => {
    switch (level) {
      case "Minimal":
        return {
          color: "text-green-500",
          bgColor: "bg-green-100",
          borderColor: "border-green-200",
          icon: <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>,
        }
      case "Moderate":
        return {
          color: "text-blue-500",
          bgColor: "bg-blue-100",
          borderColor: "border-blue-200",
          icon: <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>,
        }
      case "Substantial":
        return {
          color: "text-amber-500",
          bgColor: "bg-amber-100",
          borderColor: "border-amber-200",
          icon: <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>,
        }
      case "Full":
        return {
          color: "text-red-500",
          bgColor: "bg-red-100",
          borderColor: "border-red-200",
          icon: <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>,
        }
      default:
        return {
          color: "text-gray-500",
          bgColor: "bg-gray-100",
          borderColor: "border-gray-200",
          icon: <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>,
        }
    }
  }

  return (
    <div className="flex h-screen bg-[#edf8ff]">
      {/* Sidebar Component */}
      <Sidebar activePage="activities" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header with back button */}
          <div className="mb-6">
            <button
              onClick={() => router.push("/activities")}
              className="flex items-center text-[#707eae] hover:text-[#4318ff] mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to Activities</span>
            </button>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-[#707eae] mb-1">
                  <span>Pages / Activities / {activity.title}</span>
                </div>
                <h1 className="text-3xl font-bold text-[#2b3674]">{activity.title}</h1>
              </div>
              <div
                className={`${getCategoryColor(activity.category)} text-white px-4 py-2 rounded-full text-sm font-medium`}
              >
                {activity.category}
              </div>
            </div>
          </div>

          {/* Activity details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Activity image */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-64 bg-[#f4f4f4] relative">
                <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-[#2b3674]">Description</h2>
                  <button className="text-[#707eae] hover:text-[#4318ff]">
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-[#707eae] leading-relaxed">{activity.description}</p>
              </div>
            </div>

            {/* Activity info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[#2b3674] mb-4">Activity Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-[#4318ff] mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-[#8f9bba]">Duration</p>
                    <p className="text-[#2b3674] font-medium">{activity.duration}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-[#4318ff] mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-[#8f9bba]">Date & Time</p>
                    <p className="text-[#2b3674] font-medium">{activity.date}</p>
                    <p className="text-[#2b3674] font-medium">{activity.time}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#4318ff] mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-[#8f9bba]">Location</p>
                    <p className="text-[#2b3674] font-medium">{activity.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-[#4318ff] mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-[#8f9bba]">Participants</p>
                    <p className="text-[#2b3674] font-medium">{activity.participants.length} registered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Participants section with support levels */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#2b3674]">Participants & Support Needs</h2>
              <button className="flex items-center text-[#707eae] hover:text-[#4318ff]">
                <UserPlus className="w-5 h-5 mr-2" />
                <span>Add Participant</span>
              </button>
            </div>

            {/* Support level legend */}
            <div className="flex flex-wrap gap-4 mb-6 bg-[#f4f7fe] p-4 rounded-lg">
              <div className="flex items-center">
                <HelpCircle className="w-4 h-4 text-[#707eae] mr-2" />
                <span className="text-sm text-[#707eae] mr-4">Support Levels:</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-green-500 mr-4">Minimal</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-blue-500 mr-4">Moderate</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-sm text-amber-500 mr-4">Substantial</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-red-500">Full</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activity.participants.map((participant) => {
                const supportStyle = getSupportLevelStyle(participant.supportLevel)
                return (
                  <div
                    key={participant.id}
                    className={`rounded-xl p-4 flex flex-col ${supportStyle.bgColor} border ${supportStyle.borderColor}`}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <Image
                          src={participant.avatar || "/placeholder.svg"}
                          alt={participant.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-[#1b2559] font-medium">{participant.name}</h3>
                        <div className="flex items-center">
                          {supportStyle.icon}
                          <span className={`text-sm ${supportStyle.color}`}>{participant.supportLevel} Support</span>
                        </div>
                      </div>
                    </div>
                    {participant.notes && (
                      <div className="mt-2 text-sm text-[#707eae] bg-white bg-opacity-50 p-3 rounded-lg">
                        <p>{participant.notes}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Materials and Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Materials */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-[#2b3674]">Materials</h2>
                <button className="text-[#707eae] hover:text-[#4318ff]">
                  <Pencil className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-2">
                {activity.materials.map((material, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-[#4318ff] mt-2 mr-3"></div>
                    <span className="text-[#707eae]">{material}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Objectives */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-[#2b3674]">Objectives</h2>
                <button className="text-[#707eae] hover:text-[#4318ff]">
                  <Pencil className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-2">
                {activity.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-[#63b7e6] mt-2 mr-3"></div>
                    <span className="text-[#707eae]">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-[#2b3674]">Notes</h2>
              <button className="text-[#707eae] hover:text-[#4318ff]">
                <Pencil className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[#707eae] leading-relaxed">{activity.notes}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
