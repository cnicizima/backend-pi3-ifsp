import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando a inserção de dados mockados...");

  // 1. Criar Cupons
  const cupons = [];
  for (let i = 0; i < 10; i++) {
    const cupom = await prisma.cupom.create({
      data: {
        codigo: faker.string.alphanumeric(8).toUpperCase(),
        desconto: faker.helpers.arrayElement([5, 10, 15, 20, 25]), // Seleciona aleatoriamente entre os valores fixos
      },
    });
    cupons.push(cupom);
    console.log(
      `Cupom criado: ${cupom.codigo} com desconto de ${cupom.desconto}%`
    );
  }

  // 2. Criar Produtos e Estoque
  const uvasReais = [
    "Cabernet Sauvignon",
    "Merlot",
    "Pinot Noir",
    "Syrah",
    "Malbec",
    "Chardonnay",
    "Sauvignon Blanc",
    "Riesling",
    "Tempranillo",
    "Zinfandel",
  ];

  const descricoesGustativas = [
    "Notas de frutas vermelhas maduras com taninos suaves.",
    "Sabor encorpado com toques de especiarias e chocolate.",
    "Fresco e cítrico, com um final mineral.",
    "Aveludado, com notas de ameixa e baunilha.",
    "Leve e floral, com um toque de mel.",
    "Complexo, com camadas de frutas negras e carvalho.",
    "Equilibrado, com acidez vibrante e notas herbáceas.",
    "Doce e frutado, com um toque de damasco.",
    "Intenso, com taninos marcantes e final prolongado.",
    "Elegante, com notas de frutas secas e especiarias.",
  ];

  const descricoesOlfativas = [
    "Aroma de frutas vermelhas frescas e especiarias.",
    "Notas de baunilha e carvalho tostado.",
    "Perfume floral com toques de jasmim e mel.",
    "Aroma cítrico com nuances de limão e toranja.",
    "Fragrância de frutas negras maduras e chocolate.",
    "Notas herbáceas com um toque de eucalipto.",
    "Aroma de frutas tropicais como abacaxi e manga.",
    "Perfume de frutas secas e nozes.",
    "Aroma de especiarias doces como canela e cravo.",
    "Notas de café torrado e tabaco.",
  ];

  const descricoesAnalises = [
    "Acidez equilibrada com taninos bem integrados.",
    "Cor rubi intensa com reflexos violáceos.",
    "Final longo e persistente, com boa estrutura.",
    "Textura aveludada e corpo médio.",
    "Harmonioso, com excelente equilíbrio entre álcool e acidez.",
    "Boa complexidade aromática e gustativa.",
    "Estrutura robusta com potencial de envelhecimento.",
    "Cor dourada brilhante com reflexos esverdeados.",
    "Final fresco e mineral, com boa intensidade.",
    "Elegante e refinado, com excelente persistência.",
  ];

  const regioesVinicolas = [
    "Bordeaux, França",
    "Toscana, Itália",
    "Vale do Napa, EUA",
    "Mendoza, Argentina",
    "Douro, Portugal",
    "Champagne, França",
    "Barossa Valley, Austrália",
    "Rioja, Espanha",
    "Alsácia, França",
    "Valle de Colchagua, Chile",
  ];

  const nomesVinhos = [
    "Château Margaux",
    "Barolo Riserva",
    "Brunello di Montalcino",
    "Malbec Reserva",
    "Sauvignon Blanc",
    "Pinot Noir Bourgogne",
    "Carmenère Gran Reserva",
    "Syrah do Vale",
    "Chardonnay Premier Cru",
    "Vinho do Porto Vintage",
    "Merlot Reserva Especial",
    "Cabernet Sauvignon Clássico",
    "Tannat Seleção",
    "Riesling Trocken",
    "Tempranillo Crianza",
    "Rosé Provence",
    "Espumante Brut Rosé",
    "Lambrusco Dell’Emilia",
    "Zinfandel Old Vine",
    "Gewürztraminer Alsace",
    "Chianti Classico",
    "Primitivo di Manduria",
    "Touriga Nacional",
    "Viognier Elegance",
    "Petit Verdot Signature",
    "Garnacha Reserva",
    "Pinot Grigio Veneto",
    "Côtes du Rhône Rouge",
    "Moscato d’Asti",
    "Sangiovese Superiore",
  ];

  const descricoesVinhos = [
    "Vinho encorpado, com notas de frutas vermelhas e taninos suaves.",
    "Aromas complexos de especiarias, couro e frutas maduras.",
    "Fresco, elegante, com final persistente e toques de baunilha.",
    "Notas de ameixa, chocolate e leve toque de carvalho.",
    "Aromático, com acidez equilibrada e notas cítricas.",
    "Sabor intenso, taninos marcantes e final longo.",
    "Frutado, com notas de cassis e especiarias doces.",
    "Leve, refrescante, com aromas florais e minerais.",
    "Complexo, com camadas de frutas negras e toques terrosos.",
    "Doce, com notas de frutas secas e final aveludado.",
  ];

  const fotosVinhos = [
    "https://res.cloudinary.com/duucjfiew/image/upload/tinto_salton_ip_ocqgii.png",
    "https://res.cloudinary.com/duucjfiew/image/upload/Castellamare_Barricas_Cabernet_Sauvignon-removebg-preview_qi6zqa.png",
    "https://res.cloudinary.com/duucjfiew/image/upload/MERLOT_L.A._CAVE-removebg-preview_kyh1pf.png",
    "https://res.cloudinary.com/duucjfiew/image/upload/aurora_saperavi-removebg-preview_sdok8o.png",
    "https://res.cloudinary.com/duucjfiew/image/upload/Primeira_Estrada_Gran_Reserva_Syrah-removebg-preview_jvzgoi.png",
    "https://res.cloudinary.com/duucjfiew/image/upload/tinto_touriga_zxgpb9.png",
    "https://res.cloudinary.com/duucjfiew/image/upload/Garibaldi_Precioso_Tinto_Demi-Sec-removebg-preview_mlmk8b.png",
    "https://res.cloudinary.com/duucjfiew/image/upload/Tempos_de_G%C3%B3es_M%C3%ADneres_Syrah-removebg-preview_uu1qy8.png",
    "https://res.cloudinary.com/duucjfiew/image/upload/Luiz_Argenta_LA_Jovem_Shiraz-removebg-preview_gxrgcu.png",
    "https://res.cloudinary.com/duucjfiew/image/upload/Vinho1.png",
  ];

  const produtos = [];
  for (let i = 0; i < 20; i++) {
    const produto = await prisma.produto.create({
      data: {
        nome: faker.helpers.arrayElement(nomesVinhos), // linha 92 alterada
        descricao: faker.helpers.arrayElement(descricoesVinhos), // linha 93 alterada
        preco: parseFloat(faker.commerce.price(50, 500, 2)),
        classificacao: faker.number.int({ min: 1, max: 5 }),
        categoria: faker.helpers.arrayElement(["Tinto", "Branco", "Rosé"]),
        gustativo: faker.helpers.arrayElement(descricoesGustativas),
        olfativo: faker.helpers.arrayElement(descricoesOlfativas),
        regiao: faker.helpers.arrayElement(regioesVinicolas),
        amadurecimento: `${faker.number.int({
          min: 6,
          max: 24,
        })} meses em barris de carvalho`,
        analises: faker.helpers.arrayElement(descricoesAnalises),
        uvas: faker.helpers.arrayElement(uvasReais),
        temperatura: `${faker.number.int({ min: 8, max: 18 })}°C`,
        fotoVinho: faker.helpers.arrayElement(fotosVinhos),
      },
    });

    // Criar Estoque para o Produto
    await prisma.estoque.create({
      data: {
        idProduto: produto.idProduto,
        quantidade: faker.number.int({ min: 10, max: 100 }),
      },
    });

    produtos.push(produto);
    console.log(`Produto criado com estoque: ${produto.idProduto}`);
  }

  // 3. Criar Usuários e suas dependências
  for (let i = 0; i < 10; i++) {
    let usuario;

    if (i === 0) {
      // Primeiro usuário é o administrador
      usuario = await prisma.user.create({
        data: {
          cpf: "12312312312",
          nome: "admin",
          email: "admin@admin.com",
          sexo: "Masculino",
          telefone: "11111111111",
          nascimento: "01011900",
          password:
            "$2b$10$IjeE8oQIDbMxN.xOLJ3a2u71AsLsi1SFyHLUfivt3igOVFtignxbi",
          isAdmin: true,
          avatar:
            "https://res.cloudinary.com/duucjfiew/image/upload/default-profile-photo_pidfs8.jpg",
        },
      });
    } else {
      // Usuários aleatórios
      const nomeCompleto = faker.person.fullName();
      const primeiroNome = nomeCompleto.split(" ")[0].toLowerCase(); // Extrai o primeiro nome e converte para minúsculas

      usuario = await prisma.user.create({
        data: {
          cpf: faker.string.numeric(11),
          nome: nomeCompleto,
          email: faker.internet.email(),
          sexo: faker.helpers.arrayElement(["Masculino", "Feminino"]),
          telefone: faker.helpers.replaceSymbols("(##) #####-####", {
            "#": () => faker.number.int({ min: 0, max: 9 }),
            "(": () => faker.number.int({ min: 1, max: 9 }), // Garante que o DDD seja de 1 a 9
          }),
          nascimento: (() => {
            const date = faker.date.birthdate({
              min: 18,
              max: 60,
              mode: "age",
            });
            const day = String(date.getDate()).padStart(2, "0"); // Dia com 2 dígitos
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês com 2 dígitos
            const year = date.getFullYear(); // Ano com 4 dígitos
            return `${day}${month}${year}`; // Retorna no formato DDMMYYYY
          })(),
          password: (() => {
            let senha;
            do {
              senha = faker.animal.type(); // Gera o nome de um animal
            } while (senha.length <= 6); // Garante que a senha tenha mais de 6 letras
            return senha;
          })(),
          isAdmin: faker.datatype.boolean(),
          avatar: `https://github.com/${primeiroNome}.png`, // Gera o avatar com o primeiro nome
        },
      });
    }

    console.log(`Usuário criado: ${usuario.cpf}`);

    // 4. Criar Endereços para o Usuário
    for (let j = 0; j < 2; j++) {
      const endereco = await prisma.endereco.create({
        data: {
          usuarioCpf: usuario.cpf,
          apelido: faker.helpers.arrayElement(["Casa", "Trabalho"]),
          cep: faker.location.zipCode("########"),
          rua: faker.location.street(),
          numero: faker.number.int({ min: 1, max: 9999 }).toString(),
          complemento: faker.lorem.words(2),
          cidade: faker.location.city(),
          estado: faker.location.state(),
          bairro: faker.helpers.arrayElement([
            "Centro",
            "Jardim",
            "Vila",
            "Residencial",
          ]),
        },
      });

      console.log(
        `Endereço criado para o usuário ${usuario.cpf}: ${endereco.idEndereco}`
      );

      // 5. Criar Pedidos para o Usuário e Endereço
      for (let k = 0; k < 2; k++) {
        const valorTotal = Number(
          faker.number
            .float({
              min: 50,
              max: 500,
              precision: 0.01,
            })
            .toFixed(2)
        );
        const pedido = await prisma.pedido.create({
          data: {
            usuarioCpf: usuario.cpf,
            idEndereco: endereco.idEndereco,
            valorTotal,
            status: faker.helpers.arrayElement([
              "Pendente",
              "Pago",
              "Cancelado",
            ]),
            idCupom: faker.helpers.arrayElement(cupons).idCupom,
          },
        });

        console.log(
          `Pedido criado para o usuário ${usuario.cpf}: ${pedido.idPedido}`
        );

        // 6. Criar Pagamento para o Pedido
        const pagamento = await prisma.pagamento.create({
          data: {
            idPedido: pedido.idPedido,
            metodo: faker.helpers.arrayElement(["Cartão", "Boleto", "Pix"]),
            status: faker.helpers.arrayElement(["Pago", "Pendente"]),
            valorPago: Number(pedido.valorTotal.toFixed(2)),
            dataPagamento: faker.date.future().toISOString(),
          },
        });

        console.log(
          `Pagamento criado para o pedido ${pedido.idPedido}: ${pagamento.idPagamento}`
        );

        // 7. Criar Itens de Pedido
        for (let l = 0; l < 3; l++) {
          const produto = faker.helpers.arrayElement(produtos);

          const pedidoProduto = await prisma.pedidoProduto.create({
            data: {
              idPedido: pedido.idPedido,
              idProduto: produto.idProduto,
              quantidade: faker.number.int({ min: 1, max: 5 }),
              valorItem: produto.preco,
            },
          });

          console.log(
            `Item de pedido criado para o pedido ${pedido.idPedido}: ${pedidoProduto.idPedidoProduto}`
          );
        }
      }
    }

    const conteudosAvaliacao = [
      "Excelente vinho, sabor marcante e aroma agradável.",
      "Muito bom, harmoniza bem com carnes vermelhas.",
      "Gostei bastante, vinho leve e refrescante.",
      "Aroma frutado e final suave, recomendo!",
      "Ótima relação custo-benefício.",
      "Vinho encorpado, perfeito para ocasiões especiais.",
      "Sabor intenso, taninos equilibrados.",
      "Surpreendeu, voltarei a comprar.",
      "Ideal para acompanhar massas e queijos.",
      "Vinho agradável, mas poderia ser mais encorpado.",
    ];

    // 8. Criar Avaliações para Produtos
    for (let m = 0; m < 3; m++) {
      const avaliacao = await prisma.avaliacao.create({
        data: {
          usuarioCpf: usuario.cpf,
          idProduto: faker.helpers.arrayElement(produtos).idProduto,
          avaliacao: faker.number.int({ min: 1, max: 5 }), // Nota inteira
          conteudo: faker.helpers.arrayElement(conteudosAvaliacao), // Conteúdo realista
          dataCriacao: faker.date.recent().toISOString(),
        },
      });

      console.log(
        `Avaliação criada para o usuário ${usuario.cpf}: ${avaliacao.idAvaliacao}`
      );
    }

    // 9. Criar Favoritos para o Usuário
    for (let n = 0; n < 3; n++) {
      const produtoFavorito = faker.helpers.arrayElement(produtos);

      const favorito = await prisma.favoritos.create({
        data: {
          usuarioCpf: usuario.cpf,
          idProduto: produtoFavorito.idProduto,
        },
      });

      console.log(
        `Favorito criado para o usuário ${usuario.cpf}: ${favorito.idFavorito}`
      );
    }

    const assuntosMensagens = [
      "Dúvida sobre entrega",
      "Problema com pagamento",
      "Sugestão de produto",
      "Elogio ao atendimento",
      "Solicitação de troca",
      "Pergunta sobre promoção",
      "Reclamação de produto",
      "Atualização de cadastro",
      "Pedido de reembolso",
      "Agradecimento",
    ];

    const conteudosMensagens = [
      "Gostaria de saber quando meu pedido será entregue.",
      "Tive um problema ao tentar pagar com cartão de crédito.",
      "Sugiro adicionar mais opções de vinhos brancos ao catálogo.",
      "Parabéns pelo excelente atendimento prestado!",
      "Preciso trocar um produto que veio com defeito.",
      "Vi uma promoção no site, mas não consegui aplicar o cupom.",
      "Recebi um produto diferente do que comprei.",
      "Quero atualizar meu endereço de entrega.",
      "Solicito o reembolso do valor pago pelo pedido.",
      "Agradeço pela agilidade na entrega do meu pedido.",
    ];

    // 10. Criar Mensagens para o Usuário
    for (let o = 0; o < 2; o++) {
      const mensagem = await prisma.mensagem.create({
        data: {
          usuarioCpf: usuario.cpf,
          assunto: faker.helpers.arrayElement(assuntosMensagens),
          conteudo: faker.helpers.arrayElement(conteudosMensagens),
          dataEnvio: faker.date.recent().toISOString(),
        },
      });

      console.log(
        `Mensagem criada para o usuário ${usuario.cpf}: ${mensagem.idMensagem}`
      );
    }
  }

  console.log("Inserção de dados mockados concluída.");
}

main()
  .catch((e) => {
    console.error("Erro ao inserir dados mockados:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
