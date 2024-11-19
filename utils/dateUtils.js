const moment = require('moment');

// Formatear una fecha
exports.formatDate = (date, format = 'YYYY-MM-DD') => {
  return moment(date).format(format);
};

// Calcular diferencia entre fechas
exports.dateDifference = (date1, date2, unit = 'days') => {
  return moment(date1).diff(moment(date2), unit);
};