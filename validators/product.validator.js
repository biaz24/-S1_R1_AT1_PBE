export function validarCamposObrigatorios(produto) {
  const camposObrigatorios = ["nome", "preco", "descricao"];
  const camposFaltando = [];

  camposObrigatorios.forEach((campo) => {
    if (
      produto[campo] === undefined ||
      produto[campo] === null ||
      //                 .trim remove os espaços
      produto[campo].toString().trim() === ""
    ) {
      camposFaltando.push(campo);
    }
  });

  if (camposFaltando.lenght > 0) {
    //.join() -> é utiliazado para juntar, transformar todos os elementos do array
    // em uma unica string
    // const frutas = ["maça", "banana","uva"];
    // console.log(frutas.join()) -> Maça,Banana,Uva
    // .join(" - ") isso caso eu queira que seja separado em traçoes
    throw new Error(
      `Campos obrigatorios não preenchidos: ${camposFaltando.join(", ")}`,
    );
  }
}

//o tipo de number esta no validador pois ele esta verificando se é number

export function validarPreco(produto) {
  //typeof determina o tipo de dado
  if (typeof produto.preco !== "number" || produto.preco <= 0) {
    throw new Error("preçodeve ser um numero maior que zero!!!!!!!!!!!!");
  }
}

export function validarEstoque(produto) {
  if (produto.estoque === null || produto.estoque < 0) {
    throw new Error("Estoque não pode ser negativo");
  }
}
