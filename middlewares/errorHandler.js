const errorHandler = (err, req, res, next) => {
	console.error(err.stack);
  
	res.status(err.status || 500).json({
	  erreur: {
		message: err.message || 'Une erreur inattendue est survenue',
	  },
	});
  };
  
  module.exports = errorHandler;
  