<script setup lang="ts">
import { reactive } from 'vue'
import TheMenu from './components/TheMenu.vue'
import TheTopTask from './components/TheTopTask.vue'
import { formatTimestamps, durationBetweenTimestamps } from './utils/helpers'

type Task = {
  id: number,
  name: string,
  start: number,
  end: number
}

type State = {
  tasks: Task[],
  error?: string,
  nowTime?: number,
  taskname?: string,
  startTime?: number,
  intervalTime?: number,
  taskInProgress?: boolean
}

const state = reactive<State>({
  tasks: [],
  error: '',
  taskname: '',
  taskInProgress: false
})

const onError = (error: string) => {
  state.error = error
}

const onStopTask = (task: Task) => {
  state.tasks.unshift(task)
}

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
            @error="onError"
            @stop="onStopTask"
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
                <template v-if="!state.tasks.length">
                  <tr class="border-b-0">
                    <td colspan="2" class="text-center text-slate-400 text-light">No task yet...</td>
                  </tr>
                </template>

                <template v-for="(task) in state.tasks" :key="task">
                  <tr>
                    <td class="w-[65%]">{{ task.name }}</td>
                    <td class="">
                      <span class="me-10">
                        {{ formatTimestamps(task.start) }}
                      </span>
                      <span class="me-10">
                        {{ durationBetweenTimestamps(task.start, task.end) }}
                      </span>

                      <span class="btn btn-sm btn-outline font-light rounded-lg me-3">
                        Edit
                      </span>

                      <span class="btn btn-sm btn-outline font-light btn-error rounded-lg">
                        Delete
                      </span>
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
