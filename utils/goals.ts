import type { Subgoal } from "@/types/participant"

// Function to calculate progress based on completed subgoals
export const calculateProgress = (subgoals: Subgoal[]): number => {
  if (subgoals.length === 0) return 0
  const completedCount = subgoals.filter((subgoal) => subgoal.isCompleted).length
  return Math.round((completedCount / subgoals.length) * 100)
}

// Function to save goal progress to localStorage
export const saveGoalProgress = (participantId: string, goalId: string, subgoalId: string, isCompleted: boolean) => {
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

// Function to load goal progress from localStorage
export const loadGoalProgress = (participantId: string) => {
  try {
    const storageKey = `participant_${participantId}_goals`
    const savedGoals = localStorage.getItem(storageKey)

    if (savedGoals) {
      return JSON.parse(savedGoals)
    }

    return null
  } catch (error) {
    console.error("Error loading goal progress:", error)
    return null
  }
}

// Function to add a new subgoal
export const addSubgoal = (participantId: string, goalId: string, newSubgoal: Subgoal) => {
  try {
    // In a real app, this would be an API call
    // For now, we'll just return the new subgoal
    return newSubgoal
  } catch (error) {
    console.error("Error adding subgoal:", error)
    return null
  }
}
