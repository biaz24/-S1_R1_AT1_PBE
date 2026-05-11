//comecçarna parte de manter o usuario logado

import jwt from "jsonwebtoken";
// biblioteca para trabalhar com o JWT
//JWT -> é uma string codificada que guarda dados do usuario, id nome

const ACCESS_SECRET = "access_secret";
const REFRESH_SECRET = "refresh_secret";

// EFETUEI LOGIN,VAI SER GERADO PARA MIM UM TOKEN DE 15 MINUTOS
// PASSOU 15 MINUTOS, O FRONT VAI CHAMAR UMA ROTA DO BACK-END E VAI ENVIAR O REFRESH TOKEN
// ATRAVES DESSE REFRESH É CRIADO UM NOVO TOKEN QUE VAI DURAR 15 MINUTOS

//as duas primeiras cria o token

export function generateAccessToken(payload) {
  //sign -> gerar um token
  //payload -> dados do usuario
  // ACCESS_SECRET -> chave secreta de assinatura
  // expiresIn -> token expira em 15 minutos
  return jwt.sigh(payload, ACCESS_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}
