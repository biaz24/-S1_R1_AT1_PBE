import multer from "multer"; //MIDDLEWARE UTILIZADO PARA UPLOAD DE ARQUIVOS
import fs from "fs"; // UTILIZADO PARA MANIPULAR ARQUIVOS E PASTA
import path from "path"; //AUXILIAR NO CAMINHO DOS ARQUIVOS
import { randomUUID } from "crypto"; //GERA UM ID UNICO DE 128 BITS

//DEFINIR OS CAMINHOS QUE AS IMAGENS VAO SER SALVAS
const uploadRoot = path.resolve("uploads");
const productDir = path.join(uploadRoot, "products");
//quando vier uma imagem de product vai criar outra pasta dentro da upload
//chamada product e vai armazenar

//garantir que as pastas existem
// se existe não precisa criar nada, vai chegar como falso vdd etransformar em falso então
//não vai entrar no ifse vier falso (não tem pasta) vai entrar no if e criar a pasta
//existSync -> verifica se existe
//mkdirSync -> cria a pasta
// recursive: true -> cria toda a estrutura
if (!fs.existsSync(productDir)) {
  fs.mkdirSync(productDir, { recursive: true });
}
//diskStorage -> metodo que define como e onde os arquivos vao ser salvos
//destination -> função que define em qual pasta o arquivo sera salvo
// cb -> callback, é uma função passada como argumento para outra função
const storage = multer.diskStorage({
  //        informação dos aquivos
  //                  |
  destination: (req, file, cb) => {
    cb(null, productDir);
  },

  // filename -> qual será o nome do arquivo salvo
  filename: (req, file, cb) => {
    //retorna uma data e horario
    //                      * split vai dividir e vai pegar o primeiro
    //     so vai pegar a data no caso o 0
    const data = new Date().toISOString().split("T")[0];

    //função para capturar a extensão do arquivo
    const ext = path.extname(file.originalname);
    // 2026-04-27-uuid.png -> o arquivo vai estar parecido com esse nome

    cb(null, `${data}-${randomUUID()}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    files: 5, // máximo de 5 imagens
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Tipo de arquivo inválido!!"));
    }
    cb(null, true);
  },
});
