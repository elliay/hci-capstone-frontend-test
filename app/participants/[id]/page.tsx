"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Pencil, MoreHorizontal, ChevronRight, Plus, Check, ChevronDown, ChevronUp } from "lucide-react"

// Define subgoal type
interface Subgoal {
  id: string
  name: string
  isCompleted: boolean
  dateCompleted?: string
  notes?: string
}

// Define goal type with subgoals
interface Goal {
  id: string
  name: string
  progress: number
  subgoals: Subgoal[]
}

// First, let's update the ParticipantProfile interface to include the new data fields

// Add these new interfaces after the existing interfaces but before the ParticipantProfile interface:

interface FactSheet {
  staffNotes: string
  hobbies: string
  favoriteColor: string
  favoriteFood: string
  favoriteArtist: string
  pets: string
  dislikes: string
  favoriteSportsTeam: string
}

interface Project {
  id: string
  title: string
  category: string
  image: string
  date: string
  description?: string
}

// Update the ParticipantProfile interface to include factSheet and projects
interface ParticipantProfile {
  id: string
  name: string
  joinedDate: string
  birthdate: string
  avatar: string
  generalInfo: string
  assistiveTechnology: string
  workHistory: string
  hometown: string
  birthday: string
  skills: {
    name: string
    value: number
    color: string
  }[]
  goals: Goal[]
  thingsToKeepInMind: string[]
  factSheet: FactSheet
  projects: Project[]
}

