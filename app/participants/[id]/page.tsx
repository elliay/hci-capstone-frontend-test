"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Pencil, MoreHorizontal, ChevronRight, Minus, Plus } from "lucide-react"

// Define participant profile type
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
  goals: {
    name: string
    progress: number
  }[]
  thingsToKeepInMind: string[]
}

// Sample participant profiles data
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
      { name: "Functioning Skills", value: 72, color: "#4318ff" },
      { name: "Communication", value: 45, color: "#ff5733" },
      { name: "Personal Adjustment", value: 83, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 67, color: "#ffc107" },
      { name: "Safety Knowledge", value: 91, color: "#17a2b8" },
      { name: "Mobility Skills", value: 58, color: "#ffc107" },
      { name: "Socialization", value: 42, color: "#28a745" },
      { name: "Community Integration", value: 61, color: "#ff5733" },
    ],
    goals: [
      { name: "Public Transportation", progress: 65 },
      { name: "Money Management", progress: 40 },
      { name: "Social Interaction", progress: 75 },
    ],
    thingsToKeepInMind: [
      "Prefers structured environments",
      "Responds well to visual cues",
      "May need extra time to process verbal instructions",
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
      { name: "Functioning Skills", value: 85, color: "#4318ff" },
      { name: "Communication", value: 78, color: "#ff5733" },
      { name: "Personal Adjustment", value: 62, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 90, color: "#ffc107" },
      { name: "Safety Knowledge", value: 95, color: "#17a2b8" },
      { name: "Mobility Skills", value: 55, color: "#ffc107" },
      { name: "Socialization", value: 70, color: "#28a745" },
      { name: "Community Integration", value: 68, color: "#ff5733" },
    ],
    goals: [
      { name: "Computer Skills", progress: 45 },
      { name: "Job Application", progress: 80 },
      { name: "Pain Management", progress: 60 },
    ],
    thingsToKeepInMind: [
      "Physical limitations with prolonged standing",
      "Prefers hands-on learning approaches",
      "Interested in technology but may need extra guidance",
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
      { name: "Functioning Skills", value: 68, color: "#4318ff" },
      { name: "Communication", value: 45, color: "#ff5733" },
      { name: "Personal Adjustment", value: 55, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 72, color: "#ffc107" },
      { name: "Safety Knowledge", value: 80, color: "#17a2b8" },
      { name: "Mobility Skills", value: 90, color: "#ffc107" },
      { name: "Socialization", value: 35, color: "#28a745" },
      { name: "Community Integration", value: 50, color: "#ff5733" },
    ],
    goals: [
      { name: "Independent Living", progress: 55 },
      { name: "Social Skills", progress: 30 },
      { name: "Career Development", progress: 75 },
    ],
    thingsToKeepInMind: [
      "Sensitive to loud noises and bright lights",
      "Needs clear, direct instructions",
      "Excellent with numbers and patterns",
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
      { name: "Functioning Skills", value: 60, color: "#4318ff" },
      { name: "Communication", value: 65, color: "#ff5733" },
      { name: "Personal Adjustment", value: 85, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 75, color: "#ffc107" },
      { name: "Safety Knowledge", value: 90, color: "#17a2b8" },
      { name: "Mobility Skills", value: 50, color: "#ffc107" },
      { name: "Socialization", value: 80, color: "#28a745" },
      { name: "Community Integration", value: 70, color: "#ff5733" },
    ],
    goals: [
      { name: "Speech Therapy", progress: 70 },
      { name: "Physical Mobility", progress: 55 },
      { name: "Return to Work", progress: 40 },
    ],
    thingsToKeepInMind: [
      "May need extra time to communicate thoughts",
      "Uses a cane for stability when walking",
      "Highly motivated and responds well to positive reinforcement",
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
      { name: "Functioning Skills", value: 65, color: "#4318ff" },
      { name: "Communication", value: 60, color: "#ff5733" },
      { name: "Personal Adjustment", value: 75, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 80, color: "#ffc107" },
      { name: "Safety Knowledge", value: 70, color: "#17a2b8" },
      { name: "Mobility Skills", value: 85, color: "#ffc107" },
      { name: "Socialization", value: 75, color: "#28a745" },
      { name: "Community Integration", value: 65, color: "#ff5733" },
    ],
    goals: [
      { name: "Customer Service", progress: 60 },
      { name: "Money Handling", progress: 45 },
      { name: "Time Management", progress: 70 },
    ],
    thingsToKeepInMind: [
      "Learns best through hands-on experience",
      "May need tasks broken down into smaller steps",
      "Very enthusiastic about animals and pet care",
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
      { name: "Functioning Skills", value: 95, color: "#4318ff" },
      { name: "Communication", value: 75, color: "#ff5733" },
      { name: "Personal Adjustment", value: 90, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 95, color: "#ffc107" },
      { name: "Safety Knowledge", value: 85, color: "#17a2b8" },
      { name: "Mobility Skills", value: 90, color: "#ffc107" },
      { name: "Socialization", value: 70, color: "#28a745" },
      { name: "Community Integration", value: 80, color: "#ff5733" },
    ],
    goals: [
      { name: "Portfolio Development", progress: 85 },
      { name: "Professional Networking", progress: 60 },
      { name: "Client Communication", progress: 75 },
    ],
    thingsToKeepInMind: [
      "Communicates primarily through ASL and written English",
      "Prefers face-to-face or video communication",
      "Highly skilled with design software and visual communication",
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
      { name: "Functioning Skills", value: 75, color: "#4318ff" },
      { name: "Communication", value: 85, color: "#ff5733" },
      { name: "Personal Adjustment", value: 65, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 80, color: "#ffc107" },
      { name: "Safety Knowledge", value: 75, color: "#17a2b8" },
      { name: "Mobility Skills", value: 90, color: "#ffc107" },
      { name: "Socialization", value: 85, color: "#28a745" },
      { name: "Community Integration", value: 75, color: "#ff5733" },
    ],
    goals: [
      { name: "Project Completion", progress: 50 },
      { name: "Time Management", progress: 45 },
      { name: "Music Production Skills", progress: 90 },
    ],
    thingsToKeepInMind: [
      "May struggle with long meetings or lectures",
      "Benefits from visual aids and hands-on activities",
      "Extremely creative and innovative when engaged",
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
      { name: "Functioning Skills", value: 60, color: "#4318ff" },
      { name: "Communication", value: 75, color: "#ff5733" },
      { name: "Personal Adjustment", value: 65, color: "#e83e8c" },
      { name: "Meeting Personal Needs", value: 70, color: "#ffc107" },
      { name: "Safety Knowledge", value: 80, color: "#17a2b8" },
      { name: "Mobility Skills", value: 85, color: "#ffc107" },
      { name: "Socialization", value: 60, color: "#28a745" },
      { name: "Community Integration", value: 55, color: "#ff5733" },
    ],
    goals: [
      { name: "Memory Improvement", progress: 55 },
      { name: "Executive Functioning", progress: 45 },
      { name: "Career Transition", progress: 30 },
    ],
    thingsToKeepInMind: [
      "May need information repeated or written down",
      "Benefits from structured routines and environments",
      "Fatigue can impact cognitive performance later in the day",
    ],
  },
}

