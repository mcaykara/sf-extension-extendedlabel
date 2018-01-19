if (global.Device.deviceOS === "iOS") {
  module.exports = require('./extendedlabel-iOS');
} else if (global.Device.deviceOS === "Android") {
  module.exports = require('./extendedlabel-Android');
}