import api from '../services/api';

const LocalStorageKeys = {
    token: "token",
    refreshToken: "refreshToken",
    tokenExpires: "tokenExpires",
    refreshTokenExpires: "refreshTokenExpires"
};

function loadAuthFromLocalStorage() {
    let tokenExpires = new Date(localStorage.getItem(LocalStorageKeys.tokenExpires) || 0);
    let token = '';
    let refreshTokenExpires = new Date(localStorage.getItem(LocalStorageKeys.refreshTokenExpires) || 0);
    let refreshToken = '';

    if (tokenExpires > new Date()) {
        token = localStorage.getItem(LocalStorageKeys.token);
    } else {
        tokenExpires = new Date(0);
    }
    if (refreshTokenExpires > new Date()) {
        refreshToken = localStorage.getItem(LocalStorageKeys.refreshToken);
    } else {
        refreshTokenExpires = new Date(0);
    }

    return {
        token,
        refreshToken,
        tokenExpires,
        refreshTokenExpires
    }
}

export default {
    namespaced: true,
    state: {
        ...loadAuthFromLocalStorage()
    },
    getters: {
        isLoggedIn(state) {
            return state.tokenExpires > new Date()
        }
    },
    mutations: {
        setToken(state, { accessToken, accessTokenExpires, refreshToken, refreshTokenExpires }) {
            state.token = accessToken;
            state.tokenExpires = new Date(accessTokenExpires);
            state.refreshToken = refreshToken;
            state.refreshTokenExpires = new Date(refreshTokenExpires);

            localStorage.setItem(LocalStorageKeys.token, accessToken);
            localStorage.setItem(LocalStorageKeys.tokenExpires, accessTokenExpires);
            localStorage.setItem(LocalStorageKeys.refreshToken, refreshToken);
            localStorage.setItem(LocalStorageKeys.refreshTokenExpires, refreshTokenExpires);
        },
        logout(state) {
            state.token = '';
            state.tokenExpires = new Date(0);
            state.refreshToken = '';
            state.refreshTokenExpires = new Date(0);

            localStorage.removeItem(LocalStorageKeys.token);
            localStorage.removeItem(LocalStorageKeys.tokenExpires);
            localStorage.removeItem(LocalStorageKeys.refreshToken);
            localStorage.removeItem(LocalStorageKeys.refreshTokenExpires);
        },
    },
    actions: {
        async generateAuthToken({ commit }, { username, password }) {
            let response = await api.GenerateToken(username, password);
            commit('setToken', {
                accessToken: response.accessToken,
                accessTokenExpires: response.accessTokenExpires,
                refreshToken: response.refreshToken,
                refreshTokenExpires: response.refreshTokenExpires
            });
        },
        async refreshAuthToken({ commit, state }) {
            if (state.refreshToken) {
                let response = await api.RefreshToken(state.refreshToken);
                commit('setToken', {
                    accessToken: response.accessToken,
                    accessTokenExpires: response.accessTokenExpires,
                    refreshToken: response.refreshToken,
                    refreshTokenExpires: response.refreshTokenExpires
                });
            }
        },
        logout({ commit }) {
            commit('logout');
        }
    }
};