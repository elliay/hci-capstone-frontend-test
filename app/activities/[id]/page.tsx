"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { ArrowLeft, Clock, Calendar, Users, MapPin, Pencil, CheckCircle, XCircle, UserPlus } from "lucide-react"

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
    status: "confirmed" | "pending" | "declined"
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
    title: "Group Painting Session",
    description:
      "Collaborative art project focusing on expressing emotions through colors. Participants will work together to create a mural that represents their collective experiences and feelings. This activity helps develop fine motor skills, emotional expression, and social interaction.",
    category: "Art",
    duration: "45 min",
    date: "May 15, 2024",
    time: "2:00 PM - 2:45 PM",
    location: "Art Room 102",
    participants: [
      { id: "1", name: "Luke Carter", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "2", name: "Jack Hughes", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "4", name: "Mary Jarris", avatar: "/placeholder.svg?height=50&width=50", status: "pending" },
      { id: "7", name: "Harry Zhang", avatar: "/placeholder.svg?height=50&width=50", status: "declined" },
    ],
    materials: [
      "Acrylic paints",
      "Canvas boards",
      "Paintbrushes (various sizes)",
      "Water cups",
      "Aprons",
      "Paper towels",
    ],
    objectives: [
      "Express emotions through color choices",
      "Practice fine motor skills",
      "Engage in collaborative decision-making",
      "Complete a finished art piece",
    ],
    notes:
      "Some participants may need adaptive brushes. Mary has shown particular interest in painting landscapes. Jack may need extra encouragement to participate fully.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "2": {
    id: "2",
    title: "Music Therapy",
    description:
      "Using rhythm and melody to improve cognitive functions and coordination. This session will focus on rhythm exercises, simple instrument playing, and group singing. Music therapy has been shown to improve mood, cognitive function, and social connection.",
    category: "Music",
    duration: "60 min",
    date: "May 16, 2024",
    time: "10:00 AM - 11:00 AM",
    location: "Music Room 203",
    participants: [
      { id: "3", name: "Hans Beckham", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "5", name: "Hilary Canes", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "6", name: "McArthur Jin", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "8", name: "Connor Douglas", avatar: "/placeholder.svg?height=50&width=50", status: "pending" },
    ],
    materials: ["Hand drums", "Tambourines", "Maracas", "Keyboard", "Guitar", "Song lyric sheets"],
    objectives: [
      "Follow simple rhythm patterns",
      "Participate in group singing",
      "Take turns with instruments",
      "Express preferences for music styles",
    ],
    notes:
      "McArthur responds well to visual cues for rhythm. Connor may need frequent breaks due to sensory sensitivity. Hans has shown particular talent with percussion instruments.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "3": {
    id: "3",
    title: "Practical Math",
    description:
      "Learning to apply basic math skills in everyday situations like shopping, budgeting, and measuring. This hands-on session will use real-world scenarios to practice math concepts in a practical context. Participants will work with money, measurements, and time concepts.",
    category: "Math",
    duration: "50 min",
    date: "May 15, 2024",
    time: "4:30 PM - 5:20 PM",
    location: "Classroom 105",
    participants: [
      { id: "1", name: "Luke Carter", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "3", name: "Hans Beckham", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "5", name: "Hilary Canes", avatar: "/placeholder.svg?height=50&width=50", status: "pending" },
      { id: "8", name: "Connor Douglas", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
    ],
    materials: [
      "Play money",
      "Measuring cups and spoons",
      "Grocery store flyers",
      "Calculators",
      "Worksheets",
      "Pencils",
    ],
    objectives: [
      "Count money and make change",
      "Calculate simple discounts",
      "Measure ingredients for a recipe",
      "Tell time and calculate duration",
    ],
    notes:
      "Hans excels at calculations but needs support with practical applications. Hilary benefits from visual aids when working with money. Luke has shown improvement in measurement skills.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "4": {
    id: "4",
    title: "Social Skills Workshop",
    description:
      "Practicing conversation skills and appropriate social interactions through role-playing, games, and guided discussions. This workshop focuses on developing skills for everyday social situations, including greetings, conversations, active listening, and problem-solving.",
    category: "Social",
    duration: "90 min",
    date: "May 17, 2024",
    time: "1:00 PM - 2:30 PM",
    location: "Community Room",
    participants: [
      { id: "2", name: "Jack Hughes", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "4", name: "Mary Jarris", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "6", name: "McArthur Jin", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "7", name: "Harry Zhang", avatar: "/placeholder.svg?height=50&width=50", status: "pending" },
    ],
    materials: [
      "Conversation prompt cards",
      "Role-play scenario cards",
      "Social skills games",
      "Whiteboard and markers",
      "Handouts",
    ],
    objectives: [
      "Initiate and maintain conversations",
      "Practice active listening",
      "Recognize and respond to social cues",
      "Problem-solve social conflicts",
    ],
    notes:
      "Mary has made significant progress in initiating conversations. Jack benefits from clear, direct feedback. McArthur may need communication accommodations due to hearing impairment.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "5": {
    id: "5",
    title: "Pottery Class",
    description:
      "Creating functional and decorative items with clay, focusing on fine motor skills, creativity, and sensory exploration. Participants will learn basic hand-building techniques and have the opportunity to glaze their finished pieces in a future session.",
    category: "Art",
    duration: "75 min",
    date: "May 19, 2024",
    time: "3:00 PM - 4:15 PM",
    location: "Art Room 102",
    participants: [
      { id: "1", name: "Luke Carter", avatar: "/placeholder.svg?height=50&width=50", status: "pending" },
      { id: "3", name: "Hans Beckham", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "5", name: "Hilary Canes", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "7", name: "Harry Zhang", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
    ],
    materials: ["Clay", "Clay tools", "Rolling pins", "Texture stamps", "Water containers", "Aprons"],
    objectives: [
      "Learn basic clay hand-building techniques",
      "Create a functional item (cup or bowl)",
      "Practice fine motor skills",
      "Express creativity through form and texture",
    ],
    notes:
      "Hans may need extra sensory breaks due to the tactile nature of clay. Hilary has shown particular interest and talent in pottery. Harry benefits from clear, step-by-step demonstrations.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "6": {
    id: "6",
    title: "Group Singing",
    description:
      "Vocal exercises and group singing to improve communication, breath control, and confidence. This session includes warm-up exercises, simple songs, and opportunities for solo singing for those who are interested.",
    category: "Music",
    duration: "45 min",
    date: "May 18, 2024",
    time: "11:00 AM - 11:45 AM",
    location: "Music Room 203",
    participants: [
      { id: "2", name: "Jack Hughes", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "4", name: "Mary Jarris", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "6", name: "McArthur Jin", avatar: "/placeholder.svg?height=50&width=50", status: "pending" },
      { id: "8", name: "Connor Douglas", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
    ],
    materials: [
      "Song lyric sheets",
      "Keyboard for accompaniment",
      "Percussion instruments",
      "Recording equipment",
      "Water bottles",
    ],
    objectives: [
      "Practice breath control and vocal projection",
      "Sing in unison with the group",
      "Follow musical cues",
      "Build confidence in self-expression",
    ],
    notes:
      "Mary has shown significant improvement in vocal confidence. Connor may need visual supports for lyrics. Jack enjoys percussion accompaniment while singing.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "7": {
    id: "7",
    title: "Budgeting Basics",
    description:
      "Learning to create and maintain a personal budget for financial independence. This practical session covers income, expenses, saving, and making financial decisions. Participants will create their own sample budget based on realistic scenarios.",
    category: "Math",
    duration: "60 min",
    date: "May 20, 2024",
    time: "2:30 PM - 3:30 PM",
    location: "Classroom 105",
    participants: [
      { id: "1", name: "Luke Carter", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "5", name: "Hilary Canes", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "6", name: "McArthur Jin", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "7", name: "Harry Zhang", avatar: "/placeholder.svg?height=50&width=50", status: "declined" },
    ],
    materials: [
      "Budget worksheets",
      "Calculators",
      "Sample bills and paychecks",
      "Pencils",
      "Budget tracking apps (on tablets)",
    ],
    objectives: [
      "Identify income sources and expenses",
      "Create a basic monthly budget",
      "Prioritize spending categories",
      "Practice making financial decisions",
    ],
    notes:
      "McArthur has strong math skills but benefits from real-world applications. Hilary responds well to visual budget tools. Luke has expressed interest in learning about saving for specific goals.",
    image: "/placeholder.svg?height=300&width=500",
  },
  "8": {
    id: "8",
    title: "Community Outing",
    description:
      "Practicing social skills while visiting local community resources such as parks, libraries, or stores. This supervised outing provides opportunities to apply social, communication, and life skills in real-world settings.",
    category: "Social",
    duration: "120 min",
    date: "May 21, 2024",
    time: "10:00 AM - 12:00 PM",
    location: "Meet at Front Entrance",
    participants: [
      { id: "2", name: "Jack Hughes", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "3", name: "Hans Beckham", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "4", name: "Mary Jarris", avatar: "/placeholder.svg?height=50&width=50", status: "confirmed" },
      { id: "8", name: "Connor Douglas", avatar: "/placeholder.svg?height=50&width=50", status: "pending" },
    ],
    materials: [
      "Transportation",
      "Emergency contact information",
      "First aid kit",
      "Water bottles",
      "Snacks",
      "Communication cards if needed",
    ],
    objectives: [
      "Navigate community spaces appropriately",
      "Interact with community members",
      "Practice money handling in real situations",
      "Follow safety rules in public",
    ],
    notes:
      "Hans may need preparation for sensory aspects of the outing. Mary uses a mobility aid and requires accessible transportation. Connor benefits from a visual schedule of the outing plan.",
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

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-500"
      case "pending":
        return "text-amber-500"
      case "declined":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "pending":
        return <Clock className="w-5 h-5 text-amber-500" />
      case "declined":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
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

          {/* Participants section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#2b3674]">Participants</h2>
              <button className="flex items-center text-[#707eae] hover:text-[#4318ff]">
                <UserPlus className="w-5 h-5 mr-2" />
                <span>Add Participant</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {activity.participants.map((participant) => (
                <div key={participant.id} className="bg-[#f4f7fe] rounded-xl p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src={participant.avatar || "/placeholder.svg"}
                      alt={participant.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-[#1b2559] font-medium">{participant.name}</h3>
                    <div className="flex items-center">
                      {getStatusIcon(participant.status)}
                      <span className={`text-sm ml-1 ${getStatusColor(participant.status)}`}>
                        {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