export default function ParticipantProfile() {
  const { id } = useParams()
  const [participant, setParticipant] = useState<ParticipantProfile | null>(null)

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    if (typeof id === "string" && participantProfiles[id]) {
      setParticipant(participantProfiles[id])
    }
  }, [id])

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
                  <button className="text-[#707eae] hover:text-[#4318ff]">
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
              <button className="text-[#707eae] hover:text-[#4318ff]">
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

          {/* Goals Section */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded mr-2 bg-[#4318ff] flex items-center justify-center">
                  <div className="w-3 h-3 bg-white"></div>
                </div>
                <h2 className="text-xl font-semibold text-[#2b3674]">Goals</h2>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-[#707eae] hover:text-[#4318ff]">
                  <Pencil className="w-5 h-5" />
                </button>
                <button className="text-[#707eae] hover:text-[#4318ff]">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {participant.goals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[#2b3674] font-medium">{goal.name}</h3>
                    <div className="flex items-center gap-2">
                      <button className="p-1 rounded-full bg-[#f4f4f4] text-[#707eae]">
                        <Minus className="w-4 h-4" />
                      </button>
                      <button className="p-1 rounded-full bg-[#f4f4f4] text-[#707eae]">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-[#f4f4f4] rounded-full h-2">
                    <div className="h-2 rounded-full bg-[#63b7e6]" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Things to Keep in Mind */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-[#2b3674]">Things to Keep in Mind</h2>
              <button className="text-[#707eae] hover:text-[#4318ff]">
                <Pencil className="w-5 h-5" />
              </button>
            </div>

            <ul className="space-y-3">
              {participant.thingsToKeepInMind.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-[#4318ff] mt-2 mr-3"></div>
                  <span className="text-[#707eae]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