// Sample participant profiles data with subgoals
const participantProfiles: Record<string, ParticipantProfile> = {
  "1": {
    id: "1",
    name: "Luke Carter",
    joinedDate: "Joined March, 16th 2024",
    birthdate: "Birthdate: Jun 20th 1966",
    avatar: "/placeholder.svg?height=400&width=400",
    generalInfo:
      "Luke is currently working on improving his social skills. He has made significant progress in group settings and is now focusing on one-on-one interactions and maintaining conversations for longer periods.",
    assistiveTechnology: "Speech Recognition Software",
    workHistory: "Retail Associate",
    hometown: "Portland, OR",
    birthday: "June 20, 1966",
    skills: [
      { name: "Functioning Skills", value: 72, color: "#63b7e6" },
      { name: "Communication", value: 45, color: "#ff5733" },
      { name: "Personal Adjustment", value: 83, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 67, color: "#ffc107" },
      { name: "Safety Knowledge", value: 91, color: "#17a2b8" },
      { name: "Mobility Skills", value: 58, color: "#ffc107" },
      { name: "Socialization", value: 42, color: "#28a745" },
      { name: "Community Integration", value: 61, color: "#ff5733" },
    ],
    goals: [
      {
        id: "g1",
        name: "Public Transportation",
        progress: 65,
        subgoals: [
          {
            id: "sg1-1",
            name: "Register for a bus card",
            isCompleted: true,
            dateCompleted: "2024-04-10",
            notes: "Completed with assistance. Luke remembered his ID and completed the form independently.",
          },
          {
            id: "sg1-2",
            name: "Learn to read bus schedule",
            isCompleted: true,
            dateCompleted: "2024-04-15",
            notes: "Can identify route numbers and times with minimal assistance.",
          },
          {
            id: "sg1-3",
            name: "Practice boarding and exiting bus",
            isCompleted: true,
            dateCompleted: "2024-04-22",
            notes: "Needs reminders about pulling the stop cord.",
          },
          {
            id: "sg1-4",
            name: "Navigate to grocery store independently",
            isCompleted: false,
            notes: "Scheduled for next week.",
          },
          {
            id: "sg1-5",
            name: "Navigate to work independently",
            isCompleted: false,
            notes: "Will attempt after grocery store trip is successful.",
          },
        ],
      },
      {
        id: "g2",
        name: "Money Management",
        progress: 40,
        subgoals: [
          {
            id: "sg2-1",
            name: "Identify different denominations",
            isCompleted: true,
            dateCompleted: "2024-03-05",
            notes: "Can identify all bills and coins consistently.",
          },
          {
            id: "sg2-2",
            name: "Count change correctly",
            isCompleted: true,
            dateCompleted: "2024-03-20",
            notes: "Occasional errors with larger amounts.",
          },
          {
            id: "sg2-3",
            name: "Create a simple budget",
            isCompleted: false,
            notes: "Started working on this but needs more practice.",
          },
          {
            id: "sg2-4",
            name: "Use ATM independently",
            isCompleted: false,
            notes: "Not yet attempted.",
          },
          {
            id: "sg2-5",
            name: "Track expenses for one month",
            isCompleted: false,
            notes: "Will begin after budget creation is mastered.",
          },
        ],
      },
      {
        id: "g3",
        name: "Social Interaction",
        progress: 75,
        subgoals: [
          {
            id: "sg3-1",
            name: "Maintain eye contact during conversations",
            isCompleted: true,
            dateCompleted: "2024-02-10",
            notes: "Consistent improvement observed.",
          },
          {
            id: "sg3-2",
            name: "Ask appropriate follow-up questions",
            isCompleted: true,
            dateCompleted: "2024-02-28",
            notes: "Does well in structured settings.",
          },
          {
            id: "sg3-3",
            name: "Initiate conversations with peers",
            isCompleted: true,
            dateCompleted: "2024-03-15",
            notes: "Growing confidence observed.",
          },
          {
            id: "sg3-4",
            name: "Participate in group discussions",
            isCompleted: true,
            dateCompleted: "2024-04-05",
            notes: "Actively contributes in small groups.",
          },
          {
            id: "sg3-5",
            name: "Handle disagreements appropriately",
            isCompleted: false,
            notes: "Working on using 'I' statements and staying calm.",
          },
        ],
      },
    ],
    thingsToKeepInMind: [
      "Prefers structured environments",
      "Responds well to visual cues",
      "May need extra time to process verbal instructions",
    ],
    factSheet: {
      staffNotes:
        "Luke talks about his favorite sports teams all the time and loves the color blue. He gets excited about Buffalo Bills games and often wears team merchandise.",
      hobbies: "Painting, making music",
      favoriteColor: "Blue",
      favoriteFood: "Pizza",
      favoriteArtist: "Michael Jackson",
      pets: "Golden retriever named Max",
      dislikes: "Loud noises",
      favoriteSportsTeam: "Buffalo Bills",
    },
    projects: [
      {
        id: "p1",
        title: "Cards for Valentine's Day",
        category: "Art",
        image: "/placeholder.svg?height=100&width=100",
        date: "February 2024",
        description: "Created handmade cards for family members using watercolors and paper crafting techniques.",
      },
      {
        id: "p2",
        title: "Learning to Play the Guitar",
        category: "Music",
        image: "/placeholder.svg?height=100&width=100",
        date: "January 2024 - Present",
        description: "Weekly guitar lessons focusing on basic chords and simple songs.",
      },
      {
        id: "p3",
        title: "Collage",
        category: "Art",
        image: "/placeholder.svg?height=100&width=100",
        date: "December 2023",
        description: "Created a mixed-media collage representing personal interests and goals.",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Jack Hughes",
    joinedDate: "Joined April, 14th 2023",
    birthdate: "Birthdate: Sep 12th 1974",
    avatar: "/placeholder.svg?height=400&width=400",
    generalInfo:
      "Jack is focused on developing vocational skills. He has a background in construction but needed to transition to less physically demanding work after an injury. He's currently learning computer skills and office administration.",
    assistiveTechnology: "Ergonomic Workstation",
    workHistory: "Construction Worker",
    hometown: "Denver, CO",
    birthday: "September 12, 1974",
    skills: [
      { name: "Functioning Skills", value: 85, color: "#63b7e6" },
      { name: "Communication", value: 78, color: "#ff5733" },
      { name: "Personal Adjustment", value: 62, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 90, color: "#ffc107" },
      { name: "Safety Knowledge", value: 95, color: "#17a2b8" },
      { name: "Mobility Skills", value: 55, color: "#ffc107" },
      { name: "Socialization", value: 70, color: "#28a745" },
      { name: "Community Integration", value: 68, color: "#ff5733" },
    ],
    goals: [
      {
        id: "g1",
        name: "Computer Skills",
        progress: 45,
        subgoals: [
          {
            id: "sg1-1",
            name: "Basic computer operation",
            isCompleted: true,
            dateCompleted: "2023-06-15",
            notes: "Can turn on/off computer, use mouse and keyboard.",
          },
          {
            id: "sg1-2",
            name: "Email communication",
            isCompleted: true,
            dateCompleted: "2023-07-20",
            notes: "Can compose, send, and reply to emails.",
          },
          {
            id: "sg1-3",
            name: "Word processing basics",
            isCompleted: false,
            notes: "Working on formatting documents.",
          },
          {
            id: "sg1-4",
            name: "Spreadsheet basics",
            isCompleted: false,
            notes: "Not yet started.",
          },
          {
            id: "sg1-5",
            name: "Internet research skills",
            isCompleted: false,
            notes: "Can navigate websites but needs work on search techniques.",
          },
        ],
      },
      {
        id: "g2",
        name: "Job Application",
        progress: 80,
        subgoals: [
          {
            id: "sg2-1",
            name: "Create resume",
            isCompleted: true,
            dateCompleted: "2023-05-10",
            notes: "Resume completed and reviewed.",
          },
          {
            id: "sg2-2",
            name: "Write cover letter template",
            isCompleted: true,
            dateCompleted: "2023-05-25",
            notes: "Template created, needs customization for each application.",
          },
          {
            id: "sg2-3",
            name: "Complete online job applications",
            isCompleted: true,
            dateCompleted: "2023-06-30",
            notes: "Has completed several applications independently.",
          },
          {
            id: "sg2-4",
            name: "Practice interview skills",
            isCompleted: true,
            dateCompleted: "2023-08-15",
            notes: "Has participated in multiple mock interviews.",
          },
          {
            id: "sg2-5",
            name: "Follow up on applications",
            isCompleted: false,
            notes: "Working on appropriate follow-up communication.",
          },
        ],
      },
      {
        id: "g3",
        name: "Pain Management",
        progress: 60,
        subgoals: [
          {
            id: "sg3-1",
            name: "Identify pain triggers",
            isCompleted: true,
            dateCompleted: "2023-09-05",
            notes: "Has created a comprehensive list of activities that increase pain.",
          },
          {
            id: "sg3-2",
            name: "Learn stretching exercises",
            isCompleted: true,
            dateCompleted: "2023-10-10",
            notes: "Regularly performs recommended stretches.",
          },
          {
            id: "sg3-3",
            name: "Establish ergonomic workspace",
            isCompleted: true,
            dateCompleted: "2023-11-15",
            notes: "Workstation has been adjusted for optimal ergonomics.",
          },
          {
            id: "sg3-4",
            name: "Develop pain management plan",
            isCompleted: false,
            notes: "Working with physical therapist on comprehensive plan.",
          },
          {
            id: "sg3-5",
            name: "Implement regular exercise routine",
            isCompleted: false,
            notes: "Has started light exercise program.",
          },
        ],
      },
    ],
    thingsToKeepInMind: [
      "Physical limitations with prolonged standing",
      "Prefers hands-on learning approaches",
      "Interested in technology but may need extra guidance",
    ],
    factSheet: {
      staffNotes:
        "Jack frequently discusses his previous construction work and takes pride in his technical knowledge. He prefers practical, hands-on activities and responds well to clear, direct instructions.",
      hobbies: "Woodworking, fishing",
      favoriteColor: "Green",
      favoriteFood: "Steak",
      favoriteArtist: "Johnny Cash",
      pets: "Used to have a black lab named Duke",
      dislikes: "Crowded places",
      favoriteSportsTeam: "Denver Broncos",
    },
    projects: [
      {
        id: "p1",
        title: "Basic Computer Skills",
        category: "Technology",
        image: "/placeholder.svg?height=100&width=100",
        date: "March 2024",
        description:
          "Completed introductory computer skills course covering email, word processing, and internet browsing.",
      },
      {
        id: "p2",
        title: "Office Administration Workshop",
        category: "Vocational",
        image: "/placeholder.svg?height=100&width=100",
        date: "February 2024",
        description: "Participated in a 4-week workshop on basic office administration skills.",
      },
      {
        id: "p3",
        title: "Woodworking Project",
        category: "Crafts",
        image: "/placeholder.svg?height=100&width=100",
        date: "December 2023",
        description: "Built a small bookshelf using adaptive tools to accommodate physical limitations.",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Hans Beckham",
    joinedDate: "Joined January, 7th 2025",
    birthdate: "Birthdate: Oct 9th 1998",
    avatar: "/placeholder.svg?height=400&width=400",
    generalInfo:
      "Hans is a young adult with autism spectrum disorder who is working on independent living skills. He excels in mathematics and has a special interest in public transportation systems. He's currently focusing on daily living skills and social interactions.",
    assistiveTechnology: "Communication App",
    workHistory: "Data Entry Clerk",
    hometown: "Seattle, WA",
    birthday: "October 9, 1998",
    skills: [
      { name: "Functioning Skills", value: 68, color: "#63b7e6" },
      { name: "Communication", value: 45, color: "#ff5733" },
      { name: "Personal Adjustment", value: 55, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 72, color: "#ffc107" },
      { name: "Safety Knowledge", value: 80, color: "#17a2b8" },
      { name: "Mobility Skills", value: 90, color: "#ffc107" },
      { name: "Socialization", value: 35, color: "#28a745" },
      { name: "Community Integration", value: 50, color: "#ff5733" },
    ],
    goals: [
      {
        id: "g1",
        name: "Independent Living",
        progress: 55,
        subgoals: [
          {
            id: "sg1-1",
            name: "Meal preparation",
            isCompleted: true,
            dateCompleted: "2025-02-10",
            notes: "Can prepare simple meals with visual recipe guides.",
          },
          {
            id: "sg1-2",
            name: "Laundry skills",
            isCompleted: true,
            dateCompleted: "2025-02-25",
            notes: "Can sort, wash, dry, and fold clothes independently.",
          },
          {
            id: "sg1-3",
            name: "Household cleaning",
            isCompleted: true,
            dateCompleted: "2025-03-15",
            notes: "Follows cleaning checklist with minimal prompting.",
          },
          {
            id: "sg1-4",
            name: "Grocery shopping",
            isCompleted: false,
            notes: "Can shop with a list but needs support with budgeting.",
          },
          {
            id: "sg1-5",
            name: "Bill payment and financial management",
            isCompleted: false,
            notes: "Not yet started.",
          },
        ],
      },
      {
        id: "g2",
        name: "Social Skills",
        progress: 30,
        subgoals: [
          {
            id: "sg2-1",
            name: "Use appropriate greetings",
            isCompleted: true,
            dateCompleted: "2025-01-20",
            notes: "Consistently greets familiar people appropriately.",
          },
          {
            id: "sg2-2",
            name: "Maintain appropriate personal space",
            isCompleted: false,
            notes: "Still working on this skill in crowded environments.",
          },
          {
            id: "sg2-3",
            name: "Take turns in conversation",
            isCompleted: false,
            notes: "Tends to focus on topics of special interest.",
          },
          {
            id: "sg2-4",
            name: "Recognize facial expressions",
            isCompleted: false,
            notes: "Working with visual aids to improve recognition.",
          },
          {
            id: "sg2-5",
            name: "Participate in group activities",
            isCompleted: false,
            notes: "Participates briefly but often needs breaks.",
          },
        ],
      },
      {
        id: "g3",
        name: "Career Development",
        progress: 75,
        subgoals: [
          {
            id: "sg3-1",
            name: "Identify career interests",
            isCompleted: true,
            dateCompleted: "2025-01-15",
            notes: "Has expressed strong interest in data analysis and transportation planning.",
          },
          {
            id: "sg3-2",
            name: "Develop technical skills",
            isCompleted: true,
            dateCompleted: "2025-02-20",
            notes: "Completed online courses in Excel and basic programming.",
          },
          {
            id: "sg3-3",
            name: "Create portfolio of work",
            isCompleted: true,
            dateCompleted: "2025-03-10",
            notes: "Has compiled examples of data analysis projects.",
          },
          {
            id: "sg3-4",
            name: "Practice interview skills",
            isCompleted: true,
            dateCompleted: "2025-04-05",
            notes: "Has participated in mock interviews with accommodations.",
          },
          {
            id: "sg3-5",
            name: "Secure internship or volunteer position",
            isCompleted: false,
            notes: "Currently applying for positions.",
          },
        ],
      },
    ],
    thingsToKeepInMind: [
      "Sensitive to loud noises and bright lights",
      "Needs clear, direct instructions",
      "Excellent with numbers and patterns",
    ],
    factSheet: {
      staffNotes:
        "Hans has an exceptional memory for transportation schedules and routes. He becomes anxious in new environments but responds well to visual schedules and clear expectations.",
      hobbies: "Collecting train models, mathematics puzzles",
      favoriteColor: "Red",
      favoriteFood: "Chicken nuggets",
      favoriteArtist: "None specified",
      pets: "No pets (allergic to animal dander)",
      dislikes: "Unexpected changes, loud environments",
      favoriteSportsTeam: "Not interested in sports",
    },
    projects: [
      {
        id: "p1",
        title: "Public Transit Mapping",
        category: "Special Interest",
        image: "/placeholder.svg?height=100&width=100",
        date: "April 2024",
        description: "Created detailed maps of local bus routes with transfer points and schedules.",
      },
      {
        id: "p2",
        title: "Basic Cooking Skills",
        category: "Life Skills",
        image: "/placeholder.svg?height=100&width=100",
        date: "March 2024",
        description: "Learned to prepare five simple meals independently following visual recipes.",
      },
      {
        id: "p3",
        title: "Data Entry Internship",
        category: "Vocational",
        image: "/placeholder.svg?height=100&width=100",
        date: "January-February 2024",
        description: "Completed 6-week internship at local business performing basic data entry tasks.",
      },
    ],
  },
  "4": {
    id: "4",
    name: "Mary Jarris",
    joinedDate: "Joined February, 4th 2021",
    birthdate: "Birthdate: Nov 7th 1987",
    avatar: "/placeholder.svg?height=400&width=400",
    generalInfo:
      "Mary is recovering from a stroke that affected her left side mobility and speech. She was previously a teacher and is determined to return to work in an educational setting. She's making excellent progress with her rehabilitation.",
    assistiveTechnology: "Mobility Aids",
    workHistory: "Elementary School Teacher",
    hometown: "Chicago, IL",
    birthday: "November 7, 1987",
    skills: [
      { name: "Functioning Skills", value: 60, color: "#63b7e6" },
      { name: "Communication", value: 65, color: "#ff5733" },
      { name: "Personal Adjustment", value: 85, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 75, color: "#ffc107" },
      { name: "Safety Knowledge", value: 90, color: "#17a2b8" },
      { name: "Mobility Skills", value: 50, color: "#ffc107" },
      { name: "Socialization", value: 80, color: "#28a745" },
      { name: "Community Integration", value: 70, color: "#ff5733" },
    ],
    goals: [
      {
        id: "g1",
        name: "Speech Therapy",
        progress: 70,
        subgoals: [
          {
            id: "sg1-1",
            name: "Articulation exercises",
            isCompleted: true,
            dateCompleted: "2021-03-15",
            notes: "Daily practice showing consistent improvement.",
          },
          {
            id: "sg1-2",
            name: "Word-finding strategies",
            isCompleted: true,
            dateCompleted: "2021-04-20",
            notes: "Has developed effective compensatory strategies.",
          },
          {
            id: "sg1-3",
            name: "Sentence formation",
            isCompleted: true,
            dateCompleted: "2021-06-10",
            notes: "Can form complex sentences with occasional pauses.",
          },
          {
            id: "sg1-4",
            name: "Conversation practice",
            isCompleted: true,
            dateCompleted: "2021-08-05",
            notes: "Participates in group conversations effectively.",
          },
          {
            id: "sg1-5",
            name: "Public speaking practice",
            isCompleted: false,
            notes: "Working on presenting to small groups.",
          },
        ],
      },
      {
        id: "g2",
        name: "Physical Mobility",
        progress: 55,
        subgoals: [
          {
            id: "sg2-1",
            name: "Fine motor exercises",
            isCompleted: true,
            dateCompleted: "2021-03-25",
            notes: "Daily practice with therapy putty and finger exercises.",
          },
          {
            id: "sg2-2",
            name: "Arm strength training",
            isCompleted: true,
            dateCompleted: "2021-05-15",
            notes: "Using light weights with good form.",
          },
          {
            id: "sg2-3",
            name: "Walking without assistance",
            isCompleted: true,
            dateCompleted: "2021-07-20",
            notes: "Can walk short distances without cane on level surfaces.",
          },
          {
            id: "sg2-4",
            name: "Stair navigation",
            isCompleted: false,
            notes: "Can navigate with railing but working on confidence.",
          },
          {
            id: "sg2-5",
            name: "Return to recreational activities",
            isCompleted: false,
            notes: "Interested in adaptive swimming program.",
          },
        ],
      },
      {
        id: "g3",
        name: "Return to Work",
        progress: 40,
        subgoals: [
          {
            id: "sg3-1",
            name: "Update teaching credentials",
            isCompleted: true,
            dateCompleted: "2021-09-10",
            notes: "All certifications current.",
          },
          {
            id: "sg3-2",
            name: "Volunteer in classroom setting",
            isCompleted: true,
            dateCompleted: "2022-01-15",
            notes: "Volunteering 4 hours weekly at local elementary school.",
          },
          {
            id: "sg3-3",
            name: "Explore adaptive teaching tools",
            isCompleted: false,
            notes: "Researching voice amplification and digital teaching aids.",
          },
          {
            id: "sg3-4",
            name: "Part-time work trial",
            isCompleted: false,
            notes: "Discussing possibilities with former employer.",
          },
          {
            id: "sg3-5",
            name: "Full classroom management",
            isCompleted: false,
            notes: "Long-term goal pending successful work trial.",
          },
        ],
      },
    ],
    thingsToKeepInMind: [
      "May need extra time to communicate thoughts",
      "Uses a cane for stability when walking",
      "Highly motivated and responds well to positive reinforcement",
    ],
    factSheet: {
      staffNotes:
        "Mary was an elementary school teacher before her stroke. She maintains a positive attitude and is highly motivated in her rehabilitation. She enjoys sharing stories about her former students.",
      hobbies: "Reading, gardening",
      favoriteColor: "Purple",
      favoriteFood: "Vegetable soup",
      favoriteArtist: "Adele",
      pets: "Cat named Whiskers",
      dislikes: "Negative attitudes",
      favoriteSportsTeam: "Chicago Cubs",
    },
    projects: [
      {
        id: "p1",
        title: "Speech Therapy Journal",
        category: "Rehabilitation",
        image: "/placeholder.svg?height=100&width=100",
        date: "April 2024",
        description: "Created a journal documenting speech therapy progress with daily entries and exercises.",
      },
      {
        id: "p2",
        title: "Classroom Volunteering",
        category: "Vocational",
        image: "/placeholder.svg?height=100&width=100",
        date: "March 2024",
        description: "Volunteered in a 3rd-grade classroom twice weekly, assisting with reading groups.",
      },
      {
        id: "p3",
        title: "Adaptive Gardening",
        category: "Hobby",
        image: "/placeholder.svg?height=100&width=100",
        date: "February 2024",
        description: "Learned to use adaptive gardening tools and created a small container garden.",
      },
    ],
  },
  "5": {
    id: "5",
    name: "Hilary Canes",
    joinedDate: "Joined June, 30th 2023",
    birthdate: "Birthdate: Aug 15th 1990",
    avatar: "/placeholder.svg?height=400&width=400",
    generalInfo:
      "Hilary has an intellectual disability and is working on developing workplace skills. She has a passion for animals and is currently in a job training program at a local pet store. She's particularly focused on improving her customer service skills.",
    assistiveTechnology: "Visual Schedule",
    workHistory: "Volunteer at Animal Shelter",
    hometown: "Austin, TX",
    birthday: "August 15, 1990",
    skills: [
      { name: "Functioning Skills", value: 65, color: "#63b7e6" },
      { name: "Communication", value: 60, color: "#ff5733" },
      { name: "Personal Adjustment", value: 75, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 80, color: "#ffc107" },
      { name: "Safety Knowledge", value: 70, color: "#17a2b8" },
      { name: "Mobility Skills", value: 85, color: "#ffc107" },
      { name: "Socialization", value: 75, color: "#28a745" },
      { name: "Community Integration", value: 65, color: "#ff5733" },
    ],
    goals: [
      {
        id: "g1",
        name: "Customer Service",
        progress: 60,
        subgoals: [
          {
            id: "sg1-1",
            name: "Greet customers appropriately",
            isCompleted: true,
            dateCompleted: "2023-08-10",
            notes: "Consistently greets customers with a smile and standard greeting.",
          },
          {
            id: "sg1-2",
            name: "Answer common questions",
            isCompleted: true,
            dateCompleted: "2023-09-15",
            notes: "Has memorized locations of popular items and basic pet care information.",
          },
          {
            id: "sg1-3",
            name: "Direct customers to appropriate departments",
            isCompleted: true,
            dateCompleted: "2023-10-20",
            notes: "Knows store layout well and can give clear directions.",
          },
          {
            id: "sg1-4",
            name: "Handle basic transactions",
            isCompleted: false,
            notes: "Training on register system in progress.",
          },
          {
            id: "sg1-5",
            name: "Resolve customer concerns",
            isCompleted: false,
            notes: "Learning when to involve manager for complex issues.",
          },
        ],
      },
      {
        id: "g2",
        name: "Money Handling",
        progress: 45,
        subgoals: [
          {
            id: "sg2-1",
            name: "Identify currency denominations",
            isCompleted: true,
            dateCompleted: "2023-07-20",
            notes: "Can accurately identify all bills and coins.",
          },
          {
            id: "sg2-2",
            name: "Count money accurately",
            isCompleted: true,
            dateCompleted: "2023-08-25",
            notes: "Can count with occasional double-checking for larger amounts.",
          },
          {
            id: "sg2-3",
            name: "Make change correctly",
            isCompleted: false,
            notes: "Working on mental math for making change.",
          },
          {
            id: "sg2-4",
            name: "Process card payments",
            isCompleted: false,
            notes: "Learning POS system procedures.",
          },
          {
            id: "sg2-5",
            name: "Balance register at end of shift",
            isCompleted: false,
            notes: "Not yet started.",
          },
        ],
      },
      {
        id: "g3",
        name: "Time Management",
        progress: 70,
        subgoals: [
          {
            id: "sg3-1",
            name: "Arrive on time consistently",
            isCompleted: true,
            dateCompleted: "2023-07-15",
            notes: "Has established reliable morning routine.",
          },
          {
            id: "sg3-2",
            name: "Follow daily schedule",
            isCompleted: true,
            dateCompleted: "2023-08-05",
            notes: "Uses visual schedule effectively.",
          },
          {
            id: "sg3-3",
            name: "Complete tasks within timeframes",
            isCompleted: true,
            dateCompleted: "2023-09-10",
            notes: "Meets expectations for task completion.",
          },
          {
            id: "sg3-4",
            name: "Manage break times appropriately",
            isCompleted: true,
            dateCompleted: "2023-10-15",
            notes: "Returns from breaks on time.",
          },
          {
            id: "sg3-5",
            name: "Prioritize tasks independently",
            isCompleted: false,
            notes: "Still needs guidance on task prioritization.",
          },
        ],
      },
    ],
    thingsToKeepInMind: [
      "Learns best through hands-on experience",
      "May need tasks broken down into smaller steps",
      "Very enthusiastic about animals and pet care",
    ],
    factSheet: {
      staffNotes:
        "Hilary has a strong affinity for animals and responds enthusiastically to animal-related activities. She benefits from visual supports and clear, concrete instructions.",
      hobbies: "Drawing animals, watching nature documentaries",
      favoriteColor: "Yellow",
      favoriteFood: "Macaroni and cheese",
      favoriteArtist: "Taylor Swift",
      pets: "Helps care for shelter animals at volunteer job",
      dislikes: "Spicy food, horror movies",
      favoriteSportsTeam: "Not interested in sports",
    },
    projects: [
      {
        id: "p1",
        title: "Pet Store Training",
        category: "Vocational",
        image: "/placeholder.svg?height=100&width=100",
        date: "April 2024",
        description: "Completed training modules on pet care and customer service at local pet store.",
      },
      {
        id: "p2",
        title: "Animal Care Guide",
        category: "Educational",
        image: "/placeholder.svg?height=100&width=100",
        date: "March 2024",
        description: "Created an illustrated guide for basic pet care routines.",
      },
      {
        id: "p3",
        title: "Money Management Workshop",
        category: "Life Skills",
        image: "/placeholder.svg?height=100&width=100",
        date: "February 2024",
        description: "Participated in 6-week workshop on basic budgeting and money handling.",
      },
    ],
  },
  "6": {
    id: "6",
    name: "McArthur Jin",
    joinedDate: "Joined March, 5th 2024",
    birthdate: "Birthdate: Feb 22nd 1985",
    avatar: "/placeholder.svg?height=400&width=400",
    generalInfo:
      "McArthur is deaf and uses American Sign Language as his primary form of communication. He's a skilled graphic designer looking to advance his career. He's currently working on developing his portfolio and networking skills within the design industry.",
    assistiveTechnology: "Video Relay Service",
    workHistory: "Freelance Graphic Designer",
    hometown: "San Francisco, CA",
    birthday: "February 22, 1985",
    skills: [
      { name: "Functioning Skills", value: 95, color: "#63b7e6" },
      { name: "Communication", value: 75, color: "#ff5733" },
      { name: "Personal Adjustment", value: 90, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 95, color: "#ffc107" },
      { name: "Safety Knowledge", value: 85, color: "#17a2b8" },
      { name: "Mobility Skills", value: 90, color: "#ffc107" },
      { name: "Socialization", value: 70, color: "#28a745" },
      { name: "Community Integration", value: 80, color: "#ff5733" },
    ],
    goals: [
      {
        id: "g1",
        name: "Portfolio Development",
        progress: 85,
        subgoals: [
          {
            id: "sg1-1",
            name: "Identify portfolio focus areas",
            isCompleted: true,
            dateCompleted: "2024-03-20",
            notes: "Has selected branding, UI/UX, and illustration as focus areas.",
          },
          {
            id: "sg1-2",
            name: "Create case studies for past projects",
            isCompleted: true,
            dateCompleted: "2024-04-15",
            notes: "Has documented process and outcomes for 5 major projects.",
          },
          {
            id: "sg1-3",
            name: "Develop personal branding",
            isCompleted: true,
            dateCompleted: "2024-05-10",
            notes: "Has created consistent personal brand identity.",
          },
          {
            id: "sg1-4",
            name: "Build portfolio website",
            isCompleted: true,
            dateCompleted: "2024-06-05",
            notes: "Website launched with accessibility features.",
          },
          {
            id: "sg1-5",
            name: "Gather client testimonials",
            isCompleted: false,
            notes: "Reaching out to previous clients for feedback.",
          },
        ],
      },
      {
        id: "g2",
        name: "Professional Networking",
        progress: 60,
        subgoals: [
          {
            id: "sg2-1",
            name: "Join design community groups",
            isCompleted: true,
            dateCompleted: "2024-03-25",
            notes: "Active member in three online design communities.",
          },
          {
            id: "sg2-2",
            name: "Attend industry events",
            isCompleted: true,
            dateCompleted: "2024-04-20",
            notes: "Has attended two design conferences with interpreters.",
          },
          {
            id: "sg2-3",
            name: "Connect with industry professionals",
            isCompleted: true,
            dateCompleted: "2024-05-15",
            notes: "Has established connections with senior designers.",
          },
          {
            id: "sg2-4",
            name: "Participate in design challenges",
            isCompleted: false,
            notes: "Currently participating in monthly design challenge.",
          },
          {
            id: "sg2-5",
            name: "Present work at meetups",
            isCompleted: false,
            notes: "Scheduled to present at next month's design meetup.",
          },
        ],
      },
      {
        id: "g3",
        name: "Client Communication",
        progress: 75,
        subgoals: [
          {
            id: "sg3-1",
            name: "Develop client onboarding process",
            isCompleted: true,
            dateCompleted: "2024-04-05",
            notes: "Has created clear onboarding documents and process.",
          },
          {
            id: "sg3-2",
            name: "Create project brief template",
            isCompleted: true,
            dateCompleted: "2024-04-25",
            notes: "Using comprehensive brief to gather client requirements.",
          },
          {
            id: "sg3-3",
            name: "Establish feedback collection system",
            isCompleted: true,
            dateCompleted: "2024-05-20",
            notes: "Using structured feedback forms at project milestones.",
          },
          {
            id: "sg3-4",
            name: "Improve written communication clarity",
            isCompleted: true,
            dateCompleted: "2024-06-10",
            notes: "Email and proposal templates have been refined.",
          },
          {
            id: "sg3-5",
            name: "Develop remote presentation skills",
            isCompleted: false,
            notes: "Working with interpreter to improve virtual presentations.",
          },
        ],
      },
    ],
    thingsToKeepInMind: [
      "Communicates primarily through ASL and written English",
      "Prefers face-to-face or video communication",
      "Highly skilled with design software and visual communication",
    ],
    factSheet: {
      staffNotes:
        "McArthur communicates primarily through ASL and written English. He is highly visual and detail-oriented in his design work. Ensure communication accommodations are in place for all activities.",
      hobbies: "Photography, hiking",
      favoriteColor: "Teal",
      favoriteFood: "Sushi",
      favoriteArtist: "Banksy",
      pets: "No pets",
      dislikes: "Poorly designed interfaces",
      favoriteSportsTeam: "San Francisco 49ers",
    },
    projects: [
      {
        id: "p1",
        title: "Personal Brand Identity",
        category: "Design",
        image: "/placeholder.svg?height=100&width=100",
        date: "April 2024",
        description: "Developed comprehensive personal branding including logo, business cards, and portfolio website.",
      },
      {
        id: "p2",
        title: "Non-Profit Rebrand",
        category: "Design",
        image: "/placeholder.svg?height=100&width=100",
        date: "February-March 2024",
        description: "Volunteered design services to rebrand a local deaf community organization.",
      },
      {
        id: "p3",
        title: "Design Conference Presentation",
        category: "Professional Development",
        image: "/placeholder.svg?height=100&width=100",
        date: "January 2024",
        description: "Presented work at regional design conference with ASL interpretation.",
      },
    ],
  },
  "7": {
    id: "7",
    name: "Harry Zhang",
    joinedDate: "Joined July, 21st 2022",
    birthdate: "Birthdate: May 3rd 1995",
    avatar: "/placeholder.svg?height=400&width=400",
    generalInfo:
      "Harry has ADHD and is working on organizational and time management skills. He's a talented musician who wants to build a career in music production. He's currently focusing on developing consistent work habits and project completion strategies.",
    assistiveTechnology: "Time Management Apps",
    workHistory: "Music Store Associate",
    hometown: "Nashville, TN",
    birthday: "May 3, 1995",
    skills: [
      { name: "Functioning Skills", value: 75, color: "#63b7e6" },
      { name: "Communication", value: 85, color: "#ff5733" },
      { name: "Personal Adjustment", value: 65, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 80, color: "#ffc107" },
      { name: "Safety Knowledge", value: 75, color: "#17a2b8" },
      { name: "Mobility Skills", value: 90, color: "#ffc107" },
      { name: "Socialization", value: 85, color: "#28a745" },
      { name: "Community Integration", value: 75, color: "#ff5733" },
    ],
    goals: [
      {
        id: "g1",
        name: "Project Completion",
        progress: 50,
        subgoals: [
          {
            id: "sg1-1",
            name: "Break projects into smaller tasks",
            isCompleted: true,
            dateCompleted: "2022-09-10",
            notes: "Using task breakdown templates effectively.",
          },
          {
            id: "sg1-2",
            name: "Set realistic deadlines",
            isCompleted: true,
            dateCompleted: "2022-10-15",
            notes: "Has improved at estimating time needed for tasks.",
          },
          {
            id: "sg1-3",
            name: "Use project management tools",
            isCompleted: true,
            dateCompleted: "2022-11-20",
            notes: "Consistently using Trello for project tracking.",
          },
          {
            id: "sg1-4",
            name: "Implement accountability system",
            isCompleted: false,
            notes: "Working with mentor for weekly check-ins.",
          },
          {
            id: "sg1-5",
            name: "Complete projects without extensions",
            isCompleted: false,
            notes: "Still working on consistent completion without delays.",
          },
        ],
      },
      {
        id: "g2",
        name: "Time Management",
        progress: 45,
        subgoals: [
          {
            id: "sg2-1",
            name: "Use time tracking apps",
            isCompleted: true,
            dateCompleted: "2022-08-15",
            notes: "Consistently using time tracking for awareness.",
          },
          {
            id: "sg2-2",
            name: "Implement pomodoro technique",
            isCompleted: true,
            dateCompleted: "2022-09-20",
            notes: "25/5 minute work/break cycles are effective.",
          },
          {
            id: "sg2-3",
            name: "Create daily schedule",
            isCompleted: false,
            notes: "Still working on consistent schedule adherence.",
          },
          {
            id: "sg2-4",
            name: "Minimize distractions",
            isCompleted: false,
            notes: "Testing various environmental modifications.",
          },
          {
            id: "sg2-5",
            name: "Prioritize tasks effectively",
            isCompleted: false,
            notes: "Learning to distinguish urgent from important.",
          },
        ],
      },
      {
        id: "g3",
        name: "Music Production Skills",
        progress: 90,
        subgoals: [
          {
            id: "sg3-1",
            name: "Learn DAW software",
            isCompleted: true,
            dateCompleted: "2022-08-05",
            notes: "Proficient with Ableton Live.",
          },
          {
            id: "sg3-2",
            name: "Understand audio recording basics",
            isCompleted: true,
            dateCompleted: "2022-09-10",
            notes: "Can set up and record with proper levels.",
          },
          {
            id: "sg3-3",
            name: "Learn mixing techniques",
            isCompleted: true,
            dateCompleted: "2022-10-15",
            notes: "Developing good ear for balance and EQ.",
          },
          {
            id: "sg3-4",
            name: "Study music theory",
            isCompleted: true,
            dateCompleted: "2022-11-20",
            notes: "Strong understanding of theory concepts.",
          },
          {
            id: "sg3-5",
            name: "Create portfolio of original music",
            isCompleted: true,
            dateCompleted: "2023-01-15",
            notes: "Has completed EP of original compositions.",
          },
        ],
      },
    ],
    thingsToKeepInMind: [
      "May struggle with long meetings or lectures",
      "Benefits from visual aids and hands-on activities",
      "Extremely creative and innovative when engaged",
    ],
    factSheet: {
      staffNotes:
        "Harry is extremely creative and talented with music production. He benefits from structured environments with clear expectations but also needs space for creative expression. Responds well to positive reinforcement.",
      hobbies: "Playing guitar, music production, video games",
      favoriteColor: "Black",
      favoriteFood: "Ramen",
      favoriteArtist: "Kendrick Lamar",
      pets: "No pets",
      dislikes: "Early mornings, repetitive tasks",
      favoriteSportsTeam: "Not interested in sports",
    },
    projects: [
      {
        id: "p1",
        title: "Original EP Production",
        category: "Music",
        image: "/placeholder.svg?height=100&width=100",
        date: "March-April 2024",
        description: "Composed and produced a 5-track EP of original electronic music.",
      },
      {
        id: "p2",
        title: "Time Management System",
        category: "Life Skills",
        image: "/placeholder.svg?height=100&width=100",
        date: "February 2024",
        description: "Developed personalized time management system using digital tools and visual reminders.",
      },
      {
        id: "p3",
        title: "Local Music Showcase",
        category: "Community",
        image: "/placeholder.svg?height=100&width=100",
        date: "January 2024",
        description: "Performed original music at community center showcase event.",
      },
    ],
  },
  "8": {
    id: "8",
    name: "Connor Douglas",
    joinedDate: "Joined March, 16th 2024",
    birthdate: "Birthdate: Dec 11th 1980",
    avatar: "/placeholder.svg?height=400&width=400",
    generalInfo:
      "Connor is recovering from a traumatic brain injury sustained in a car accident. He previously worked in finance and is working on cognitive rehabilitation. He's making steady progress with memory and executive functioning skills.",
    assistiveTechnology: "Memory Aids",
    workHistory: "Financial Analyst",
    hometown: "Boston, MA",
    birthday: "December 11, 1980",
    skills: [
      { name: "Functioning Skills", value: 60, color: "#63b7e6" },
      { name: "Communication", value: 75, color: "#ff5733" },
      { name: "Personal Adjustment", value: 65, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 70, color: "#ffc107" },
      { name: "Safety Knowledge", value: 80, color: "#17a2b8" },
      { name: "Mobility Skills", value: 85, color: "#ffc107" },
      { name: "Socialization", value: 60, color: "#28a745" },
      { name: "Community Integration", value: 55, color: "#ff5733" },
    ],
    goals: [
      {
        id: "g1",
        name: "Memory Improvement",
        progress: 55,
        subgoals: [
          {
            id: "sg1-1",
            name: "Use memory notebook consistently",
            isCompleted: true,
            dateCompleted: "2024-04-10",
            notes: "Records important information consistently.",
          },
          {
            id: "sg1-2",
            name: "Practice spaced repetition techniques",
            isCompleted: true,
            dateCompleted: "2024-05-15",
            notes: "Using flashcard app daily for practice.",
          },
          {
            id: "sg1-3",
            name: "Implement environmental cues",
            isCompleted: true,
            dateCompleted: "2024-06-20",
            notes: "Home environment organized with visual reminders.",
          },
          {
            id: "sg1-4",
            name: "Use digital reminder system",
            isCompleted: false,
            notes: "Learning to use smartphone calendar and alerts.",
          },
          {
            id: "sg1-5",
            name: "Apply memory strategies in daily life",
            isCompleted: false,
            notes: "Working on generalizing strategies to new situations.",
          },
        ],
      },
      {
        id: "g2",
        name: "Executive Functioning",
        progress: 45,
        subgoals: [
          {
            id: "sg2-1",
            name: "Use planning tools",
            isCompleted: true,
            dateCompleted: "2024-04-20",
            notes: "Consistently using planner for daily activities.",
          },
          {
            id: "sg2-2",
            name: "Break tasks into steps",
            isCompleted: true,
            dateCompleted: "2024-05-25",
            notes: "Can break down complex tasks with minimal assistance.",
          },
          {
            id: "sg2-3",
            name: "Manage distractions",
            isCompleted: false,
            notes: "Working on strategies to maintain focus.",
          },
          {
            id: "sg2-4",
            name: "Improve decision-making",
            isCompleted: false,
            notes: "Practicing structured decision-making process.",
          },
          {
            id: "sg2-5",
            name: "Develop problem-solving strategies",
            isCompleted: false,
            notes: "Working on identifying and evaluating solutions.",
          },
        ],
      },
      {
        id: "g3",
        name: "Career Transition",
        progress: 30,
        subgoals: [
          {
            id: "sg3-1",
            name: "Assess current skills and limitations",
            isCompleted: true,
            dateCompleted: "2024-04-15",
            notes: "Completed vocational assessment with rehabilitation counselor.",
          },
          {
            id: "sg3-2",
            name: "Explore suitable career options",
            isCompleted: false,
            notes: "Researching fields that match skills and accommodate needs.",
          },
          {
            id: "sg3-3",
            name: "Identify necessary accommodations",
            isCompleted: false,
            notes: "Working with occupational therapist on workplace accommodations.",
          },
          {
            id: "sg3-4",
            name: "Develop new skills as needed",
            isCompleted: false,
            notes: "Considering courses in data analysis with reduced cognitive load.",
          },
          {
            id: "sg3-5",
            name: "Gradual return to work plan",
            isCompleted: false,
            notes: "Will develop plan after career direction is established.",
          },
        ],
      },
    ],
    thingsToKeepInMind: [
      "May need information repeated or written down",
      "Benefits from structured routines and environments",
      "Fatigue can impact cognitive performance later in the day",
    ],
    factSheet: {
      staffNotes:
        "Connor experiences fatigue and memory difficulties following his TBI. He benefits from written instructions and memory aids. Schedule demanding activities earlier in the day when his energy levels are higher.",
      hobbies: "Chess, listening to podcasts",
      favoriteColor: "Navy blue",
      favoriteFood: "Lasagna",
      favoriteArtist: "The Beatles",
      pets: "No pets",
      dislikes: "Crowded environments, multitasking",
      favoriteSportsTeam: "Boston Celtics",
    },
    projects: [
      {
        id: "p1",
        title: "Memory Strategies Workshop",
        category: "Cognitive Rehabilitation",
        image: "/placeholder.svg?height=100&width=100",
        date: "April 2024",
        description: "Completed 8-week workshop on memory compensation strategies.",
      },
      {
        id: "p2",
        title: "Financial Planning Review",
        category: "Life Skills",
        image: "/placeholder.svg?height=100&width=100",
        date: "March 2024",
        description: "Worked with financial advisor to review and adjust financial plans post-injury.",
      },
      {
        id: "p3",
        title: "Adaptive Technology Training",
        category: "Technology",
        image: "/placeholder.svg?height=100&width=100",
        date: "February 2024",
        description: "Learned to use smartphone apps and digital tools for memory and organization.",
      },
    ],
  },
}

// Function to calculate progress based on completed subgoals
const calculateProgress = (subgoals: Subgoal[]): number => {
  if (subgoals.length === 0) return 0
  const completedCount = subgoals.filter((subgoal) => subgoal.isCompleted).length
  return Math.round((completedCount / subgoals.length) * 100)
}

// Function to save goal progress to localStorage
const saveGoalProgress = (participantId: string, goalId: string, subgoalId: string, isCompleted: boolean) => {
  try {
    const storageKey = `participant_${participantId}_goals`
    const savedGoals = localStorage.getItem(storageKey)
    let goalsData: Record<string, Record<string, boolean>> = {}

    if (savedGoals) {
      goalsData = JSON.parse(savedGoals)
    }

    if (!goalsData[goalId]) {
      goalsData[goalId] = {}
    }

    goalsData[goalId][subgoalId] = isCompleted

    localStorage.setItem(storageKey, JSON.stringify(goalsData))
  } catch (error) {
    console.error("Error saving goal progress:", error)
  }
}

export default function ParticipantProfile() {
  const { id } = useParams()
  const [participant, setParticipant] = useState<ParticipantProfile | null>(null)
  const [expandedGoals, setExpandedGoals] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    if (typeof id === "string" && participantProfiles[id]) {
      const profile = { ...participantProfiles[id] }

      // Try to load saved goal progress from localStorage
      try {
        const storageKey = `participant_${id}_goals`
        const savedGoals = localStorage.getItem(storageKey)

        if (savedGoals) {
          const goalsData = JSON.parse(savedGoals)

          // Update subgoal completion status from localStorage
          profile.goals = profile.goals.map((goal) => {
            if (goalsData[goal.id]) {
              const updatedSubgoals = goal.subgoals.map((subgoal) => ({
                ...subgoal,
                isCompleted:
                  goalsData[goal.id][subgoal.id] !== undefined ? goalsData[goal.id][subgoal.id] : subgoal.isCompleted,
              }))

              // Recalculate progress based on completed subgoals
              const progress = calculateProgress(updatedSubgoals)

              return {
                ...goal,
                subgoals: updatedSubgoals,
                progress,
              }
            }
            return goal
          })
        }
      } catch (error) {
        console.error("Error loading goal progress:", error)
      }

      setParticipant(profile)

      // Initialize expanded state for all goals
      const initialExpandedState: Record<string, boolean> = {}
      profile.goals.forEach((goal) => {
        initialExpandedState[goal.id] = false
      })
      setExpandedGoals(initialExpandedState)
    }
  }, [id])

  // Toggle subgoal completion
  const toggleSubgoalCompletion = (goalId: string, subgoalId: string) => {
    if (!participant) return

    setParticipant((prevParticipant) => {
      if (!prevParticipant) return null

      const updatedGoals = prevParticipant.goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedSubgoals = goal.subgoals.map((subgoal) => {
            if (subgoal.id === subgoalId) {
              // Toggle completion status
              const isCompleted = !subgoal.isCompleted

              // Save to localStorage
              if (participant.id) {
                saveGoalProgress(participant.id, goalId, subgoalId, isCompleted)
              }

              // Update completion date if newly completed
              const dateCompleted = isCompleted ? new Date().toISOString().split("T")[0] : undefined

              return {
                ...subgoal,
                isCompleted,
                dateCompleted: isCompleted ? dateCompleted : undefined,
              }
            }
            return subgoal
          })

          // Recalculate progress based on completed subgoals
          const progress = calculateProgress(updatedSubgoals)

          return {
            ...goal,
            subgoals: updatedSubgoals,
            progress,
          }
        }
        return goal
      })

      return {
        ...prevParticipant,
        goals: updatedGoals,
      }
    })
  }

  // Toggle goal expansion
  const toggleGoalExpansion = (goalId: string) => {
    setExpandedGoals((prev) => ({
      ...prev,
      [goalId]: !prev[goalId],
    }))
  }

  if (!participant) {
    return (
      <div className="flex h-screen bg-[#edf8ff]">
        <Sidebar activePage="participants" />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p>Participant not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#edf8ff]">
      {/* Sidebar Component */}
      <Sidebar activePage="participants" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="text-sm text-[#707eae] mb-1">
              <span>Pages / Participants</span>
            </div>
            <h1 className="text-3xl font-bold text-[#2b3674]">{participant.name}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Image */}
            <div className="md:col-span-1 flex justify-center">
              <div className="w-64 h-64 rounded-full overflow-hidden bg-[#f4f4f4]">
                <Image
                  src={participant.avatar || "/placeholder.svg"}
                  alt={participant.name}
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>

            {/* General Information */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-[#2b3674]">General Information</h2>
                  <button className="text-[#707eae] hover:text-[#63b7e6]">
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-[#707eae] leading-relaxed">{participant.generalInfo}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Assistive Technology */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-[#8f9bba]">Assistive Technology</p>
                      <p className="text-[#2b3674] font-medium">{participant.assistiveTechnology}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#707eae]" />
                  </div>
                </div>

                {/* Work History */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-[#8f9bba]">Work History</p>
                      <p className="text-[#2b3674] font-medium">{participant.workHistory}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#707eae]" />
                  </div>
                </div>

                {/* Hometown */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-[#8f9bba]">Hometown</p>
                      <p className="text-[#2b3674] font-medium">{participant.hometown}</p>
                    </div>
                  </div>
                </div>

                {/* Birthday */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-[#8f9bba]">Birthday</p>
                      <p className="text-[#2b3674] font-medium">{participant.birthday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-[#2b3674]">Skills</h2>
              <button className="text-[#707eae] hover:text-[#63b7e6]">
                <Pencil className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
              {participant.skills.map((skill, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: skill.color }}></div>
                      <span className="text-sm text-[#707eae]">{skill.name}</span>
                    </div>
                    <span className="text-sm font-medium text-[#2b3674]">{skill.value}%</span>
                  </div>
                  <div className="w-full bg-[#f4f4f4] rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${skill.value}%`, backgroundColor: skill.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Section with Subgoals */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded mr-2 bg-[#63b7e6] flex items-center justify-center">
                  <div className="w-3 h-3 bg-white"></div>
                </div>
                <h2 className="text-xl font-semibold text-[#2b3674]">Goals</h2>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-[#707eae] hover:text-[#63b7e6]">
                  <Pencil className="w-5 h-5" />
                </button>
                <button className="text-[#707eae] hover:text-[#63b7e6]">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {participant.goals.map((goal) => (
                <div key={goal.id} className="border border-[#e0e5f2] rounded-xl overflow-hidden">
                  {/* Goal Header */}
                  <div className="bg-[#f4f7fe] p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="text-[#2b3674] font-medium">{goal.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex-1 h-2 bg-[#f4f4f4] rounded-full mr-3">
                            <div className="h-2 rounded-full bg-[#63b7e6]" style={{ width: `${goal.progress}%` }}></div>
                          </div>
                          <span className="text-sm text-[#707eae] w-12 text-right">{goal.progress}%</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleGoalExpansion(goal.id)}
                        className="ml-4 p-2 rounded-full hover:bg-[#e0e5f2] transition-colors"
                      >
                        {expandedGoals[goal.id] ? (
                          <ChevronUp className="w-5 h-5 text-[#707eae]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#707eae]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Subgoals */}
                  {expandedGoals[goal.id] && (
                    <div className="p-4 space-y-3">
                      {goal.subgoals.map((subgoal) => (
                        <div key={subgoal.id} className="flex items-start p-3 bg-[#f9fafc] rounded-lg">
                          <div className="flex-shrink-0 mr-3 mt-0.5">
                            <button
                              onClick={() => toggleSubgoalCompletion(goal.id, subgoal.id)}
                              className={`w-5 h-5 rounded flex items-center justify-center border ${
                                subgoal.isCompleted ? "bg-[#63b7e6] border-[#63b7e6]" : "bg-white border-[#d1d5db]"
                              }`}
                            >
                              {subgoal.isCompleted && <Check className="w-3 h-3 text-white" />}
                            </button>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h4
                                className={`text-sm font-medium ${
                                  subgoal.isCompleted ? "text-[#707eae] line-through" : "text-[#2b3674]"
                                }`}
                              >
                                {subgoal.name}
                              </h4>
                              {subgoal.isCompleted && subgoal.dateCompleted && (
                                <span className="ml-2 text-xs text-[#8f9bba]">Completed: {subgoal.dateCompleted}</span>
                              )}
                            </div>
                            {subgoal.notes && (
                              <p className="text-xs text-[#707eae] mt-1 bg-white p-2 rounded">{subgoal.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-end mt-2">
                        <button className="text-[#63b7e6] text-sm hover:underline flex items-center">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Subgoal
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Things to Keep in Mind */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-[#2b3674]">Things to Keep in Mind</h2>
              <button className="text-[#707eae] hover:text-[#63b7e6]">
                <Pencil className="w-5 h-5" />
              </button>
            </div>

            <ul className="space-y-3">
              {participant.thingsToKeepInMind.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-[#63b7e6] mt-2 mr-3"></div>
                  <span className="text-[#707eae]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fact Sheet Section */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-[#2b3674]">Fact Sheet</h2>
              <button className="text-[#707eae] hover:text-[#63b7e6]">
                <Pencil className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-[#2b3674] mb-2">Staff Notes:</h3>
              <p className="text-[#707eae]">{participant.factSheet.staffNotes}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#f9fafc] p-4 rounded-lg">
                <p className="text-sm text-[#8f9bba] mb-1">Hobbies</p>
                <p className="text-[#2b3674]">{participant.factSheet.hobbies}</p>
              </div>

              <div className="bg-[#f9fafc] p-4 rounded-lg">
                <p className="text-sm text-[#8f9bba] mb-1">Favorite Color</p>
                <p className="text-[#2b3674]">{participant.factSheet.favoriteColor}</p>
              </div>

              <div className="bg-[#f9fafc] p-4 rounded-lg">
                <p className="text-sm text-[#8f9bba] mb-1">Favorite Food</p>
                <p className="text-[#2b3674]">{participant.factSheet.favoriteFood}</p>
              </div>

              <div className="bg-[#f9fafc] p-4 rounded-lg">
                <p className="text-sm text-[#8f9bba] mb-1">Favorite Artist/Musician</p>
                <p className="text-[#2b3674]">{participant.factSheet.favoriteArtist}</p>
              </div>

              <div className="bg-[#f9fafc] p-4 rounded-lg">
                <p className="text-sm text-[#8f9bba] mb-1">Pets</p>
                <p className="text-[#2b3674]">{participant.factSheet.pets}</p>
              </div>

              <div className="bg-[#f9fafc] p-4 rounded-lg">
                <p className="text-sm text-[#8f9bba] mb-1">Dislikes</p>
                <p className="text-[#2b3674]">{participant.factSheet.dislikes}</p>
              </div>

              <div className="bg-[#f9fafc] p-4 rounded-lg">
                <p className="text-sm text-[#8f9bba] mb-1">Favorite Sports Team</p>
                <p className="text-[#2b3674]">{participant.factSheet.favoriteSportsTeam}</p>
              </div>
            </div>
          </div>

          {/* Past Projects Section */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-[#2b3674]">Past Projects</h2>
              <button className="text-[#707eae] hover:text-[#63b7e6]">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {participant.projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-start border-b border-[#e0e5f2] pb-6 last:border-0 last:pb-0"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f4f4f4] flex-shrink-0 mr-4">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-[#2b3674]">{project.title}</h3>
                        <div className="flex items-center text-sm text-[#707eae]">
                          <span className="mr-2">{project.category}</span>
                          <span className="text-[#63b7e6] hover:underline cursor-pointer">• See project details</span>
                        </div>
                      </div>
                      <button className="text-[#707eae] hover:text-[#63b7e6]">
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                    {project.description && <p className="text-sm text-[#707eae] mt-2">{project.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
