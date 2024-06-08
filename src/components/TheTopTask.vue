<script setup lang="ts">
import { computed, reactive } from 'vue'
import { durationBetweenTimestamps } from '../utils/helpers'

/**
 * Types
 */ 
type State = {
  error?: string,
  taskID: number,
  nowTime?: number,
  taskname?: string,
  startTime?: number,
  intervalTime?: number,
  taskInProgress?: boolean
}

/**
 * Events definitions
 */ 
const emit = defineEmits(['error', 'start', 'stop'])

/**
 * State
 */ 
const state = reactive<State>({
  taskID: 0,
  taskname: ''
})

/**
 * Methods 
 */
const currentDuration = computed(() => {
  if (state.startTime && state.nowTime) {
    return durationBetweenTimestamps(state.startTime, state.nowTime)
  }

  return '00:00:00'
})

const timeInProgress = () => {
  state.nowTime = Date.now()

  state.intervalTime = setInterval(() => {
    state.nowTime = Date.now()
  }, 1000)
}

const startTask = () => {
  if (state.taskname?.length === 0) {
    emit('error', 'Tap something...')
    return
  } else if (state.taskInProgress) {
    emit('error', 'A task is in progress')
    return
  }

  emit('error', '')
  state.taskInProgress = true
  state.startTime = Date.now()
  
  timeInProgress()
}

const getAnID = () => {
  state.taskID++
  return state.taskID
}

const stopTask = () => {
  if (!state.taskInProgress) {
    emit('error', 'No tasks in progress !')
    return
  }

  emit('error', '')
  state.taskInProgress = false

  emit('stop', {
    id: getAnID(),
    name: state.taskname,
    start: state.startTime,
    end: Date.now()
  })

  clearInterval(state.intervalTime)

  state.nowTime = 0
  state.taskname = ''
}

const restartTask = (taskname: string) => {
  state.taskname = taskname

  startTask()
}

const toggleTask = () => {
  if (state.taskInProgress) {
    stopTask()
  } else {
    startTask()
  }
}

defineExpose({
  restartTask
})
</script>

<template>
  <!-- bg-base-100 -->
  <div class="navbar w-full border-b">
    <div class="flex gap-2 w-full">
      <div class="w-5/6">
        <div class="form-control">
          <input
            v-model="state.taskname"
            type="text"
            placeholder="Tap your task..."
            class="input w-24 md:w-auto focus:border-none focus:outline-none"
          />
        </div>
      </div>

      <div class="w-1/6">
        <span class="me-3">
          {{ currentDuration }}
        </span>

        <button
          class="btn btn-circle btn-outline btn-sm me-3"
          :class="{'btn-primary': !state.taskInProgress, 'btn-error': state.taskInProgress}"
          @click="toggleTask"
        >
          <svg
            v-if="!state.taskInProgress"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M231.36 116.19L87.28 28.06a14 14 0 0 0-14.18-.27A13.69 13.69 0 0 0 66 39.87v176.26a13.69 13.69 0 0 0 7.1 12.08a14 14 0 0 0 14.18-.27l144.08-88.13a13.82 13.82 0 0 0 0-23.62m-6.26 13.38L81 217.7a2 2 0 0 1-2.06 0a1.78 1.78 0 0 1-1-1.61V39.87a1.78 1.78 0 0 1 1-1.61A2.06 2.06 0 0 1 80 38a2 2 0 0 1 1 .31l144.1 88.12a1.82 1.82 0 0 1 0 3.14"/>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M200 34h-40a14 14 0 0 0-14 14v160a14 14 0 0 0 14 14h40a14 14 0 0 0 14-14V48a14 14 0 0 0-14-14m2 174a2 2 0 0 1-2 2h-40a2 2 0 0 1-2-2V48a2 2 0 0 1 2-2h40a2 2 0 0 1 2 2ZM96 34H56a14 14 0 0 0-14 14v160a14 14 0 0 0 14 14h40a14 14 0 0 0 14-14V48a14 14 0 0 0-14-14m2 174a2 2 0 0 1-2 2H56a2 2 0 0 1-2-2V48a2 2 0 0 1 2-2h40a2 2 0 0 1 2 2Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>