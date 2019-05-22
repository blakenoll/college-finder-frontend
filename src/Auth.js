import auth0 from "auth0-js";

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "blakenoll.auth0.com",
      clientID: "T7n59xA9006Djz4YpjL0xBVT5ywWWKVB",
      redirectUri: "http://college-finder.netlify.com/callback",
      audience: "https://blakenoll.auth0.com/userinfo",
      responseType: "token id_token",
      scope: "openid email"
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuth() {
    return new Promise((res, rej) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return rej(err);
        if (!authResult || !authResult.idToken) {
          return rej(err);
        }
        this.setSession(authResult);
        res();
      });
    });
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.email = authResult.idTokenPayload.email;
    console.log(this.idToken);
    console.log(this.email);
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  }

  logout() {
    this.auth0.logout({
      returnTo: "https://college-finder.netlify.com",
      clientID: "T7n59xA9006Djz4YpjL0xBVT5ywWWKVB"
    });
  }

  silentAuth() {
    return new Promise((res, rej) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return rej(err);
        this.setSession(authResult);
        res();
      });
    });
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }
}

const auth = new Auth();

export default auth;
