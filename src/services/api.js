import axios from 'axios'
import config from "../setup/config";

function joinUrl(base, path) {
  return new URL(path, base).href
}

export default {
  async GenerateToken(username, password) {
    let response = await axios.post(joinUrl(config.microservices.AuthEndpoint, '/auth/generate-token'), { username, password })
    return response.data;
  },
  async RefreshToken(refreshToken) {
    let response = await axios.post(joinUrl(config.microservices.AuthEndpoint, '/auth/refresh-token'), {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
    return response.data;
  }
};
