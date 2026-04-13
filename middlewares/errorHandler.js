// middleware é uma função que vai ficar no meio do caminho
// entre a requisição do usuario (request) e resposta do servidor (reponse)
function errorHandler(err, req, res, next) {
  console.error(err);

  res.status(400).json({
    error: err.massage,
  });
}

export default errorHandler;
