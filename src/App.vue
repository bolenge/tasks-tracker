<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import TheMenu from './components/TheMenu.vue'
import TheTopTask from './components/TheTopTask.vue'
import { formatTimestamps, durationBetweenTimestamps } from './utils/helpers'
import { Task } from './types/task'
import * as TaskService from './services/TaskService'

type State = {
  tasks: Task[],
  error?: string,
  nowTime?: number,
  taskname?: string,
  startTime?: number,
  taskToEdit?: string,
  intervalTime?: number,
  tasksLoading?: boolean,
  taskInProgress?: boolean
}

const state = reactive<State>({
  tasks: [],
  error: '',
  taskname: '',
  tasksLoading: true,
  taskInProgress: false
})

const theTopTask = ref<{
  restartTask: Function
}>()

const onError = (error: string) => {
  state.error = error
}

const onStopTask = (task: Task) => {
  state.tasks.unshift(task)
  state.taskToEdit = ''
}

const onRestartTask = (task: Task) => {
  if (theTopTask.value) {
    theTopTask.value.restartTask(task.name)
  }
}

const deleteTask = (task: Task) => {
  state.tasks = state.tasks.filter(t => t.id !== task.id)
}

const copyToKeyboard = (taskname: string) => {
  navigator.clipboard.writeText(taskname)
}

onMounted(async () => {
  try {
    state.tasks = await TaskService.getAll()
  } catch (error) {
    console.log('ERROR LOADING TASKS :', error);
  } finally {
    state.tasksLoading = false
  }
})

</script>

<template>
  <div>
    <div class="flex">
      <div class="h-screen w-1/5">
        <TheMenu />
      </div>

      <div class="w-4/5">
        <div>
          <TheTopTask
            :task-to-edit="state.taskToEdit"
            ref="theTopTask"
            @stop="onStopTask"
            @error="onError"
          />
        </div>

        <div class="mt-7 px-1">
          <template v-if="state.error">
            <div role="alert" class="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>
                {{ state.error }}
              </span>
            </div>
          </template>

          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <!-- head -->
              <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                
                <template v-if="state.tasksLoading">
                  <tr class="border-b-0">
                    <td colspan="2" class="text-center text-slate-400 text-light">
                      <span class="loading loading-spinner loading-lg"></span>
                    </td>
                  </tr>
                </template>

                <template v-else-if="!state.tasks.length">
                  <tr class="border-b-0">
                    <td colspan="2" class="text-center text-slate-400 text-light">
                      No task yet...
                    </td>
                  </tr>
                </template>

                <template v-for="(task) in state.tasks" :key="task">
                  <tr>
                    <td class="w-[63%]">{{ task.name }}</td>
                    <td class="">
                      <span class="me-10">
                        {{ formatTimestamps(task.start) }}
                      </span>
                      <span class="me-10">
                        {{ durationBetweenTimestamps(task.start, task.end) }}
                      </span>

                      <button
                        class="btn btn-sm btn-outline font-light rounded-lg me-3"
                        @click="copyToKeyboard(task.name)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="currentColor"
                            d="M184 66H40a6 6 0 0 0-6 6v144a6 6 0 0 0 6 6h144a6 6 0 0 0 6-6V72a6 6 0 0 0-6-6m-6 144H46V78h132Zm44-170v144a6 6 0 0 1-12 0V46H72a6 6 0 0 1 0-12h144a6 6 0 0 1 6 6"
                          />
                        </svg>
                      </button>

                      <button
                        class="btn btn-sm btn-outline btn-primary font-light rounded-lg me-3"
                        @click="onRestartTask(task)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="currentColor"
                            d="M231.36 116.19L87.28 28.06a14 14 0 0 0-14.18-.27A13.69 13.69 0 0 0 66 39.87v176.26a13.69 13.69 0 0 0 7.1 12.08a14 14 0 0 0 14.18-.27l144.08-88.13a13.82 13.82 0 0 0 0-23.62m-6.26 13.38L81 217.7a2 2 0 0 1-2.06 0a1.78 1.78 0 0 1-1-1.61V39.87a1.78 1.78 0 0 1 1-1.61A2.06 2.06 0 0 1 80 38a2 2 0 0 1 1 .31l144.1 88.12a1.82 1.82 0 0 1 0 3.14"/>
                        </svg>
                      </button>

                      <button
                        class="btn btn-sm btn-outline font-light btn-error rounded-lg"
                        @click="deleteTask(task)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="currentColor"
                            d="M216 50h-42V40a22 22 0 0 0-22-22h-48a22 22 0 0 0-22 22v10H40a6 6 0 0 0 0 12h10v146a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V62h10a6 6 0 0 0 0-12M94 40a10 10 0 0 1 10-10h48a10 10 0 0 1 10 10v10H94Zm100 168a2 2 0 0 1-2 2H64a2 2 0 0 1-2-2V62h132Zm-84-104v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0m48 0v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
