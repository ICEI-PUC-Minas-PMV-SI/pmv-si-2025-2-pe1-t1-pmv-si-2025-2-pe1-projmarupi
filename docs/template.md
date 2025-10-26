# Template padrão do site

Marupi pode ser dividida em duas estruturas distintas:

1. A plataforma principal, que apresenta as características, funcionalidades e peculiaridades do ensino experimentado a partir de nossa solução. Uma landing page principal (home) é responsável pela introdução e contextualização ao usuário. As outras telas (painel e dashboard do usuário) serão dedicadas ao cumprmento dos requisitos funcionais do projeto (seleção e acompanhamento do progresso do usuário nas trilhas ofertadas).

2. Trilha de aprendizado, que busca alguma imersão do usuário a partir de estratégias que variam conforme o conteúdo trabalhado. Desde o início pensamos em trilhas que refletissem visualidades distintas, pois dialógicas com cada conteúdo. O escape de todas as trilhas será feito a partir de um menu lateral, que permanecerá recolhido durante a trilha, mas prontamente acessível a partir de um clique em seu devido ícone representativo.

## Design

A logomarca será preferencialmente posicionada no topo do menu, ou no canto superior esquerdo da página.

Todo o site será responsivo para dispositivos de resoluções distintas. Em algumas páginas, alguns elementos ou efeitos interativos (hovers que não sejam aplicados em botões, por exemplo) serão suprimidos para que o usuário experimente o melhor layout possível diante das limitações do tamanho de cada interface.

## Cores

As cores da plataforma mãe seguem a seguinte paleta de cores:

/_ Global _/
--default-white: #ffffff;
--cool-gray-10: #f2f4f8;
--cool-gray-20: #dde1e6;
--cool-gray-30: #c1c7cd;
--cool-gray-50: #878d96;
--cool-gray-60: #697077;
--cool-gray-90: #21272a;
--primary-10: rgba(15, 98, 254, 0.10);
--primary-30: #a6c8ff;
--primary-60: #0f62fe;
--primary-60-dark: #0c4fd0;
--primary-90: #001d6c;
--muted: #475569;
--font-color: #21272a;

Todas as trilhas foram encorajadas a utilizar a cor primária azul #0F62FE da plataforma em alguns elementos.

## Tipografia

--font-family: 'Roboto', 'Lato', Segoe UI', 'Helvetica Neue', Tahoma, Geneva, Verdana, sans-serif;

## Iconografia

A iconografia da plataforma Marupi será fundamental para garantir uma navegação intuitiva e uma rápida associação de ideias, seguindo os princípios de clareza, simplicidade e consistência.

Todos os ícones seguirão um estilo visual unificado (ex: "outline" (vazados) ou "solid" (preenchidos)), evitando a mistura de estilos que pode poluir a interface.

Os ícones serão empregados estrategicamente para:

- Orientar a navegação (ex: o ícone de menu lateral nas trilhas, ícones do dashboard).

- Indicar ações (ex: salvar, editar, avançar, voltar).

- Representar status (ex: progresso concluído, alerta, informação).

- Reforçar visualmente conceitos e categorias de conteúdo.

## OBSERVAÇÃO IMPORTANTE

Por motivos de lógica de implementação, o menu lateral da plataforma (presente em todas as trilhas) será implementado apenas na próxima etapa, já que sua implantação praticamente implicaria na finalização de todo o código javascript.
