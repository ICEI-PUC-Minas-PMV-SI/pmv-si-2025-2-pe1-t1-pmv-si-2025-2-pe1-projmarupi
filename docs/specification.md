## PERFIS DE USUÁRIOS

### Perfil 1 – Aluno Explorador

**Descrição:** Crianças e jovens em idade escolar (06 a 17 anos), curiosos, mas com pouca vivência cultural fora das telas.  
**Necessidades:**

- Trilha de aprendizado gamificada que estimule a exploração de ambientes reais.
- Recompensas (tokens) que mantenham a motivação.
- Conteúdo adaptado à localidade e fácil de compreender.

### Perfil 2 – Aluno Neuro divergente

**Descrição:** Estudantes que apresentam TEA, TDAH ou outras condições cognitivas que exigem estímulos diferenciados.  
**Necessidades:**

- Interface de baixo estímulo visual.
- Linguagem clara e objetiva.
- Instruções passo a passo e feedback imediato.

### Perfil 3 – Professor Facilitador

**Descrição:** Educadores que desejam utilizar a plataforma como recurso pedagógico complementar em sala de aula.  
**Necessidades:**

- Acompanhamento do progresso dos alunos.
- Sugestões de atividades presenciais vinculadas ao currículo.
- Relatórios e indicadores de engajamento.

### Perfil 4 – Instituição Educacional

**Descrição:** Escolas públicas e privadas que buscam inovar suas práticas pedagógicas e ampliar a conexão com a comunidade.  
**Necessidades:**

- Recursos alinhados à BNCC (Base Nacional Comum Curricular).
- Possibilidade de uso coletivo em sala de aula.
- Inclusão de práticas culturais locais no currículo.

### Perfil 5 – Família Apoiadora

**Descrição:** Pais, mães ou responsáveis que desejam estimular experiências culturais e educativas fora das telas.  
**Necessidades:**

- Atividades simples de realizar em conjunto.
- Orientações sobre espaços culturais próximos.
- Incentivo à participação comunitária.

### Perfil 6 – Gestor Cultural/Comunidade

**Descrição:** Responsáveis por museus, centros culturais e projetos sociais interessados em aumentar a participação do público jovem.  
**Necessidades:**

- Integração da plataforma com espaços culturais reais.
- Divulgação de atividades presenciais.
- Engajamento dos jovens da comunidade.

## HISTÓRIAS DE USUÁRIOS

> Eu como **[QUEM]**… quero/desejo **[O QUE]**… para **[PORQUE]**.

| Como...                                            | Desejo...                                                                                                        | Para...                                                                                            |
| :------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| **Professor**, em cenários de excursões escolares, | auxílio para ampliar e fixar no imaginário do aluno a experiência cultural e regional vivida,                    | que assim meus alunos possam absorver todas as informações de forma proveitosa e estimulante.      |
| **Estudante**,                                     | aprender mais sobre informações culturais sobre minha localidade,                                                | fins culturais, mas também de entretenimento.                                                      |
| **Pai/mãe**,                                       | que os estímulos que meu filho recebe frente às telas sejam saudáveis, trazendo-o sempre pra realidade material, | que ele crie conexões sociais, importantes para seu desenvolvimento para uma vida adulta saudável. |
| **Responsável pelo centro cultural municipal**,    | incentivo para a ferramenta que auxilie a difundir a história e tudo o que temos de bom em nossa cidade,         | proporcionar lazer, cultura, turismo e fomento econômico.                                          |
| **Estudante**,                                     | receber recompensas ao concluir atividades                                                                       | me manter motivado e continuar avançando nas trilhas.                                              |
| **Estudante**,                                     | reiniciar meu progresso sempre que quiser                                                                        | recomeçar minha experiência de aprendizado do zero ou consertar erros.                             |
| **Família Apoiadora**,                             | realizar atividades simples junto ao meu filho                                                                   | estimular experiências educativas fora das telas e fortalecer vínculos familiares.                 |
| **Professor Facilitador**,                         | ter sugestões de atividades vinculadas ao currículo                                                              | integrar a plataforma ao planejamento pedagógico.                                                  |
| **Aluno Neuro Divergente**,                        | interagir com uma interface simples e de baixo estímulo visual                                                   | conseguir focar no conteúdo sem me sentir sobrecarregado.                                          |

## REQUISITOS DO PROJETO

