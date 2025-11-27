function FuncSBC() {
    const searchBarForm = document.getElementById('id-search-form');
    const searchInput = searchBarForm.querySelector('input[type="text"]'); 
    const headerH1 = document.getElementById('id-h1-municipio');
    const headerH3 = document.getElementById('id-h3-municipio');
    const pathIndexMunicipios = "./json/indexmunicipios.json";
    const pathMunicipios = "./json/municipios.json";
    const popTotalIBGE = "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/-1/variaveis/9324?localidades=N6";


    let listaDeMunicipios = [];
    

    fetch(pathIndexMunicipios)
        .then(response => response.json())
        .then(data => {
            listaDeMunicipios = data; 
        })      
        .catch(error => {
            alert('Erro ao carregar os dados do JSON. Arquivo \"indexmunicipios.json\" não pode ser lido.', console.log('ERRO:',error));
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
                
    searchBarForm.addEventListener('submit', async event => {
        event.preventDefault(); 
        
        const termoBuscaFinal = searchInput.value.trim();

        if (listaDeMunicipios.length === 0 || termoBuscaFinal.length === 0) {
            alert('Nenhum valor inserido.');
            return;
            
        }

        const termoBuscaLower = termoBuscaFinal.toLowerCase();

        const municipioEncontrado = listaDeMunicipios.find(municipio => {
            return municipio.nome.toLowerCase() === termoBuscaLower;
        });

        if (municipioEncontrado) {
            const muniID = municipioEncontrado.id;
            
            async function loadMunicipiosJSON() {

                loadingScreen(false); 
            try {
                const response = await fetch(pathMunicipios);
                
                if (!response.ok) {
                    throw new Error(`Erro de rede: ${response.status}`);
                }
                
                const dados = await response.json();

                    const dadosMunicipioDetalhado = dados.find(m => m.id == muniID);
                    
                    if (!dadosMunicipioDetalhado) {
                        throw new Error(`Dados detalhados do município com ID ${muniID} não encontrados.`);
                    }

                    const sigUF = dadosMunicipioDetalhado.microrregiao.mesorregiao.UF.sigla;
                    const nomeUF = dadosMunicipioDetalhado.microrregiao.mesorregiao.UF.nome;
                    const mesoReg = dadosMunicipioDetalhado.microrregiao.mesorregiao.nome;

                    headerH3.textContent = 'Região: ' + mesoReg

                    loadingScreen(false);
                    
                     return { sigUF, nomeUF, mesoReg, dadosCompletos: dadosMunicipioDetalhado };
                } catch (error) {
                    alert('Erro ao carregar ou processar os dados detalhados do JSON.', console.log('ERRO:', error));
                    loadingScreen(false);
                return null;
                }
            }
            
        const dadosDetalhes = await loadMunicipiosJSON();
            
            if (dadosDetalhes) {
                headerH1.textContent = municipioEncontrado.nome + ' - ' + dadosDetalhes.sigUF;
                document.querySelector('.SBCtitle').innerHTML = municipioEncontrado.nome + ' - ' + dadosDetalhes.sigUF;
            } else {
                headerH1.textContent = municipioEncontrado.nome + ' - Dados Incompletos';
            }

        if (municipioEncontrado) {
            const muniID = municipioEncontrado.id;

            const dadosDetalhes = await loadMunicipiosJSON();

            if (dadosDetalhes) {
                loadingScreen(true);
                const dadosPop = await requestPopTotalIBGE(muniID);
                loadingScreen(false);

                const formValue = Number(dadosPop.populacao).toLocaleString('pt-BR');
                document.querySelector('#card-pop').innerHTML = formValue;


            }else{
                headerH1.textContent = municipioEncontrado.nome + ' - Dados Incompletos';
            }
        }

                
        requestPIBIBGE(muniID).then(result => {
        });

        const area = await requestAreaMapeadaIBGE(muniID);
        const formValuearea = Number(area).toLocaleString('pt-BR')
        document.getElementById('card-map').innerHTML = formValuearea + 'km²';

        const txtMunicipio = await requestSobreOMuni(muniID);
        document.querySelector(".p-SBCRecebetxt").innerHTML = txtMunicipio

         
    
        
        }

        else {
            headerH1.textContent = `Resultado da Pesquisa: "${termoBuscaFinal}" não encontrado`; 
            limpaResultados()  
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


// Foccus na Search bar
const searchForm = document.querySelector('#id-search-form');
const SBCCombobox = document.getElementById('id-sbccombobox');

function searchForm_NOHide() {

    searchForm.classList.add('search-form-hidden');
    SBCCombobox.style.display = 'block';

}
function searchForm_Hide() {

    searchForm.classList.remove('search-form-hidden');
    SBCCombobox.style.display = 'none';


}

// O click na searchbar
document.addEventListener('click', (event) => {
  if (searchForm.contains(event.target)) {

    searchForm_NOHide();

  } else {

    searchForm_Hide();

  }
});


// O fluxo do carrossel

const rastreio = document.querySelector('.carrossel-rastreio');
const cards = document.querySelectorAll('.cardIBGE');
const btnLeft = document.getElementById('IBGEbuttonleft');
const btnRight = document.getElementById('IBGEbuttonright');

let currentIndex = 0; 

function updateCarousel() {
  const offset = -currentIndex * 100;
  rastreio.style.transform = `translateX(${offset}%)`;
}

btnLeft.addEventListener('click', () => {
  if (currentIndex === 0) {
    currentIndex = cards.length - 1;
  } else {
    currentIndex--;
  }
  updateCarousel();
});

btnRight.addEventListener('click', () => {
  if (currentIndex === cards.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  updateCarousel();
});




// A tela de carregamento, nem sei se vai utilizar mesmo
function loadingScreen(toLoad){
    const loadingTag = document.querySelector('.loading')
    if(loadingTag){
        if(toLoad){
            loadingTag.id = 'loading-hidden'
        }
    }
    //  false/true acho que ta invertido. Funciona igual, mas é confuso
}



async function requestPopTotalIBGE(municipioId) {
    const popTotalIBGE_BASE = "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/-1/variaveis/9324?localidades=N6";
    const urlCompleta = `${popTotalIBGE_BASE}[${municipioId}]`;
            
        try {
            const response = await fetch(urlCompleta);
            if (!response.ok) {
                throw new Error(`Erro na API do IBGE: ${response.status}`);
            }
            const data = await response.json();
                
            if (data.length > 0 && data[0].resultados && data[0].resultados[0].series) {
                const serie = data[0].resultados[0].series[0].serie;
                const ano = Object.keys(serie)[0];
                const populacao = serie[ano];
                    
            return { populacao: populacao, ano: ano };
            }
            return { populacao: 'Dado não encontrado', ano: 'N/A' };

        } catch (error) {
            console.error('Erro ao buscar população no IBGE:', error);
            return { populacao: 'Erro na consulta', ano: 'N/A' };
        }

} 



async function requestPopUrbanaIBGE(municipioId) {
    const popUrbanaIBGE_BASE = "https://servicodados.ibge.gov.br/api/v3/agregados/9514/periodos/-2/variaveis/9335?localidades=N6";
    const urlCompleta = `${popUrbanaIBGE_BASE}[${municipioId}]`;

    loadingScreen(false)
    
    try {
        const response = await fetch(urlCompleta);
        if (!response.ok) {
            throw new Error(`Erro na API do IBGE (Urbana): ${response.status}`);
        }
        const data = await response.json();
        
        if (data.length > 0 && data[0].resultados && data[0].resultados[0].series) {
            const serie = data[0].resultados[0].series[0].serie;
            const ano = Object.keys(serie)[0];
            const popUrb = serie[ano];
            
            return { popUrb: popUrb, anoCenso: ano };
        }
        return { popUrb: 'Dado não encontrado', anoCenso: 'N/A' };

    } catch (error) {
        console.error('Erro ao buscar População Urbana no IBGE:', error);
        return { popUrb: 'Erro na consulta', anoCenso: 'N/A' };
    } finally {
        loadingScreen(true)
    }
}

async function requestAreaMapeadaIBGE(municipioId) {
    const pathArea = "./json/area.json";

    try {
        const response = await fetch(pathArea);
        if (!response.ok) {
            throw new Error(`Erro ao carregar area.json: ${response.status}`);
        }

        const dados = await response.json();

        const municipio = dados.find(m => m.id == municipioId);

        if (municipio) {
            return municipio.area;
        } else {
            return "Área não encontrada";
        }

    } catch (error) {
        console.error("Erro ao buscar área mapeada:", error);
        return "Erro na consulta";
    }
}


async function requestSobreOMuni(muniID) {
    const pathSobre = "./json/sobreomuni.json";

    try {
        const response = await fetch(pathSobre);
        if (!response.ok) {
            throw new Error(`Erro ao carregar sobreomuni.json: ${response.status}`);
        }

        const dados = await response.json();

        const municipio = dados.find(m => m.id == muniID);

        if (municipio) {

            const txtSobreoMuni = municipio.txt;
            document.querySelector('.p-SBCRecebetxt').classList.add('p-SBCRecebetxt-hide');

            return txtSobreoMuni;
        } else {
            return " ";
        }

    } catch (error) {
        console.error("Erro ao buscar informações do município:", error);
        return "Erro na consulta";
    }
}



async function requestPIBIBGE(municipioId) {
    const pibIBGE_BASE = "https://servicodados.ibge.gov.br/api/v3/agregados/21/periodos/2012/variaveis/37?localidades=N6";
    const urlCompleta = `${pibIBGE_BASE}[${municipioId}]`;

    loadingScreen(false)

    try {
        const response = await fetch(urlCompleta);
        if (!response.ok) {
            throw new Error(`Erro na API do IBGE (PIB): ${response.status}`);
        }

        const data = await response.json();

        if (data.length > 0 && data[0].resultados && data[0].resultados[0].series) {
            const serie = data[0].resultados[0].series[0].serie;
            const ano = Object.keys(serie)[0];
            const muniPIB = serie[ano];

            const idCardMap = document.getElementById('card-pib')

            
            const formValue = Number(muniPIB).toLocaleString('pt-BR');
            idCardMap.innerHTML = 'R$ '+ formValue;


            return { muniPIB, ano };
        }

        return { muniPIB: 'Dado não encontrado', ano: 'N/A' };

    } catch (error) {
        console.error('Erro ao buscar PIB no IBGE:', error);
        return { muniPIB: 'Erro na consulta', ano: 'N/A' };
    } finally {

        loadingScreen(true)
    }

}

FuncSBC();

loadingScreen(true);