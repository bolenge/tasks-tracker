<script setup lang="ts">
import TheMenu from './components/TheMenu.vue'
import TheTopTask from './components/TheTopTask.vue'
</script>

<template>
  <div>
    <div class="flex">
      <div class="h-screen w-1/5">
        <TheMenu />
      </div>

      <div class="w-4/5">
        <div>
          <TheTopTask />
        </div>

        <div class="mt-10 px-1">
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
                <template v-for="(task) in 10" :key="task">
                  <tr>
                    <td class="w-[65%]">Hello world ! {{ task }}</td>
                    <td class="">
                      <span class="me-10">01/10/2022</span>
                      <span class="me-10">00:10:30</span>

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
