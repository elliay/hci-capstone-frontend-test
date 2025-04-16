import Image from "next/image"
import Link from "next/link"
import { Home, BarChart2, Users, Lock } from "lucide-react"

interface SidebarProps {
  activePage: string
}

export function Sidebar({ activePage }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-[#e0e5f2] flex flex-col">
      {/* User profile */}
      <div className="p-6 border-b border-[#e0e5f2]">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-2">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="Joan Day"
              className="rounded-full border-2 border-[#63b7e6]"
              width={64}
              height={64}
            />
          </div>
          <h3 className="font-semibold text-[#2b3674]">Joan Day</h3>
          <p className="text-sm text-[#8f9bba]">Life Skills Specialist</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className={`flex items-center px-6 py-3 ${
                activePage === "dashboard"
                  ? "text-[#4318ff] border-l-4 border-[#4318ff] bg-[#f4f7fe]"
                  : "text-[#707eae] hover:bg-[#f4f7fe]"
              }`}
            >
              <Home className="w-5 h-5 mr-3" />
              <span className={activePage === "dashboard" ? "font-medium" : ""}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/activities"
              className={`flex items-center px-6 py-3 ${
                activePage === "activities"
                  ? "text-[#4318ff] border-l-4 border-[#4318ff] bg-[#f4f7fe]"
                  : "text-[#707eae] hover:bg-[#f4f7fe]"
              }`}
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              <span className={activePage === "activities" ? "font-medium" : ""}>Activities</span>
            </Link>
          </li>
          <li>
            <Link
              href="/participants"
              className={`flex items-center px-6 py-3 ${
                activePage === "participants"
                  ? "text-[#4318ff] border-l-4 border-[#4318ff] bg-[#f4f7fe]"
                  : "text-[#707eae] hover:bg-[#f4f7fe]"
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              <span className={activePage === "participants" ? "font-medium" : ""}>Participants</span>
            </Link>
          </li>
          <li>
            <Link
              href="/account"
              className={`flex items-center px-6 py-3 ${
                activePage === "account"
                  ? "text-[#4318ff] border-l-4 border-[#4318ff] bg-[#f4f7fe]"
                  : "text-[#707eae] hover:bg-[#f4f7fe]"
              }`}
            >
              <Lock className="w-5 h-5 mr-3" />
              <span className={activePage === "account" ? "font-medium" : ""}>Account</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logo */}
      <div className="p-6 border-t border-[#e0e5f2]">
        <div className="flex justify-center">
          <Image src="/class-logo.svg" alt="CLASS - Community Living And Support Services" width={140} height={80} />
        </div>
      </div>
    </div>
  )
}
