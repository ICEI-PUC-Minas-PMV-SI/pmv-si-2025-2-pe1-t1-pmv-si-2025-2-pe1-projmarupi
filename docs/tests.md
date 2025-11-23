# Testes

Marupi utilizará dois tipos de testes:

- A **Verificação de conformidade**, na qual o próprio grupo analisará o cumprimento ou não dos requisitos funcionais e não funcionais que propusemos para o sistema.
- O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por usuários do público alvo da plataforma.

# Verificação de conformidade

## Plano de Testes de Software

Testes e verificação do cumprimento dos requisitos funcionais e não funcionais do sistema.

|     **Caso de Teste**     | **CT01 - Localizar e começar uma trilha a partir da landing page**                                                                                                                                                                                                 |
| :-----------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     **Procedimento**      | 1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-2-pe1-t1-pmv-si-2025-2-pe1-projmarupi/ <br> 2) Clique no botão "COMEÇAR AGORA" ou "EXPLORAR" <br> 2) Localize qual trilha deseja fazer no menu lateral <br> 3) Clique no botão "Começar". |
| **Requisitos associados** | RF-01 e RF-02                                                                                                                                                                                                                                                      |
|  **Resultado esperado**   | Iniciar uma trilha                                                                                                                                                                                                                                                 |
|   **Resultado obtido**    | Sucesso                                                                                                                                                                                                                                                            |

|     **Caso de Teste**     | **CT02 - Interação com conteúdo da trilha**                                                  |
| :-----------------------: | -------------------------------------------------------------------------------------------- |
|     **Procedimento**      | 1) Inicie a trilha Arqueologia Arbórea Urbana <br> 2) Desbloqueie etapas sucessivamente <br> |
| **Requisitos associados** | RF-03                                                                                        |
|  **Resultado esperado**   | Avançar até a etapa "Avaliação"                                                              |
|   **Resultado obtido**    | Sucesso                                                                                      |

|     **Caso de Teste**     | **CT03 - Visualização de recompensas e progresso**                                                                                                                        |
| :-----------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     **Procedimento**      | 1) Complete todas as etapas de uma trilha <br> 2) Retorne ao dashboard <br> 3) Verifique a aba "Geral" <br> 4) Verifique os tokens conquistados e o progresso obtido <br> |
| **Requisitos associados** | RF-04 e RF-07                                                                                                                                                             |
|  **Resultado esperado**   | O medidor de progresso deve marcar 100% e os tokens recebidos devem estar visíveis.                                                                                       |
|   **Resultado obtido**    | Sucesso                                                                                                                                                                   |

|     **Caso de Teste**     | \*\*CT04 - Persistência de dados do usuário                                                                                                                                        | localStorage\*\* |
| :-----------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
|     **Procedimento**      | 1) Reinicie uma trilha e avance algumas etapas <br> 2) Feche a aba do navegador <br> 3) Acesse a plataforma novamente <br> 4) Entre na trilha novamente a partir do dashboard <br> |
| **Requisitos associados** | RF-06                                                                                                                                                                              |
|  **Resultado esperado**   | O dashboard deve sinalizar que etapas já foram concluídas e permitir retomar do mesmo ponto em que o usuário parou.                                                                |
|   **Resultado obtido**    | Sucesso                                                                                                                                                                            |

|     **Caso de Teste**     | **CT05 - Reiniciar o progresso**                                                                                                   |
| :-----------------------: | ---------------------------------------------------------------------------------------------------------------------------------- |
|     **Procedimento**      | 1) Com algum progresso salvo, acesse a aba geral do dashboard <br> 2) Clique no botão "Reiniciar" <br> 3) Confirme o reinício <br> |
| **Requisitos associados** | RF-01                                                                                                                              |
|  **Resultado esperado**   | O dashboard deve zerar o progresso do usuário e todos os tokens conquistados devem sumir.                                          |
|   **Resultado obtido**    | Sucesso                                                                                                                            |

|     **Caso de Teste**     | **CT06 - Responsividade e Layout (mobile)**                                                                           |
| :-----------------------: | --------------------------------------------------------------------------------------------------------------------- |
|     **Procedimento**      | 1) Acesse a plataforma a partir de um celular <br> 2) Selecione uma das trilhas <br> 3) Tente completar a trilha <br> |
| **Requisitos associados** | RNF-03                                                                                                                |
|  **Resultado esperado**   | O usuário deve conseguir concluir a trilha, com o conteúdo adaptado para a interface mobile.                          |
|   **Resultado obtido**    | Sucesso                                                                                                               |

## Teste de usabilidade

Foram inúmeros os desafios para criar interfaces e recursos que permitissem o aprendizado experimentado que Marupí propõe. Seria falso omitir que testamos as trilhas durante seu próprio processo de desenvolvimento, já que algumas idéias funcionavam bem, outras nem tanto. Há alguns recursos que rompem com o padrão de navegação que o usuário está acostumado (como inversões dos sentidos dos scrolls e alguma desorientação na lógica de navegação e progressão da trilha de Arqueologia Arbórea Urbana, por exemplo.) O retorno qualitativo dessas experimentações foi fundamental para balizar os caminhos que o grupo resolveu apostar.

Há um vídeo dessa navegação, disponível em: [teste_de_usabilidade](https://drive.google.com/file/d/10U8M4p-8WAXwLsjroOA593SthDU8R8KT/view?usp=drive_link)

## Avaliação das verificações de conformidade

Quando idealizamos Marupi, imaginávamos que seria possível desenvolver 3 ou 4 trilhas. Mas esse desenvolvimento foi bem mais trabalhoso do que calculamos. Terminamos com uma trilha pronta e outras 3 em desenvolvimento. E pretendemos seguir alimentando a plataforma com novas trilhas.

Os requisitos funcionais e não funcionais foram cumpridos e atendidos.

## Avaliação dos Testes de Usabilidade

A plataforma mãe (landing page e dashboard) passou em todos os testes empíricos de navegação e interação do usuário. Não detectamos nenhuma estranheza ou confusão do usuário nesse acesso.
Na trilha Arqueologia Urbana Arbórea, detectamos alguma confusão do usuário na tela "Que Árvore é essa". Mas ao se deparar com o desafio e eventualmente fracassar, a maioria dos usuários dedica mais tempo às telas informativas de cada árvore para, então, superar o desafio.
A maior parte dos usuários se mostrou bastante satisfeita com a experiência.
