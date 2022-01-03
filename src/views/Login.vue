<template>
  <div>
    <div v-if="isLoggedIn">
      <button type="button" @click="refreshAuthToken" v-if="isLoggedIn">
        Refresh Login
      </button>
      <br />
      <button type="button" @click="logout" v-if="isLoggedIn">Logout</button>
    </div>
    <div v-else>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Username" />
        <br />
        <br />
        <input v-model="password" type="password" placeholder="Password" />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
    <div>{{ token }}</div>
    <div>{{ refreshToken }}</div>
    <div>{{ tokenExpires }}</div>
    <div>{{ refreshTokenExpires }}</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.auth.token,
      refreshToken: (state) => state.auth.refreshToken,
      tokenExpires: (state) => state.auth.tokenExpires,
      refreshTokenExpires: (state) => state.auth.refreshTokenExpires,
    }),
    ...mapGetters("auth", ["isLoggedIn"]),
  },
  methods: {
    login() {
      this.$store.dispatch("auth/generateAuthToken", {
        username: this.username,
        password: this.password,
      });
    },
    ...mapActions("auth", ["refreshAuthToken", "logout"]),
  },
};
</script>
