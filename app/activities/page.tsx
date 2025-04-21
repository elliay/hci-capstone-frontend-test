"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Info,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  Users,
  Check,
  Brain,
  Lightbulb,
  MessageSquare,
  HandMetal,
  Puzzle,
  Heart,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"

// Define activity type
interface Activity {
  id: string
  title: string
  description: string
  category:
    | "Art"
    | "Music"
    | "Math"
    | "Social"
    | "Memory"
    | "Cognitive"
    | "Executive"
    | "Attention"
    | "Language"
    | "Motor"
    | "Problem"
    | "Emotional"
  duration: string
  durationMinutes: number // For sorting purposes
  difficulty: "Easy" | "Medium" | "Hard" // New field
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

// Define participant type
interface Participant {
  id: string
  name: string
  interests?: string[]
  skillLevels?: {
    [key: string]: number
  }
}

export default function ActivitiesPage() {
  // Activity categories data
  const [activityCategories, setActivityCategories] = useState<ActivityCategory[]>([
    {
      id: "cat1",
      name: "Memory Skills",
      matchScore: 92,
      description: "Exercises to improve short-term and long-term memory recall",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "mem1",
          title: "Picture Recall",
          description: "Practice remembering details from images shown briefly",
          difficulty: "Beginner",
          duration: "20 min",
          participants: 6,
        },
        {
          id: "mem2",
          title: "Sequence Memory",
          description: "Remember and repeat increasingly complex sequences",
          difficulty: "Intermediate",
          duration: "30 min",
          participants: 4,
        },
        {
          id: "mem3",
          title: "Daily Journal Recall",
          description: "Practice recalling events from earlier in the day or week",
          difficulty: "Advanced",
          duration: "45 min",
          participants: 3,
        },
      ],
    },
    {
      id: "cat2",
      name: "Cognitive Processing",
      matchScore: 87,
      description: "Activities to improve information processing speed and accuracy",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "cog1",
          title: "Pattern Recognition",
          description: "Identify and complete visual or numerical patterns",
          difficulty: "Beginner",
          duration: "25 min",
          participants: 8,
        },
        {
          id: "cog2",
          title: "Reaction Time Games",
          description: "Practice responding quickly to visual or auditory cues",
          difficulty: "Intermediate",
          duration: "30 min",
          participants: 6,
        },
        {
          id: "cog3",
          title: "Multi-Step Processing",
          description: "Complete tasks requiring multiple cognitive steps",
          difficulty: "Advanced",
          duration: "40 min",
          participants: 4,
        },
      ],
    },
    {
      id: "cat3",
      name: "Executive Function",
      matchScore: 78,
      description: "Tasks that involve planning, organization, and decision-making",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "exec1",
          title: "Weekly Planning",
          description: "Create and organize a weekly schedule with priorities",
          difficulty: "Beginner",
          duration: "45 min",
          participants: 5,
        },
        {
          id: "exec2",
          title: "Multi-Task Challenge",
          description: "Practice managing multiple simple tasks simultaneously",
          difficulty: "Intermediate",
          duration: "35 min",
          participants: 4,
        },
        {
          id: "exec3",
          title: "Decision Matrix",
          description: "Learn to evaluate options using structured decision-making",
          difficulty: "Advanced",
          duration: "50 min",
          participants: 3,
        },
      ],
    },
    {
      id: "cat4",
      name: "Attention & Focus",
      matchScore: 75,
      description: "Concentration exercises and sustained attention activities",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "att1",
          title: "Focused Reading",
          description: "Practice reading with minimal distractions for increasing periods",
          difficulty: "Beginner",
          duration: "20 min",
          participants: 8,
        },
        {
          id: "att2",
          title: "Distraction Management",
          description: "Complete tasks while managing controlled distractions",
          difficulty: "Intermediate",
          duration: "30 min",
          participants: 6,
        },
        {
          id: "att3",
          title: "Dual Attention Tasks",
          description: "Practice dividing attention between two important tasks",
          difficulty: "Advanced",
          duration: "40 min",
          participants: 4,
        },
      ],
    },
    {
      id: "cat5",
      name: "Language & Communication",
      matchScore: 70,
      description: "Activities for verbal expression, comprehension, and social communication",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "lang1",
          title: "Word Finding Practice",
          description: "Exercises to improve word retrieval and vocabulary",
          difficulty: "Beginner",
          duration: "25 min",
          participants: 6,
        },
        {
          id: "lang2",
          title: "Conversation Skills",
          description: "Practice maintaining topic and turn-taking in conversations",
          difficulty: "Intermediate",
          duration: "40 min",
          participants: 8,
        },
        {
          id: "lang3",
          title: "Complex Instructions",
          description: "Follow increasingly complex verbal instructions",
          difficulty: "Advanced",
          duration: "35 min",
          participants: 4,
        },
      ],
    },
    {
      id: "cat6",
      name: "Fine Motor Skills",
      matchScore: 65,
      description: "Activities to improve dexterity, coordination, and precision movements",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "motor1",
          title: "Finger Dexterity",
          description: "Practice precise finger movements with small objects",
          difficulty: "Beginner",
          duration: "30 min",
          participants: 10,
        },
        {
          id: "motor2",
          title: "Handwriting Practice",
          description: "Improve control and precision in handwriting",
          difficulty: "Intermediate",
          duration: "25 min",
          participants: 6,
        },
        {
          id: "motor3",
          title: "Craft Projects",
          description: "Complete detailed craft projects requiring fine motor control",
          difficulty: "Advanced",
          duration: "60 min",
          participants: 4,
        },
      ],
    },
    {
      id: "cat7",
      name: "Problem-Solving",
      matchScore: 60,
      description: "Activities that encourage critical thinking and adaptive reasoning",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "prob1",
          title: "Logic Puzzles",
          description: "Solve increasingly complex logic and reasoning puzzles",
          difficulty: "Beginner",
          duration: "30 min",
          participants: 8,
        },
        {
          id: "prob2",
          title: "Everyday Solutions",
          description: "Develop strategies for common daily challenges",
          difficulty: "Intermediate",
          duration: "45 min",
          participants: 6,
        },
        {
          id: "prob3",
          title: "Group Problem-Solving",
          description: "Work collaboratively to solve complex problems",
          difficulty: "Advanced",
          duration: "60 min",
          participants: 5,
        },
      ],
    },
    {
      id: "cat8",
      name: "Emotional Regulation",
      matchScore: 55,
      description: "Activities to help manage emotions, stress, and build resilience",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "emot1",
          title: "Emotion Recognition",
          description: "Practice identifying emotions in self and others",
          difficulty: "Beginner",
          duration: "30 min",
          participants: 8,
        },
        {
          id: "emot2",
          title: "Stress Management",
          description: "Learn and practice various stress reduction techniques",
          difficulty: "Intermediate",
          duration: "45 min",
          participants: 6,
        },
        {
          id: "emot3",
          title: "Emotional Resilience",
          description: "Develop strategies for managing difficult emotions",
          difficulty: "Advanced",
          duration: "50 min",
          participants: 4,
        },
      ],
    },
    {
      id: "cat9",
      name: "Social Skills",
      matchScore: 50,
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
      id: "cat10",
      name: "Art Therapy",
      matchScore: 45,
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
      id: "cat11",
      name: "Music Therapy",
      matchScore: 40,
      description: "Rhythm, melody, and musical expression for cognitive stimulation",
      icon: "/placeholder.svg?height=40&width=40",
      suggestedActivities: [
        {
          id: "music1",
          title: "Rhythm Patterns",
          description: "Learn and reproduce simple rhythm patterns",
          difficulty: "Beginner",
          duration: "30 min",
          participants: 12,
        },
        {
          id: "music2",
          title: "Music and Memory",
          description: "Use familiar music to stimulate memory and recall",
          difficulty: "Intermediate",
          duration: "45 min",
          participants: 8,
        },
        {
          id: "music3",
          title: "Group Music Making",
          description: "Participate in simple group music creation",
          difficulty: "Advanced",
          duration: "60 min",
          participants: 6,
        },
      ],
    },
    {
      id: "cat12",
      name: "Math Skills",
      matchScore: 35,
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
  ])

  // Initial recent activities data
  const [recentActivities, setRecentActivities] = useState<Activity[]>([
    {
      id: "5",
      title: "Memory Card Match",
      description: "Practice short-term memory with card matching exercises",
      category: "Memory",
      duration: "25 min",
      durationMinutes: 25,
      difficulty: "Easy",
      daysAgo: "2d ago",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      title: "Attention Scanning",
      description: "Find specific items in a busy visual field",
      category: "Attention",
      duration: "30 min",
      durationMinutes: 30,
      difficulty: "Easy",
      daysAgo: "4d ago",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "7",
      title: "Word Association",
      description: "Practice verbal fluency and word retrieval",
      category: "Language",
      duration: "35 min",
      durationMinutes: 35,
      difficulty: "Medium",
      daysAgo: "8d ago",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "8",
      title: "Grocery Store Navigation",
      description: "Community outing with planning and navigation tasks",
      category: "Executive",
      duration: "120 min",
      durationMinutes: 120,
      difficulty: "Hard",
      daysAgo: "9d ago",
      by: "By Will Smith",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "9",
      title: "News Discussion Group",
      description: "Reading and discussing current events",
      category: "Social",
      duration: "45 min",
      durationMinutes: 45,
      difficulty: "Medium",
      daysAgo: "12d ago",
      by: "By Will Smith",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ])

  // All activities data (for the filterable section)
  const [allActivities, setAllActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Memory Card Match",
      description: "Practice short-term memory with card matching exercises",
      category: "Memory",
      duration: "25 min",
      durationMinutes: 25,
      difficulty: "Easy",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      title: "Sequential Instructions",
      description: "Follow multi-step instructions in order",
      category: "Cognitive",
      duration: "40 min",
      durationMinutes: 40,
      difficulty: "Medium",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      title: "Weekly Planner",
      description: "Create and organize a weekly schedule",
      category: "Executive",
      duration: "30 min",
      durationMinutes: 30,
      difficulty: "Easy",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      title: "Focused Reading",
      description: "Practice reading with minimal distractions",
      category: "Attention",
      duration: "35 min",
      durationMinutes: 35,
      difficulty: "Medium",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "10",
      title: "Conversation Practice",
      description: "Practice everyday social communication skills",
      category: "Language",
      duration: "45 min",
      durationMinutes: 45,
      difficulty: "Medium",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "11",
      title: "Finger Dexterity",
      description: "Practice precise finger movements with small objects",
      category: "Motor",
      duration: "25 min",
      durationMinutes: 25,
      difficulty: "Easy",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "12",
      title: "Logic Puzzles",
      description: "Solve increasingly complex logic puzzles",
      category: "Problem",
      duration: "20 min",
      durationMinutes: 20,
      difficulty: "Easy",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "13",
      title: "Emotion Recognition",
      description: "Practice identifying emotions in self and others",
      category: "Emotional",
      duration: "30 min",
      durationMinutes: 30,
      difficulty: "Easy",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "14",
      title: "Group Discussion",
      description: "Practice group conversation skills",
      category: "Social",
      duration: "60 min",
      durationMinutes: 60,
      difficulty: "Hard",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "15",
      title: "Watercolor Painting",
      description: "Express emotions through watercolor techniques",
      category: "Art",
      duration: "45 min",
      durationMinutes: 45,
      difficulty: "Medium",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "16",
      title: "Rhythm Patterns",
      description: "Learn and reproduce simple rhythm patterns",
      category: "Music",
      duration: "30 min",
      durationMinutes: 30,
      difficulty: "Easy",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "17",
      title: "Money Management",
      description: "Practice using money in everyday situations",
      category: "Math",
      duration: "40 min",
      durationMinutes: 40,
      difficulty: "Medium",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ])

  // Participant data with interests and skill levels
  const participantData: Participant[] = [
    {
      id: "1",
      name: "Luke Carter",
      interests: ["Memory", "Executive", "Math"],
      skillLevels: {
        Memory: 72,
        Executive: 42,
        Cognitive: 35,
        Attention: 50,
        Language: 60,
        Motor: 65,
        Problem: 45,
        Emotional: 55,
        Social: 40,
        Art: 30,
        Music: 25,
        Math: 70,
      },
    },
    {
      id: "2",
      name: "Jack Hughes",
      interests: ["Cognitive", "Memory", "Problem"],
      skillLevels: {
        Memory: 85,
        Executive: 70,
        Cognitive: 75,
        Attention: 65,
        Language: 60,
        Motor: 55,
        Problem: 80,
        Emotional: 50,
        Social: 45,
        Art: 40,
        Music: 78,
        Math: 85,
      },
    },
    {
      id: "3",
      name: "Hans Beckham",
      interests: ["Attention", "Problem", "Math"],
      skillLevels: {
        Memory: 60,
        Executive: 55,
        Cognitive: 70,
        Attention: 80,
        Language: 45,
        Motor: 50,
        Problem: 75,
        Emotional: 40,
        Social: 35,
        Art: 55,
        Music: 40,
        Math: 80,
      },
    },
    {
      id: "4",
      name: "Mary Jarris",
      interests: ["Language", "Social", "Emotional"],
      skillLevels: {
        Memory: 65,
        Executive: 70,
        Cognitive: 60,
        Attention: 55,
        Language: 85,
        Motor: 50,
        Problem: 65,
        Emotional: 75,
        Social: 80,
        Art: 65,
        Music: 75,
        Math: 60,
      },
    },
    {
      id: "5",
      name: "Hilary Canes",
      interests: ["Motor", "Art", "Social"],
      skillLevels: {
        Memory: 55,
        Executive: 60,
        Cognitive: 65,
        Attention: 70,
        Language: 75,
        Motor: 85,
        Problem: 60,
        Emotional: 70,
        Social: 75,
        Art: 80,
        Music: 60,
        Math: 65,
      },
    },
    {
      id: "6",
      name: "McArthur Jin",
      interests: ["Executive", "Problem", "Art"],
      skillLevels: {
        Memory: 70,
        Executive: 85,
        Cognitive: 75,
        Attention: 65,
        Language: 60,
        Motor: 80,
        Problem: 75,
        Emotional: 55,
        Social: 70,
        Art: 90,
        Music: 65,
        Math: 75,
      },
    },
    {
      id: "7",
      name: "Harry Zhang",
      interests: ["Music", "Emotional", "Social"],
      skillLevels: {
        Memory: 60,
        Executive: 65,
        Cognitive: 70,
        Attention: 75,
        Language: 80,
        Motor: 65,
        Problem: 60,
        Emotional: 85,
        Social: 85,
        Art: 60,
        Music: 90,
        Math: 75,
      },
    },
    {
      id: "8",
      name: "Connor Douglas",
      interests: ["Cognitive", "Memory", "Attention"],
      skillLevels: {
        Memory: 75,
        Executive: 50,
        Cognitive: 70,
        Attention: 65,
        Language: 55,
        Motor: 60,
        Problem: 65,
        Emotional: 50,
        Social: 60,
        Art: 70,
        Music: 50,
        Math: 60,
      },
    },
  ]

  // State for present participants
  const [presentParticipants, setPresentParticipants] = useState<Participant[]>([])

  // Load attendance data from localStorage and update present participants
  useEffect(() => {
    const savedAttendance = localStorage.getItem("participantAttendance")

    if (savedAttendance) {
      try {
        const attendanceData = JSON.parse(savedAttendance)

        // Filter participants who are present
        const present = participantData.filter((participant) => attendanceData[participant.id] === true)

        setPresentParticipants(present)

        // Update activity categories based on present participants
        if (present.length > 0) {
          updateActivityCategories(present)
        }
      } catch (error) {
        console.error("Error loading attendance data:", error)
      }
    }
  }, [])

  // Function to update activity categories based on present participants
  const updateActivityCategories = (presentParticipants: Participant[]) => {
    // Calculate interest distribution
    const interestCounts: Record<string, number> = {
      Memory: 0,
      Cognitive: 0,
      Executive: 0,
      Attention: 0,
      Language: 0,
      Motor: 0,
      Problem: 0,
      Emotional: 0,
      Social: 0,
      Art: 0,
      Music: 0,
      Math: 0,
    }

    // Count interests
    presentParticipants.forEach((participant) => {
      participant.interests?.forEach((interest) => {
        interestCounts[interest] = (interestCounts[interest] || 0) + 1
      })
    })

    // Calculate average skill levels
    const skillSums: Record<string, number> = {
      Memory: 0,
      Cognitive: 0,
      Executive: 0,
      Attention: 0,
      Language: 0,
      Motor: 0,
      Problem: 0,
      Emotional: 0,
      Social: 0,
      Art: 0,
      Music: 0,
      Math: 0,
    }

    presentParticipants.forEach((participant) => {
      if (participant.skillLevels) {
        Object.entries(participant.skillLevels).forEach(([skill, level]) => {
          skillSums[skill] = (skillSums[skill] || 0) + level
        })
      }
    })

    const skillAverages: Record<string, number> = {}
    Object.keys(skillSums).forEach((skill) => {
      skillAverages[skill] =
        presentParticipants.length > 0 ? Math.round(skillSums[skill] / presentParticipants.length) : 0
    })

    // Update category match scores based on interests and skill levels
    const updatedCategories = [...activityCategories].map((category) => {
      let matchScore = 0
      let categoryName = ""

      switch (category.id) {
        case "cat1": // Memory Skills
          categoryName = "Memory"
          break
        case "cat2": // Cognitive Processing
          categoryName = "Cognitive"
          break
        case "cat3": // Executive Function
          categoryName = "Executive"
          break
        case "cat4": // Attention & Focus
          categoryName = "Attention"
          break
        case "cat5": // Language & Communication
          categoryName = "Language"
          break
        case "cat6": // Fine Motor Skills
          categoryName = "Motor"
          break
        case "cat7": // Problem-Solving
          categoryName = "Problem"
          break
        case "cat8": // Emotional Regulation
          categoryName = "Emotional"
          break
        case "cat9": // Social Skills
          categoryName = "Social"
          break
        case "cat10": // Art Therapy
          categoryName = "Art"
          break
        case "cat11": // Music Therapy
          categoryName = "Music"
          break
        case "cat12": // Math Skills
          categoryName = "Math"
          break
      }

      // Calculate match score based on interest count and skill level
      const interestCount = interestCounts[categoryName] || 0
      const skillLevel = skillAverages[categoryName] || 0

      // Weight: 60% interests, 40% skill level
      matchScore = Math.round((interestCount / presentParticipants.length) * 60 + (skillLevel / 100) * 40)

      // Ensure score is between 0-100
      matchScore = Math.min(100, Math.max(0, matchScore))

      // If no participants are present, keep original scores
      if (presentParticipants.length === 0) {
        return category
      }

      return {
        ...category,
        matchScore: matchScore,
      }
    })

    // Sort categories by match score
    updatedCategories.sort((a, b) => b.matchScore - a.matchScore)

    setActivityCategories(updatedCategories)
  }

  // State for active filter
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Add new state variables for sorting and filtering
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc") // Default to ascending alphabetical
  const [sortBy, setSortBy] = useState<"title" | "duration">("title") // Default to sort by title
  const [difficultyFilter, setDifficultyFilter] = useState<"Easy" | "Medium" | "Hard" | null>(null)

  // State for expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  // New state for dropdown menus
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [difficultyDropdownOpen, setDifficultyDropdownOpen] = useState(false)

  // Refs for dropdown menus to handle outside clicks
  const sortDropdownRef = useRef<HTMLDivElement>(null)
  const categoryDropdownRef = useRef<HTMLDivElement>(null)
  const difficultyDropdownRef = useRef<HTMLDivElement>(null)

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setSortDropdownOpen(false)
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false)
      }
      if (difficultyDropdownRef.current && !difficultyDropdownRef.current.contains(event.target as Node)) {
        setDifficultyDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryId]: !expandedCategories[categoryId],
    })
  }

  // Update the filteredActivities logic to include sorting and difficulty filtering
  const filteredActivities = useMemo(() => {
    let filtered = [...allActivities]

    // Apply category filter
    if (activeFilter) {
      filtered = filtered.filter((activity) => activity.category === activeFilter)
    }

    // Apply difficulty filter
    if (difficultyFilter) {
      filtered = filtered.filter((activity) => activity.difficulty === difficultyFilter)
    }

    // Apply sorting
    if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === "duration") {
      filtered.sort((a, b) => a.durationMinutes - b.durationMinutes)
    }

    // Apply sort order
    if (sortOrder === "desc") {
      filtered.reverse()
    }

    return filtered
  }, [allActivities, activeFilter, difficultyFilter, sortBy, sortOrder])

  // Function to handle filter click
  const handleFilterClick = (category: string | null) => {
    setActiveFilter(category)
    setCategoryDropdownOpen(false)
  }

  // Function to handle difficulty filter click
  const handleDifficultyFilterClick = (difficulty: "Easy" | "Medium" | "Hard" | null) => {
    setDifficultyFilter(difficulty)
    setDifficultyDropdownOpen(false)
  }

  // Function to handle sort change
  const handleSortChange = (by: "title" | "duration", order: "asc" | "desc") => {
    setSortBy(by)
    setSortOrder(order)
    setSortDropdownOpen(false)
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Memory":
        return "bg-[#63b7e6]"
      case "Cognitive":
        return "bg-[#4318FF]"
      case "Executive":
        return "bg-[#23FBC5]"
      case "Attention":
        return "bg-[#FF5733]"
      case "Language":
        return "bg-[#e83e8c]"
      case "Motor":
        return "bg-[#ffc107]"
      case "Problem":
        return "bg-[#17a2b8]"
      case "Emotional":
        return "bg-[#28a745]"
      case "Social":
        return "bg-[#6c757d]"
      case "Art":
        return "bg-[#fd7e14]"
      case "Music":
        return "bg-[#6f42c1]"
      case "Math":
        return "bg-[#20c997]"
      default:
        return "bg-gray-400"
    }
  }

  // Get icon background color
  const getIconBgColor = (category: string) => {
    switch (category) {
      case "Memory":
        return "bg-gradient-to-br from-blue-300 to-cyan-500"
      case "Cognitive":
        return "bg-gradient-to-br from-indigo-300 to-purple-500"
      case "Executive":
        return "bg-gradient-to-br from-green-300 to-teal-500"
      case "Attention":
        return "bg-gradient-to-br from-orange-300 to-red-400"
      case "Language":
        return "bg-gradient-to-br from-pink-300 to-rose-500"
      case "Motor":
        return "bg-gradient-to-br from-yellow-300 to-amber-500"
      case "Problem":
        return "bg-gradient-to-br from-cyan-300 to-sky-500"
      case "Emotional":
        return "bg-gradient-to-br from-green-300 to-emerald-500"
      case "Social":
        return "bg-gradient-to-br from-gray-300 to-slate-500"
      case "Art":
        return "bg-gradient-to-br from-orange-300 to-amber-500"
      case "Music":
        return "bg-gradient-to-br from-purple-300 to-violet-500"
      case "Math":
        return "bg-gradient-to-br from-teal-300 to-emerald-500"
      default:
        return "bg-gradient-to-br from-gray-300 to-gray-500"
    }
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Memory":
        return <Brain className="w-5 h-5" />
      case "Cognitive":
        return <Lightbulb className="w-5 h-5" />
      case "Executive":
        return <Puzzle className="w-5 h-5" />
      case "Attention":
        return <Search className="w-5 h-5" />
      case "Language":
        return <MessageSquare className="w-5 h-5" />
      case "Motor":
        return <HandMetal className="w-5 h-5" />
      case "Problem":
        return <Puzzle className="w-5 h-5" />
      case "Emotional":
        return <Heart className="w-5 h-5" />
      default:
        return null
    }
  }

  // Add a function to get difficulty color
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

  const getNewDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500 bg-green-50"
      case "Medium":
        return "text-blue-500 bg-blue-50"
      case "Hard":
        return "text-purple-500 bg-purple-50"
      default:
        return "text-gray-500 bg-gray-50"
    }
  }

  // Calculate interest distribution percentages for present participants
  const calculateInterestDistribution = () => {
    if (presentParticipants.length === 0) {
      return {
        Memory: 25,
        Cognitive: 20,
        Executive: 15,
        Attention: 10,
        Language: 8,
        Motor: 7,
        Problem: 5,
        Emotional: 4,
        Social: 3,
        Art: 1,
        Music: 1,
        Math: 1,
      }
    }

    const interestCounts: Record<string, number> = {
      Memory: 0,
      Cognitive: 0,
      Executive: 0,
      Attention: 0,
      Language: 0,
      Motor: 0,
      Problem: 0,
      Emotional: 0,
      Social: 0,
      Art: 0,
      Music: 0,
      Math: 0,
    }

    presentParticipants.forEach((participant) => {
      participant.interests?.forEach((interest) => {
        interestCounts[interest] = (interestCounts[interest] || 0) + 1
      })
    })

    const totalInterests = Object.values(interestCounts).reduce((sum, count) => sum + count, 0)

    const percentages: Record<string, number> = {}
    Object.entries(interestCounts).forEach(([interest, count]) => {
      percentages[interest] = Math.round((count / totalInterests) * 100)
    })

    return percentages
  }

  const interestDistribution = calculateInterestDistribution()

  // Get sort label
  const getSortLabel = () => {
    if (sortBy === "title") {
      return `Name (${sortOrder === "asc" ? "A-Z" : "Z-A"})`
    } else {
      return `Duration (${sortOrder === "asc" ? "Shortest" : "Longest"})`
    }
  }

  // Get category label
  const getCategoryLabel = () => {
    if (!activeFilter) return "All Categories"
    return activeFilter
  }

  // Get difficulty label
  const getDifficultyLabel = () => {
    if (!difficultyFilter) return "All Difficulties"
    return difficultyFilter
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
                  className="pl-10 pr-4 py-2 rounded-full bg-white border border-[#e0e5f2] w-64 focus:outline-none focus:ring-2 focus:ring-[#63b7e6] focus:border-transparent"
                />
              </div>
              <button className="w-10 h-10 rounded-full bg-white border border-[#e0e5f2] flex items-center justify-center">
                <Info className="w-5 h-5 text-[#8f9bba]" />
              </button>
            </div>
          </div>

          {/* Present Participants Summary */}
          {presentParticipants.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-[#2b3674]">Today's Attendees</h2>
                <Link href="/participants">
                  <button className="text-[#63B7E6] text-sm font-medium">Manage Attendance</button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {presentParticipants.map((participant) => (
                  <div key={participant.id} className="flex items-center bg-[#f4f7fe] rounded-full px-3 py-1">
                    <div className="w-6 h-6 rounded-full bg-[#63B7E6] flex items-center justify-center text-white text-xs mr-2">
                      {participant.name.charAt(0)}
                    </div>
                    <span className="text-sm text-[#2b3674]">{participant.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-sm text-[#707eae]">
                Activities are personalized based on these {presentParticipants.length} participants.
              </div>
            </div>
          )}

          {/* Top Row: Suggested and Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Suggested Activities Section (Categories) */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#2b3674]">Suggested Activity Categories</h2>
                  {presentParticipants.length > 0 ? (
                    <p className="text-xs text-[#707eae] mt-1">
                      Match scores based on {presentParticipants.length} attendee
                      {presentParticipants.length !== 1 ? "s" : ""} present today
                    </p>
                  ) : (
                    <p className="text-xs text-[#707eae] mt-1">Match scores based on all participant profiles</p>
                  )}
                </div>
                <div className="flex items-center">
                  <button className="text-[#707eae] hover:text-[#63b7e6] p-1 rounded-full">
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#e0e5f2] scrollbar-track-transparent">
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
                            <div className="flex items-center bg-[#63B7E6] bg-opacity-10 text-[#63B7E6] text-xs font-medium px-2 py-1 rounded-full">
                              <Star className="w-3 h-3 mr-1" />
                              <span>{category.matchScore}% Interest Match</span>
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
                              className="p-3 bg-[#f4f7fe] rounded-lg border border-[#e0e5f2] hover:border-[#63B7E6] transition-colors"
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
                <h3 className="text-sm font-medium text-[#707eae] mb-3">
                  {presentParticipants.length > 0
                    ? "Today's Attendees Interest Distribution"
                    : "Participant Interest Distribution"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(interestDistribution)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 6)
                    .map(([skill, percentage]) => (
                      <div key={skill} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${getCategoryColor(skill)} mr-2`}></div>
                          <span className="text-sm text-[#707eae]">{skill} Skills</span>
                        </div>
                        <span className="text-sm font-medium text-[#2b3674]">{percentage}%</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Recent Activities Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#2b3674]">Recent Activities</h2>
                <button className="text-[#63B7E6] text-sm font-medium">See all</button>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <div
                        className={`w-12 h-12 flex-shrink-0 rounded-lg ${getIconBgColor(
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
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-wrap">
                            <h3 className="text-[#1b2559] font-medium mr-2">{activity.title}</h3>
                            {activity.daysAgo && <span className="text-xs text-[#8f9bba]">{activity.daysAgo}</span>}
                            <div
                              className={`${getDifficultyColor(activity.difficulty)} text-xs px-2 py-0.5 rounded-full ml-2 flex-shrink-0`}
                            >
                              {activity.difficulty}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-[#707eae] truncate max-w-full">{activity.description}</p>
                        <div className="flex items-center text-xs text-[#707eae] mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{activity.duration}</span>
                          {activity.by && <span className="ml-2">{activity.by}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <Link href={`/activities/${activity.id}`}>
                        <button className="bg-white text-[#63B7E6] px-3 py-1.5 text-sm rounded-lg border border-[#e0e5f2] hover:bg-[#f4f7fe] transition-colors flex items-center">
                          <span className="mr-1">View</span>
                          <ArrowRight className="w-3.5 h-3.5" />
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

              {/* Replace the existing filter buttons with dropdown menus */}
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative" ref={sortDropdownRef}>
                  <button
                    className="px-4 py-2 rounded-lg bg-white border border-[#e0e5f2] text-[#707eae] flex items-center gap-2"
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  >
                    <span>Sort: {getSortLabel()}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {sortDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10 border border-[#e0e5f2]">
                      <div className="p-2">
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            sortBy === "title" && sortOrder === "asc"
                              ? "bg-[#f4f7fe] text-[#63B7E6]"
                              : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleSortChange("title", "asc")}
                        >
                          <span>Name (A-Z)</span>
                          {sortBy === "title" && sortOrder === "asc" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            sortBy === "title" && sortOrder === "desc"
                              ? "bg-[#f4f7fe] text-[#63B7E6]"
                              : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleSortChange("title", "desc")}
                        >
                          <span>Name (Z-A)</span>
                          {sortBy === "title" && sortOrder === "desc" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            sortBy === "duration" && sortOrder === "asc"
                              ? "bg-[#f4f7fe] text-[#63B7E6]"
                              : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleSortChange("duration", "asc")}
                        >
                          <span>Duration (Shortest)</span>
                          {sortBy === "duration" && sortOrder === "asc" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            sortBy === "duration" && sortOrder === "desc"
                              ? "bg-[#f4f7fe] text-[#63B7E6]"
                              : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleSortChange("duration", "desc")}
                        >
                          <span>Duration (Longest)</span>
                          {sortBy === "duration" && sortOrder === "desc" && <Check className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Category Dropdown */}
                <div className="relative" ref={categoryDropdownRef}>
                  <button
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      activeFilter
                        ? `${getCategoryColor(activeFilter)} text-white`
                        : "bg-white border border-[#e0e5f2] text-[#707eae]"
                    }`}
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  >
                    <span>Category: {getCategoryLabel()}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {categoryDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10 border border-[#e0e5f2] max-h-96 overflow-y-auto">
                      <div className="p-2">
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === null ? "bg-[#f4f7fe] text-[#63B7E6]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick(null)}
                        >
                          <span>All Categories</span>
                          {activeFilter === null && <Check className="w-4 h-4" />}
                        </button>

                        {/* Rehabilitation Categories */}
                        <div className="mt-1 mb-1 px-3 text-xs font-semibold text-[#707eae]">Rehabilitation Skills</div>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === "Memory" ? "bg-[#f4f7fe] text-[#63b7e6]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick("Memory")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#63b7e6] mr-2"></div>
                            <span>Memory</span>
                          </div>
                          {activeFilter === "Memory" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === "Cognitive" ? "bg-[#f4f7fe] text-[#4318FF]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick("Cognitive")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#4318FF] mr-2"></div>
                            <span>Cognitive Processing</span>
                          </div>
                          {activeFilter === "Cognitive" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === "Executive" ? "bg-[#f4f7fe] text-[#23FBC5]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick("Executive")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#23FBC5] mr-2"></div>
                            <span>Executive Function</span>
                          </div>
                          {activeFilter === "Executive" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === "Attention" ? "bg-[#f4f7fe] text-[#FF5733]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick("Attention")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#FF5733] mr-2"></div>
                            <span>Attention & Focus</span>
                          </div>
                          {activeFilter === "Attention" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === "Language" ? "bg-[#f4f7fe] text-[#e83e8c]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick("Language")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#e83e8c] mr-2"></div>
                            <span>Language & Communication</span>
                          </div>
                          {activeFilter === "Language" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === "Motor" ? "bg-[#f4f7fe] text-[#ffc107]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick("Motor")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#ffc107] mr-2"></div>
                            <span>Fine Motor Skills</span>
                          </div>
                          {activeFilter === "Motor" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === "Problem" ? "bg-[#f4f7fe] text-[#17a2b8]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick("Problem")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#17a2b8] mr-2"></div>
                            <span>Problem-Solving</span>
                          </div>
                          {activeFilter === "Problem" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === "Emotional" ? "bg-[#f4f7fe] text-[#28a745]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick("Emotional")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#28a745] mr-2"></div>
                            <span>Emotional Regulation</span>
                          </div>
                          {activeFilter === "Emotional" && <Check className="w-4 h-4" />}
                        </button>

                        {/* Other Categories */}
                        <div className="mt-1 mb-1 px-3 text-xs font-semibold text-[#707eae]">Other Skills</div>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === "Social" ? "bg-[#f4f7fe] text-[#6c757d]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick("Social")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#6c757d] mr-2"></div>
                            <span>Social</span>
                          </div>
                          {activeFilter === "Social" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === "Art" ? "bg-[#f4f7fe] text-[#fd7e14]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick("Art")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#fd7e14] mr-2"></div>
                            <span>Art</span>
                          </div>
                          {activeFilter === "Art" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === "Music" ? "bg-[#f4f7fe] text-[#6f42c1]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick("Music")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#6f42c1] mr-2"></div>
                            <span>Music</span>
                          </div>
                          {activeFilter === "Music" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeFilter === "Math" ? "bg-[#f4f7fe] text-[#20c997]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleFilterClick("Math")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#20c997] mr-2"></div>
                            <span>Math</span>
                          </div>
                          {activeFilter === "Math" && <Check className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Difficulty Dropdown */}
                <div className="relative" ref={difficultyDropdownRef}>
                  <button
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      difficultyFilter
                        ? `${getDifficultyColor(difficultyFilter)}`
                        : "bg-white border border-[#e0e5f2] text-[#707eae]"
                    }`}
                    onClick={() => setDifficultyDropdownOpen(!difficultyDropdownOpen)}
                  >
                    <span>Difficulty: {getDifficultyLabel()}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {difficultyDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-[#e0e5f2]">
                      <div className="p-2">
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            difficultyFilter === null ? "bg-[#f4f7fe] text-[#63B7E6]" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleDifficultyFilterClick(null)}
                        >
                          <span>All Difficulties</span>
                          {difficultyFilter === null && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            difficultyFilter === "Easy" ? "bg-[#f4f7fe] text-green-500" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleDifficultyFilterClick("Easy")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span>Easy</span>
                          </div>
                          {difficultyFilter === "Easy" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            difficultyFilter === "Medium" ? "bg-[#f4f7fe] text-blue-500" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleDifficultyFilterClick("Medium")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span>Medium</span>
                          </div>
                          {difficultyFilter === "Medium" && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            difficultyFilter === "Hard" ? "bg-[#f4f7fe] text-purple-500" : "hover:bg-[#f4f7fe]"
                          }`}
                          onClick={() => handleDifficultyFilterClick("Hard")}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                            <span>Hard</span>
                          </div>
                          {difficultyFilter === "Hard" && <Check className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <Link href={`/activities/${activity.id}`} key={activity.id}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-40 bg-[#f4f4f4] relative">
                      <div className={`absolute inset-0 ${getIconBgColor(activity.category)} opacity-20`}></div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <div
                          className={`${getCategoryColor(
                            activity.category,
                          )} text-white px-3 py-1 rounded-full text-xs font-medium`}
                        >
                          {activity.category}
                        </div>
                        <div
                          className={`${getDifficultyColor(
                            activity.difficulty,
                          )} px-3 py-1 rounded-full text-xs font-medium`}
                        >
                          {activity.difficulty}
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
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-[#707eae] mr-1" />
                          <p className="text-xs text-[#707eae]">{activity.duration}</p>
                        </div>
                        <button className="text-[#63B7E6] hover:text-[#4a9fd0] transition-colors">
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
