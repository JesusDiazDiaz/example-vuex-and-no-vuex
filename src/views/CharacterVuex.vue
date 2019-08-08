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
import { mapGetters } from "vuex";
import { SET_PAGE } from "@/constants/mutations-types.js";
export default {
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$store.dispatch("fetchCharacters");
    }
  },
  watch: {
    page() {
      this.fetch();
    }
  },
  computed: {
    page: {
      set(value) {
        this.$store.commit(SET_PAGE, value);
      },
      get() {
        return this.$store.getters.getPage;
      }
    },
    ...mapGetters({
      characters: "getCharacters",
      loading: "getLoading",
      length: "getLength"
    })
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