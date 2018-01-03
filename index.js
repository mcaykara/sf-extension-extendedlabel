if (Device.deviceOS === "iOS") {
  module.exports = require('./extendedlabel-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./extendedlabel-Android');
}