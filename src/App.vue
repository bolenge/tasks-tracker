<script setup lang="ts">
import { reactive, ref } from 'vue'
import TheMenu from './components/TheMenu.vue'
import TheTopTask from './components/TheTopTask.vue'
import { formatTimestamps, durationBetweenTimestamps } from './utils/helpers'
import { Task } from './types/task'

type State = {
  tasks: Task[],
  error?: string,
  nowTime?: number,
  taskname?: string,
  startTime?: number,
  taskToEdit?: string,
  intervalTime?: number,
  taskInProgress?: boolean,
}

const state = reactive<State>({
  tasks: [],
  error: '',
  taskname: '',
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

const editTask = (task: Task) => {
  if (theTopTask.value) {
    theTopTask.value.restartTask(task.name)
  }
}

const deleteTask = (task: Task) => {
  state.tasks = state.tasks.filter(t => t.id !== task.id)
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
                <template v-if="!state.tasks.length">
                  <tr class="border-b-0">
                    <td colspan="2" class="text-center text-slate-400 text-light">No task yet...</td>
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

                      <span
                        class="btn btn-sm btn-outline font-light rounded-lg me-3"
                        @click="editTask(task)"
                      >
                        Restart
                      </span>

                      <span
                        class="btn btn-sm btn-outline font-light btn-error rounded-lg"
                        @click="deleteTask(task)"
                      >
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
