function canSave() {
  return !!localStorage;
}

function canLoad() {
  return !!localStorage;
}

export function save(key, value) {
  if (canSave()) {
    localStorage.setItem(key, value);
  }
};

export function load(key) {
  if (canLoad()) {
    return localStorage.getItem(key);
  } else {
    return null;
  }
}

