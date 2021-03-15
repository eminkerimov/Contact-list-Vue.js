export const storage = {
  get: function(name) {
    return JSON.parse(localStorage.getItem(name));
  },
  set: function(name, value) {
    return localStorage.setItem(name, JSON.stringify(value));
  },
};
