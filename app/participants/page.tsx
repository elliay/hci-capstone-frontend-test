"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Info, UserMinus, UserPlus, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

// Define participant type
interface Participant {
  id: string
  name: string
  joinedDate: string
  birthdate: string
  isPresent: boolean
  avatar: string
}

export default function ParticipantsPage() {
  // Initial participants data
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "Luke Carter",
      joinedDate: "Joined March, 16th 2024",
      birthdate: "Birthdate: Jun 20th 1966",
      isPresent: true,
      avatar: "/assets/guy1.jpg?height=120&width=120",
    },
    {
      id: "2",
      name: "Jack Hughes",
      joinedDate: "Joined April, 14th 2023",
      birthdate: "Birthdate: Sep 12th 1974",
      isPresent: true,
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "3",
      name: "Hans Beckham",
      joinedDate: "Joined January, 7th 2025",
      birthdate: "Birthdate: Oct 9th 1998",
      isPresent: true,
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "4",
      name: "Mary Jarris",
      joinedDate: "Joined February, 4th 2021",
      birthdate: "Birthdate: Nov 7th 1987",
      isPresent: true,
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "5",
      name: "Hilary Canes",
      joinedDate: "Joined June, 30th 2023",
      birthdate: "Birthdate: Aug 15th 1990",
      isPresent: false,
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "6",
      name: "McArthur Jin",
      joinedDate: "Joined March, 5th 2024",
      birthdate: "Birthdate: Feb 22nd 1985",
      isPresent: false,
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "7",
      name: "Harry Zhang",
      joinedDate: "Joined July, 21st 2022",
      birthdate: "Birthdate: May 3rd 1995",
      isPresent: false,
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "8",
      name: "Connor Douglas",
      joinedDate: "Joined March, 16th 2024",
      birthdate: "Birthdate: Dec 11th 1980",
      isPresent: false,
      avatar: "/placeholder.svg?height=120&width=120",
    },
  ])

  // Function to toggle participant presence
  const togglePresence = (id: string) => {
    setParticipants(
      participants.map((participant) =>
        participant.id === id ? { ...participant, isPresent: !participant.isPresent } : participant,
      ),
    )
  }

  // Filter participants by presence
  const todaysAttendees = participants.filter((participant) => participant.isPresent)
  const allParticipants = participants.filter((participant) => !participant.isPresent)

  // Reference for the scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="flex h-screen bg-[#edf8ff]">
      {/* Sidebar Component */}
      <Sidebar activePage="participants" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* */}
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="text-sm text-[#707eae] mb-1">
                <span>Pages / Participants</span>
              </div>
              <h1 className="text-3xl font-bold text-[#2b3674]">Participants</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8f9bba] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Participants"
                  className="pl-10 pr-4 py-2 rounded-full bg-white border border-[#e0e5f2] w-64 focus:outline-none focus:ring-2 focus:ring-[#4318ff] focus:border-transparent"
                />
              </div>
              <button className="w-10 h-10 rounded-full bg-white border border-[#e0e5f2] flex items-center justify-center">
                <Info className="w-5 h-5 text-[#8f9bba]" />
              </button>
            </div>
          </div>

          {/* Today's Attendees Section with Horizontal Scroll */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#2b3674]">Today's Attendees</h2>
              <div className="flex gap-2">
                <button
                  onClick={scrollLeft}
                  className="p-2 rounded-full bg-white border border-[#e0e5f2] text-[#707eae] hover:bg-[#f4f7fe]"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 rounded-full bg-white border border-[#e0e5f2] text-[#707eae] hover:bg-[#f4f7fe]"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-4 gap-6 hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {todaysAttendees.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex-shrink-0 w-[280px] bg-[#f4f4f4] rounded-xl p-6 flex flex-col items-center relative"
                  >
                    <button
                      onClick={() => togglePresence(participant.id)}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm border border-[#ff3b30] text-[#ff3b30] hover:bg-[#fff5f5] transition-colors"
                      aria-label="Remove from today's attendees"
                      title="Remove from today's attendees"
                    >
                      <UserMinus className="w-5 h-5" />
                    </button>
                    <div className="w-32 h-32 rounded-full bg-white mb-4 overflow-hidden">
                      <Image
                        src={participant.avatar || "/placeholder.svg"}
                        alt={participant.name}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1b2559] mb-1">{participant.name}</h3>
                    <p className="text-sm text-[#707eae] mb-1">{participant.joinedDate}</p>
                    <p className="text-sm text-[#707eae] mb-4">{participant.birthdate}</p>
                    <Link href={`/participants/${participant.id}`}>
                      <button className="bg-[#63b7e6] text-white px-4 py-2 rounded-md hover:bg-[#4a9fd0] transition-colors">
                        View Profile
                      </button>
                    </Link>
                  </div>
                ))}

                {/* Empty state if no attendees */}
                {todaysAttendees.length === 0 && (
                  <div className="flex-shrink-0 w-full bg-[#f4f4f4] rounded-xl p-6 flex flex-col items-center justify-center h-[350px]">
                    <p className="text-[#707eae]">No attendees for today</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* All Participants Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#2b3674]">All Participants</h2>

              {/* Add Participant Button */}
              <button className="flex items-center bg-white text-[#8f9bba] py-3 px-6 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <span className="mr-2 font-medium">Add Participant</span>
                <div className="bg-[#a3aed0] bg-opacity-20 rounded-full p-1">
                  <Plus className="w-5 h-5 text-[#8f9bba]" />
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allParticipants.map((participant) => (
                <div key={participant.id} className="bg-[#f4f4f4] rounded-xl p-6 flex flex-col items-center relative">
                  <button
                    onClick={() => togglePresence(participant.id)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm border border-[#63b7e6] text-[#63b7e6] hover:bg-[#f0f9ff] transition-colors"
                    aria-label="Add to today's attendees"
                    title="Add to today's attendees"
                  >
                    <UserPlus className="w-5 h-5" />
                  </button>
                  <div className="w-32 h-32 rounded-full bg-white mb-4 overflow-hidden">
                    <Image
                      src={participant.avatar || "/placeholder.svg"}
                      alt={participant.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1b2559] mb-1">{participant.name}</h3>
                  <p className="text-sm text-[#707eae] mb-1">{participant.joinedDate}</p>
                  <p className="text-sm text-[#707eae] mb-4">{participant.birthdate}</p>
                  <Link href={`/participants/${participant.id}`}>
                    <button className="bg-[#63b7e6] text-white px-4 py-2 rounded-md hover:bg-[#4a9fd0] transition-colors">
                      View Profile
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
