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
  category: string
  duration: string
  difficulty: "Easy" | "Medium" | "Hard"
  date: string
  time: string
  lastRunDate?: string
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
    title: "Memory Card Match",
    description: "Practice short-term memory with card matching exercises",
    category: "Memory",
    duration: "25 min",
    date: "May 22, 2024",
    time: "9:00 AM - 9:25 AM",
    lastRunDate: "May 13, 2024",
    location: "Classroom 101",
    participants: [
      {
        id: "1",
        name: "Luke Carter",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Shows good progress with memory tasks",
      },
      {
        id: "3",
        name: "Hans Beckham",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "May need additional time",
      },
    ],
    materials: ["Memory card sets", "Timer", "Score sheets"],
    objectives: ["Improve short-term visual memory", "Practice concentration", "Develop matching skills"],
    notes: "Start with fewer cards for participants who need more support. Gradually increase difficulty.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Easy",
  },
  "2": {
    id: "2",
    title: "Sequential Instructions",
    description: "Follow multi-step instructions in order",
    category: "Cognitive",
    duration: "40 min",
    date: "May 16, 2024",
    time: "10:00 AM - 10:40 AM",
    lastRunDate: "May 8, 2024",
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
    ],
    materials: ["Instruction cards", "Task materials", "Visual sequence charts"],
    objectives: ["Follow multi-step instructions", "Improve sequential processing", "Develop task organization skills"],
    notes: "Provide visual supports for participants who struggle with verbal instructions.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Medium",
  },
  "3": {
    id: "3",
    title: "Weekly Planner",
    description: "Create and organize a weekly schedule",
    category: "Executive",
    duration: "30 min",
    date: "May 15, 2024",
    time: "4:30 PM - 5:00 PM",
    lastRunDate: "May 12, 2024",
    location: "Classroom 102",
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
    ],
    materials: ["Weekly planner templates", "Colored markers", "Stickers", "Calendar"],
    objectives: ["Create organized weekly schedule", "Prioritize activities", "Develop time management skills"],
    notes: "Provide templates with different levels of structure based on participant needs.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Easy",
  },
  "4": {
    id: "4",
    title: "Focused Reading",
    description: "Practice reading with minimal distractions",
    category: "Attention",
    duration: "35 min",
    date: "May 17, 2024",
    time: "1:00 PM - 1:35 PM",
    lastRunDate: "May 5, 2024",
    location: "Library",
    participants: [
      {
        id: "2",
        name: "Jack Hughes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Highly engaged with reading activities",
      },
      {
        id: "4",
        name: "Mary Jarris",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "May need volume adjustments due to sensitivity",
      },
    ],
    materials: ["Reading materials at various levels", "Noise-cancelling headphones", "Reading trackers"],
    objectives: ["Improve sustained attention", "Enhance reading comprehension", "Develop focus strategies"],
    notes: "Provide quiet environment and minimize visual distractions.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Medium",
  },
  "5": {
    id: "5",
    title: "Memory Card Match",
    description: "Practice short-term memory with card matching exercises",
    category: "Memory",
    duration: "25 min",
    date: "May 22, 2024",
    time: "9:00 AM - 9:25 AM",
    lastRunDate: "May 13, 2024",
    location: "Classroom 101",
    participants: [
      {
        id: "1",
        name: "Luke Carter",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Shows good progress with memory tasks",
      },
      {
        id: "3",
        name: "Hans Beckham",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "May need additional time",
      },
    ],
    materials: ["Memory card sets", "Timer", "Score sheets"],
    objectives: ["Improve short-term visual memory", "Practice concentration", "Develop matching skills"],
    notes: "Start with fewer cards for participants who need more support. Gradually increase difficulty.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Easy",
  },
  "6": {
    id: "6",
    title: "Attention Scanning",
    description: "Find specific items in a busy visual field",
    category: "Attention",
    duration: "30 min",
    date: "May 23, 2024",
    time: "10:30 AM - 11:00 AM",
    lastRunDate: "May 11, 2024",
    location: "Classroom 102",
    participants: [
      {
        id: "2",
        name: "Jack Hughes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Good at visual scanning tasks",
      },
      {
        id: "4",
        name: "Mary Jarris",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "May need larger print materials",
      },
    ],
    materials: ["Visual search worksheets", "Highlighters", "Timer"],
    objectives: ["Improve visual scanning abilities", "Enhance selective attention", "Practice sustained focus"],
    notes: "Provide verbal cues for participants who struggle with maintaining attention.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Easy",
  },
  "7": {
    id: "7",
    title: "Word Association",
    description: "Practice verbal fluency and word retrieval",
    category: "Language",
    duration: "35 min",
    date: "May 24, 2024",
    time: "1:00 PM - 1:35 PM",
    lastRunDate: "May 7, 2024",
    location: "Library",
    participants: [
      {
        id: "5",
        name: "Hilary Canes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Strong verbal skills",
      },
      {
        id: "7",
        name: "Harry Zhang",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "May need prompting for word retrieval",
      },
    ],
    materials: ["Word cards", "Category lists", "Timer"],
    objectives: ["Improve word retrieval speed", "Expand vocabulary", "Strengthen semantic connections"],
    notes: "Start with common categories and gradually move to more abstract associations.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Medium",
  },
  "8": {
    id: "8",
    title: "Grocery Store Navigation",
    description: "Community outing with planning and navigation tasks",
    category: "Executive",
    duration: "120 min",
    date: "May 19, 2024",
    time: "10:00 AM - 12:00 PM",
    lastRunDate: "May 9, 2024",
    location: "Local Grocery Store",
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
    ],
    materials: ["Shopping lists", "Store maps", "Money for purchases", "Transportation"],
    objectives: [
      "Navigate store environment",
      "Follow shopping list",
      "Practice money management",
      "Interact appropriately with store staff",
    ],
    notes:
      "Pre-visit the store to identify potential challenges. Prepare participants with social scripts for interactions.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Hard",
  },
  "9": {
    id: "9",
    title: "News Discussion Group",
    description: "Reading and discussing current events",
    category: "Social",
    duration: "45 min",
    date: "May 25, 2024",
    time: "11:00 AM - 11:45 AM",
    lastRunDate: "May 3, 2024",
    location: "Community Room",
    participants: [
      {
        id: "4",
        name: "Mary Jarris",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Strong reading comprehension",
      },
      {
        id: "6",
        name: "McArthur Jin",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Needs visual supports for discussions",
      },
      {
        id: "8",
        name: "Connor Douglas",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "Benefits from simplified news articles",
      },
    ],
    materials: ["Simplified news articles", "Discussion prompts", "Visual aids"],
    objectives: ["Improve reading comprehension", "Practice discussion skills", "Develop awareness of current events"],
    notes: "Provide different reading levels for participants with varying abilities.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Medium",
  },
  "10": {
    id: "10",
    title: "Conversation Practice",
    description: "Practice everyday social communication skills",
    category: "Language",
    duration: "45 min",
    date: "May 26, 2024",
    time: "2:00 PM - 2:45 PM",
    lastRunDate: "May 10, 2024",
    location: "Community Room",
    participants: [
      {
        id: "5",
        name: "Hilary Canes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Strong social skills, can model for others",
      },
      {
        id: "7",
        name: "Harry Zhang",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Benefits from clear expectations and feedback",
      },
    ],
    materials: ["Conversation prompt cards", "Topic cards", "Timer"],
    objectives: ["Initiate and maintain conversations", "Practice turn-taking", "Develop active listening skills"],
    notes: "Start with structured topics and gradually move to more open-ended conversations.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Medium",
  },
  "11": {
    id: "11",
    title: "Finger Dexterity",
    description: "Practice precise finger movements with small objects",
    category: "Motor",
    duration: "25 min",
    date: "May 27, 2024",
    time: "10:00 AM - 10:25 AM",
    lastRunDate: "May 14, 2024",
    location: "Occupational Therapy Room",
    participants: [
      {
        id: "1",
        name: "Luke Carter",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Needs help with fine motor control",
      },
      {
        id: "8",
        name: "Connor Douglas",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "Requires hand-over-hand assistance for some tasks",
      },
    ],
    materials: ["Beads of various sizes", "Tweezers", "Buttons", "Lacing cards", "Therapy putty"],
    objectives: ["Improve fine motor control", "Enhance finger strength", "Develop precision movements"],
    notes: "Adapt activities based on individual motor abilities. Provide graded challenges.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Easy",
  },
  "12": {
    id: "12",
    title: "Logic Puzzles",
    description: "Solve increasingly complex logic puzzles",
    category: "Problem",
    duration: "20 min",
    date: "May 28, 2024",
    time: "11:00 AM - 11:20 AM",
    lastRunDate: "May 12, 2024",
    location: "Classroom 103",
    participants: [
      {
        id: "2",
        name: "Jack Hughes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Strong problem-solving skills",
      },
      {
        id: "6",
        name: "McArthur Jin",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Benefits from visual supports",
      },
    ],
    materials: ["Logic puzzle worksheets", "Manipulatives", "Visual aids"],
    objectives: ["Develop logical reasoning", "Enhance problem-solving strategies", "Improve sequential thinking"],
    notes: "Provide puzzles at various difficulty levels. Offer hints as needed.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Easy",
  },
  "13": {
    id: "13",
    title: "Emotion Recognition",
    description: "Practice identifying emotions in self and others",
    category: "Emotional",
    duration: "30 min",
    date: "May 29, 2024",
    time: "1:30 PM - 2:00 PM",
    lastRunDate: "May 8, 2024",
    location: "Counseling Room",
    participants: [
      {
        id: "3",
        name: "Hans Beckham",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "Struggles with identifying subtle emotions",
      },
      {
        id: "7",
        name: "Harry Zhang",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Benefits from concrete examples",
      },
    ],
    materials: ["Emotion cards", "Mirror", "Scenario cards", "Feelings chart"],
    objectives: [
      "Identify basic and complex emotions",
      "Recognize facial expressions",
      "Connect emotions to situations",
    ],
    notes: "Start with basic emotions and gradually introduce more nuanced emotional states.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Easy",
  },
  "14": {
    id: "14",
    title: "Group Discussion",
    description: "Practice group conversation skills",
    category: "Social",
    duration: "60 min",
    date: "May 30, 2024",
    time: "3:00 PM - 4:00 PM",
    lastRunDate: "May 6, 2024",
    location: "Community Room",
    participants: [
      {
        id: "4",
        name: "Mary Jarris",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Strong verbal skills",
      },
      {
        id: "5",
        name: "Hilary Canes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Good at facilitating discussions",
      },
      {
        id: "6",
        name: "McArthur Jin",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "Needs communication accommodations",
      },
      {
        id: "8",
        name: "Connor Douglas",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Full",
        notes: "Requires support for participation",
      },
    ],
    materials: ["Discussion topics", "Visual supports", "Timer", "Talking stick"],
    objectives: ["Practice turn-taking in groups", "Develop active listening", "Express opinions appropriately"],
    notes: "Ensure all participants have opportunities to contribute. Use visual supports for topic transitions.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Hard",
  },
  "15": {
    id: "15",
    title: "Watercolor Painting",
    description: "Express emotions through watercolor techniques",
    category: "Art",
    duration: "45 min",
    date: "May 31, 2024",
    time: "10:00 AM - 10:45 AM",
    lastRunDate: "May 7, 2024",
    location: "Art Room",
    participants: [
      {
        id: "1",
        name: "Luke Carter",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Moderate",
        notes: "Enjoys creative expression",
      },
      {
        id: "5",
        name: "Hilary Canes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Shows talent with visual arts",
      },
    ],
    materials: ["Watercolor paints", "Brushes", "Watercolor paper", "Water containers", "Color mixing guide"],
    objectives: ["Learn basic watercolor techniques", "Express emotions through color", "Create a finished painting"],
    notes: "Focus on process rather than product. Provide adaptive brushes if needed.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Medium",
  },
  "16": {
    id: "16",
    title: "Rhythm Patterns",
    description: "Learn and reproduce simple rhythm patterns",
    category: "Music",
    duration: "30 min",
    date: "June 1, 2024",
    time: "1:00 PM - 1:30 PM",
    lastRunDate: "May 9, 2024",
    location: "Music Room",
    participants: [
      {
        id: "2",
        name: "Jack Hughes",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Enjoys musical activities",
      },
      {
        id: "7",
        name: "Harry Zhang",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Minimal",
        notes: "Has strong rhythm skills",
      },
    ],
    materials: ["Percussion instruments", "Rhythm cards", "Metronome", "Recording device"],
    objectives: ["Identify and reproduce rhythms", "Create simple patterns", "Maintain steady beat"],
    notes: "Start with simple patterns and gradually increase complexity. Use visual supports for rhythm notation.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Easy",
  },
  "17": {
    id: "17",
    title: "Money Management",
    description: "Practice using money in everyday situations",
    category: "Math",
    duration: "40 min",
    date: "June 2, 2024",
    time: "11:00 AM - 11:40 AM",
    lastRunDate: "May 11, 2024",
    location: "Classroom 104",
    participants: [
      {
        id: "3",
        name: "Hans Beckham",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Substantial",
        notes: "Needs concrete examples",
      },
      {
        id: "8",
        name: "Connor Douglas",
        avatar: "/placeholder.svg?height=50&width=50",
        supportLevel: "Full",
        notes: "Requires one-on-one support",
      },
    ],
    materials: ["Play money", "Price tags", "Shopping items", "Calculator", "Budget worksheets"],
    objectives: [
      "Identify currency values",
      "Calculate costs and change",
      "Make simple purchases",
      "Create basic budget",
    ],
    notes: "Use real-world scenarios relevant to participants' daily lives. Provide visual supports for calculations.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "Medium",
  },
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800"
    case "Medium":
      return "bg-blue-100 text-blue-800"
    case "Hard":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
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
      case "Memory":
        return "bg-[#63b7e6]"
      case "Attention":
        return "bg-[#FF5733]"
      case "Language":
        return "bg-[#e83e8c]"
      case "Executive":
        return "bg-[#23FBC5]"
      case "Cognitive":
        return "bg-[#4318FF]"
      case "Motor":
        return "bg-[#ffc107]"
      case "Problem":
        return "bg-[#17a2b8]"
      case "Emotional":
        return "bg-[#28a745]"
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
              className="flex items-center text-[#707eae] hover:text-[#63b7e6] mb-4"
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
                  <button className="text-[#707eae] hover:text-[#63b7e6]">
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
                  <Clock className="w-5 h-5 text-[#63b7e6] mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-[#8f9bba]">Duration</p>
                    <p className="text-[#2b3674] font-medium">{activity.duration}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-[#63b7e6] mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-[#8f9bba]">Last Run</p>
                    <p className="text-[#2b3674] font-medium">{activity.lastRunDate || "Not run yet"}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#63b7e6] mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-[#8f9bba]">Location</p>
                    <p className="text-[#2b3674] font-medium">{activity.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-[#63b7e6] mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-[#8f9bba]">Participants</p>
                    <p className="text-[#2b3674] font-medium">{activity.participants.length} registered</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div>
                    <p className="text-sm text-[#8f9bba]">Difficulty</p>
                    <div
                      className={`${getDifficultyColor(activity.difficulty)} px-2 py-0.5 rounded-full text-xs font-medium`}
                    >
                      {activity.difficulty}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Participants section with support levels */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#2b3674]">Participants & Support Needs</h2>
              <button className="flex items-center text-[#707eae] hover:text-[#63b7e6]">
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
                <button className="text-[#707eae] hover:text-[#63b7e6]">
                  <Pencil className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-2">
                {activity.materials.map((material, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-[#63b7e6] mt-2 mr-3"></div>
                    <span className="text-[#707eae]">{material}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Objectives */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-[#2b3674]">Objectives</h2>
                <button className="text-[#707eae] hover:text-[#63b7e6]">
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
              <button className="text-[#707eae] hover:text-[#63b7e6]">
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
