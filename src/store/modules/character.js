import axios from "../../plugins/axios";
import {
  SET_CHARACTERS,
  START_CHARACTERS_LOADING,
  END_CHARACTERS_LOADING,
  SET_PAGE
} from "@/constants/mutations-types";

const state = {
  characters: [],
  count: 0,
  page: 1,
  pages: 0,
  loading: false
};

const getters = {
  getCharacters: state => state.characters,
  getLoading: state => state.loading,
  getPage: state => state.page,
  getLength: state => parseInt(state.count / state.pages)
};

const actions = {
  async fetchCharacters({ commit }) {
    try {
      commit(START_CHARACTERS_LOADING);
      const { data } = await axios.get(`character/?page=${state.page}`);
      commit(END_CHARACTERS_LOADING);
      commit(SET_CHARACTERS, {
        results: data.results,
        count: data.info.count,
        pages: data.info.pages
      });
    } catch (error) {
      console.log(error);
    }
  },
  async saveCharacters({ commit }, character) {
    try {
      await axios.post("character/", character);
    } catch (error) {
      console.log(error);
    }
  }
};

const mutations = {
  [START_CHARACTERS_LOADING](state) {
    state.loading = true;
  },
  [END_CHARACTERS_LOADING](state) {
    state.loading = false;
  },
  [SET_CHARACTERS](state, { results, count, pages }) {
    state.characters = results;
    state.count = count;
    state.pages = pages;
  },
  [SET_PAGE](state, page) {
    state.page = page;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
