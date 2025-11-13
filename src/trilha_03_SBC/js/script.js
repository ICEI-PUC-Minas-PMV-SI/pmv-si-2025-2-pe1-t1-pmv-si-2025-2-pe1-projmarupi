function FuncSBC() {

    const searchBarForm = document.getElementById('id-search-form');
    const searchInput = searchBarForm.querySelector('input[type="text"]'); 
    const headerH1 = document.getElementById('id-h1-municipio');
    const pathIndexMunicipios = "./json/indexmunicipios.json";

    let listaDeMunicipios = []; 

    fetch(pathIndexMunicipios)
        .then(response => response.json())
        .then(data => {
            listaDeMunicipios = data; 
        })
        .catch(error => {
            console.error('Erro ao carregar os dados dos municípios:', error);
        });


    searchBarForm.addEventListener('input', event => {
        const termoBusca = event.target.value.trim();

        if (listaDeMunicipios.length === 0 || termoBusca.length === 0) {
            exibirResultados([]);
            return;
        }
        
        const termoBuscaLower = termoBusca.toLowerCase();

        const resultadosFiltrados = listaDeMunicipios
            .filter(municipio => {
                return municipio.nome.toLowerCase().startsWith(termoBuscaLower);
            })
            .map(municipio => municipio.nome);
            
        exibirResultados(resultadosFiltrados);
    });

    searchBarForm.addEventListener('submit', event => {
        event.preventDefault(); 
        
        const termoBuscaFinal = searchInput.value.trim();

        if (listaDeMunicipios.length === 0 || termoBuscaFinal.length === 0) {
            headerH1.textContent = 'Nenhum município pesquisado.';
            return;
            
        }

        const termoBuscaLower = termoBuscaFinal.toLowerCase();

        const municipioEncontrado = listaDeMunicipios.find(municipio => {
            return municipio.nome.toLowerCase() === termoBuscaLower;
        });

        if (municipioEncontrado) {
            headerH1.textContent = municipioEncontrado.nome + ' - ' + 'MG'; /* fetch municipios.json */
        } else {
            headerH1.textContent = `Resultado da Pesquisa: "${termoBuscaFinal}" não encontrado`; /* Voltar aqui. N sei se é a melhor forma */
            
            limpaResultados()
            
            /*Ajustar o CSS*/
            

        }
        
        exibirResultados([]); 
    });
}


function exibirResultados(listaDeNomes) {
    const listaResultados = document.getElementById('id-sbccombobox');
    listaResultados.innerHTML = ''; 

    if (listaDeNomes.length > 0) {
        listaDeNomes.forEach(nomeMunicipio => {
            const itemLista = document.createElement('li');
            itemLista.classList.add('sbcli');
            itemLista.textContent = nomeMunicipio;
            
            itemLista.addEventListener('click', () => {
                document.querySelector('#id-search-form input[type="text"]').value = nomeMunicipio;
                listaResultados.innerHTML = '';
                document.getElementById('id-search-form').dispatchEvent(new Event('submit'));
            });

            listaResultados.appendChild(itemLista);
        });

    } else {

    }
}

/* pt com eng... ai sim mds */
function limpaResultados(){
    const info_IBGE = document.getElementsByClassName('carrossel-container')
    info_IBGE[0].style.display = 'none';

    const H3_IBGE = document.getElementById('id-h3-municipio')
    H3_IBGE.style.display = 'none';

    const P_IBGE = document.getElementById('id-p-municipio')
    P_IBGE.style.display = 'none';
}


FuncSBC();