```diff
+ ## Requisitos Funcionais
```

| ID        | Descrição                                                                                                                                                                                           | Prioridade |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| **RF-01** | O sistema deve permitir que o usuário reinicie seu progresso, limpando os dados salvos no navegador.                                                                                                | Alta       |
| **RF-02** | O sistema deve permitir que o usuário selecione uma trilha de aprendizagem transdisciplinar de interesse para iniciar.                                                                              | Alta       |
| **RF-03** | O sistema deve apresentar o conteúdo de cada etapa da trilha, que pode incluir textos, imagens, perguntas de múltipla escolha, desafios de observação e atividades interativas de drag and drop.    | Alta       |
| **RF-04** | O sistema deve permitir que os usuários acompanhem o seu progresso nas trilhas de aprendizagem, visualizando as atividades concluídas e as recompensas obtidas.                                     | Alta       |
| **RF-05** | O sistema deve ser projetado com foco em uma experiência de usuário minimalista e acessível.                                                                                                        | Média      |
| **RF-06** | O sistema deve salvar o progresso do usuário (trilhas e atividades concluídas) no navegador (localStorage), permitindo que ele continue de onde parou na mesma máquina.                             | Média      |
| **RF-07** | O sistema deve conceder recompensas visuais (como tokens ou medalhas) ao usuário pela conclusão de atividades e trilhas, com os totais salvos localmente (localStorage).                            | Baixa      |
| **RF-08** | O sistema deve permitir que o usuário informe um nome ou apelido para personalizar a experiência. Essa informação será salva localmente no navegador (localStorage) e não requer cadastro ou senha. | Baixa      |

**Prioridade:** Alta / Média / Baixa.

```diff
+ # Requisitos não funcionais
```

| ID         | Descrição                                                                                                                                                                         | Prioridade |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| **RNF-01** | A interface do usuário deve ser intuitiva e fácil de usar, especialmente para crianças e jovens, com navegação clara e feedback visual adequado.                                  | Alta       |
| **RNF-02** | O design da aplicação deve ser de baixo estímulo visual e compatível com as necessidades de pessoas neuro divergentes, seguindo diretrizes de acessibilidade web (WCAG[^7]).      | Alta       |
| **RNF-03** | O sistema deve ser compatível com os principais navegadores e dispositivos móveis (layout responsivo).                                                                            | Alta       |
| **RNF-04** | A aplicação deve ser desenvolvida inteiramente com tecnologias front-end (HTML, CSS, JavaScript) sem dependência de um servidor de back-end para suas funcionalidades principais. | Alta       |
| **RNF-05** | **Desempenho:** tempo de carregamento inicial rápido, com otimização de imagens e recursos.                                                                                       | Média      |

**Prioridade:** Alta / Média / Baixa.

# RESTRIÇÕES DO PROJETO

A plataforma que pensamos é um ecossistema de aprendizagem dinâmico, que propõe diversidade de saberes transdisciplinares e customização dessas trilhas e percursos de acordo com a cidade e perfil de interesse do usuário. São implementações robustas, que exigiriam tempo, equipe e recursos totalmente distantes do que temos disponível. Somos um grupo de 6 pessoas que acreditam muito no potencial desse projeto. Mas também estamos cientes que Marupi é, antes de tudo, parte do escopo de um semestre acadêmico dedicado ao desenvolvimento web front end. Amadurecer as competências e habilidades nessa área de forma coletiva é a premissa original. Ainda que para isso seja necessário abrir mão de muitas das idéias que desenvolvemos na presente etapa de documentação. É bastante provável que seja viável desenvolver apenas um ou dois temas. Mas num cenário de muita inspiração, sinergia e realismo esperançoso dignos do próprio Ariano Suassuna, é possível que cada integrante lidere o desenvolvimento de um dos temas e de alguma feature que possa ser reaproveitada pelos demais colegas, numa fantástica e produtiva aventura colaborativa. Entenderemos a viabilidade disso na própria feitura das trilhas propostas. Certo mesmo é que um projeto a doze mãos reverbera pelo futuro rizomaticamente por imprevisíveis marupis.

---

[^7]: WORLD WIDE WEB CONSORTIUM (W3C). **Web Content Accessibility Guidelines (WCAG) 2.1**. 2018. Disponível em: <https://www.w3.org/TR/WCAG21/>. Acesso em: 7 set. 2025.
