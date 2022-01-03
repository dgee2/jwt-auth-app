// Any configuration in the.env file needs to be prefixed with VUE_APP
// This class helps to parse configuration ensuring it is required
class Config {
    microservices = {
        // Add microservices
        AuthEndpoint: ''
    };

    // Remote config
    // microserviceToken;

    constructor() {
        this.microservices = {
            // Add microservices e.g. client: this.getRequiredArg('VUE_APP_DYNAMICS_CLIENT')
            AuthEndpoint: this.getRequiredArg('VUE_APP_AUTH_ENDPOINT'),
        };
    }

    getRequiredArg(name) {
        const value = process.env[name];
        if (!value) {
            throw new Error(`Config parameter '${name}' required`);
        }
        return value;
    }
}

export default new Config();
