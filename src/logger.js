function log(type, level_abreviation, message) {
  console.log(
    `${level_abreviation} ${type} ${new Date().toISOString()}: ${message}`,
  );
}

export function error(type, message) {
  log(type, "E", message);
}

export function warning(type, message) {
  log(type, "W", message);
}

export function info(type, message) {
  log(type, "I", message);
}

export function verbose(type, message) {
  log(type, "V", message);
}
