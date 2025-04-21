// Function to get present participants from localStorage
export function getPresentParticipants(): string[] {
  try {
    const savedAttendance = localStorage.getItem("participantAttendance")
    if (!savedAttendance) return []

    const attendanceData = JSON.parse(savedAttendance)

    // Return array of participant IDs who are present
    return Object.entries(attendanceData)
      .filter(([_, isPresent]) => isPresent === true)
      .map(([id]) => id)
  } catch (error) {
    console.error("Error getting present participants:", error)
    return []
  }
}

// Function to set a participant's attendance status
export function setParticipantAttendance(participantId: string, isPresent: boolean): void {
  try {
    const savedAttendance = localStorage.getItem("participantAttendance")
    let attendanceData: Record<string, boolean> = {}

    if (savedAttendance) {
      attendanceData = JSON.parse(savedAttendance)
    }

    // Update the attendance status
    attendanceData[participantId] = isPresent

    // Save back to localStorage
    localStorage.setItem("participantAttendance", JSON.stringify(attendanceData))
  } catch (error) {
    console.error("Error setting participant attendance:", error)
  }
}

// Function to clear all attendance data
export function clearAttendanceData(): void {
  localStorage.removeItem("participantAttendance")
}
