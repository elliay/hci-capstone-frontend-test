// Subgoal type
export interface Subgoal {
  id: string
  name: string
  isCompleted: boolean
  dateCompleted?: string
  notes?: string
}

// Goal type with subgoals
export interface Goal {
  id: string
  name: string
  progress: number
  subgoals: Subgoal[]
}

// Participant profile type
export interface ParticipantProfile {
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
}
