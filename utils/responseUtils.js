// Enviar una respuesta estandarizada
exports.successResponse = (res, data, message = 'Operación exitosa.') => {
    res.status(200).json({ success: true, message, data });
  };
  
  exports.errorResponse = (res, message = 'Error en la operación.', status = 400) => {
    res.status(status).json({ success: false, message });
  };