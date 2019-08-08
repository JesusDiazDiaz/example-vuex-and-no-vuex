<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap justify-center>
      <v-progress-circular v-if="loading" indeterminate color="purple"></v-progress-circular>
      <template v-if="!loading">
        <v-flex xs4 v-for="character in characters" :key="character.id">
          <v-card class="mx-auto" max-width="400">
            <v-img class="white--text" height="200px" :src="character.image">
              <v-card-title class="align-end fill-height">{{ character.name }}</v-card-title>
            </v-img>
          </v-card>
        </v-flex>
      </template>
    </v-layout>
    <v-layout row justify-center class="mt-5">
      <v-pagination v-model="page" :length="length" :total-visible="7"></v-pagination>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "@/plugins/axios.js";
export default {
  data() {
    return {
      characters: [],
      page: 1,
      count: 0,
      pages: 1,
      loading: false
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        this.loading = true;
        const { data } = await axios.get(`character/?page=${this.page}`);
        this.loading = false;
        this.characters = data.results;
        this.count = data.info.count;
        this.pages = data.info.pages;
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch: {
    page() {
      this.fetch();
    }
  },
  computed: {
    length() {
      return parseInt(this.count / this.pages);
    }
  }
  //TODO: sin funcion async
  /* created() {
    axios
      .get("character/")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  } */
};
</script>

<style>
</style>