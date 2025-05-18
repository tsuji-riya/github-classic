<script setup lang="ts">
import { listUserRepo } from '@/api.ts'
import { onMounted, ref } from 'vue'
import { Octokit } from '@octokit/rest';
import type { Endpoints } from '@octokit/types'
const octokit = new Octokit();

type UsersRepos = Endpoints["GET /users/{username}/repos"]["response"]["data"];

const username = ref("");
const repos = ref<UsersRepos>([]);

function toGitHubUrl(fullname: string) {
  return `https://github.com/${fullname}`;
}

async function updateRepos() {
  if (username.value === "") {
    return;
  }
  const { data } = await octokit.rest.repos.listForUser({
    username: username.value,
    sort: "updated",
    per_page: 100,
  });
  repos.value = data;
}

onMounted(async () => {
  await updateRepos()
})
</script>

<template>
  <div>
    <h1 class="text-2xl text-center font-bold m-5">GitHub Classic</h1>
    <div class="w-max block mx-auto">
      <input v-model="username" @keydown.enter="updateRepos" placeholder="Enter your GitHub username" class="border-1 border-gray:50 w-64 p-1 m-1" />
      <button v-on:click="updateRepos" class="bg-gray-100 border-1 border-gray:50 p-1">Search</button>
    </div>
    <table>
      <thead class="bg-gray-300">
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="repo in repos">
        <th><a :href="toGitHubUrl(repo.full_name)">{{repo.name}}</a></th>
        <td><a :href="toGitHubUrl(repo.full_name)">{{repo.description}}</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
tr:nth-child(even) {
  background-color: #e8e8e8;
}
</style>