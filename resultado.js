function toggleOption(element) {
    const form = document.getElementById('recommendationForm');
    const selectedOptions = form.querySelectorAll('.option.selected');

    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        element.querySelector('input').checked = false;
    } else if (selectedOptions.length < 2) {
        element.classList.add('selected');
        element.querySelector('input').checked = true;
    }
}

function selectOption(element) {
    const siblings = element.parentElement.querySelectorAll('.option');
    siblings.forEach(option => {
        option.classList.remove('selected');
        option.querySelector('input').checked = false;
    });

    element.classList.add('selected');
    element.querySelector('input').checked = true;
}

function submitForm() {
    const form = document.getElementById('recommendationForm');

    const renda = form.querySelector('[name="renda"]').value;
    const beneficios = Array.from(form.querySelectorAll('[name="beneficio"]:checked')).map(input => input.value);
    const negativado = form.querySelector('[name="negativado"]:checked')?.value;

    if (!renda) {
        alert('Por favor, preencha sua renda mensal.');
        return;
    }

    if (beneficios.length !== 2) {
        alert('Por favor, selecione exatamente 2 benefícios.');
        return;
    }

    if (!negativado) {
        alert('Por favor, selecione uma opção para a pergunta sobre negativação.');
        return;
    }

    const respostas = {
        renda,
        beneficios,
        negativado
    };

    arvoreDeDecisao(respostas)
}



function arvoreDeDecisao(respostas) {
    negativado = respostas.negativado
    renda = parseInt(respostas.renda)
    beneficios = respostas.beneficios

    if (negativado == 'Sim') {
        localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_2_negativados']));
        window.location.href = "cartoes.html";
        return;
    }

    if (renda < 5000) {
        if (
            beneficios.includes('limite_alto') && beneficios.includes('pontos') ||
            beneficios.includes('pontos') && beneficios.includes('facil_aprovacao') ||
            beneficios.includes('sem_anuidade') && beneficios.includes('pontos')

        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_5_interessantes']));
        } else if (
            beneficios.includes('limite_alto') && beneficios.includes('facil_aprovacao') ||
            beneficios.includes('sem_anuidade') && beneficios.includes('facil_aprovacao') ||
            beneficios.includes('facil_aprovacao') && beneficios.includes('cashback')

        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_2_negativados']));
        } else if (
            beneficios.includes('limite_alto') && beneficios.includes('sem_anuidade') ||
            beneficios.includes('limite_alto') && beneficios.includes('cashback') ||
            beneficios.includes('sem_anuidade') && beneficios.includes('cashback')
        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_3_cashback']));
        } else if (
            beneficios.includes('cashback') && beneficios.includes('pontos')
        ) {
            grupo3cashback = cartoes['grupo_3_cashback']
            grupo5pontos = cartoes['grupo_5_interessantes']
            uniaoGrupos = [...grupo3cashback, ...grupo5pontos]
            grupoOrdenado = ordenarPeloScore(uniaoGrupos)
            localStorage.setItem("cartoesRecomendados", JSON.stringify(grupoOrdenado));
        }

    } else if (renda < 10000) {
        if (
            beneficios.includes('limite_alto') && beneficios.includes('pontos') ||
            beneficios.includes('limite_alto') && beneficios.includes('facil_aprovacao') ||
            beneficios.includes('pontos') && beneficios.includes('facil_aprovacao') ||
            beneficios.includes('limite_alto') && beneficios.includes('sem_anuidade')
        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_6_medianos']));
        } else if (
            beneficios.includes('facil_aprovacao') && beneficios.includes('cashback') ||
            beneficios.includes('sem_anuidade') && beneficios.includes('cashback')
        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_3_cashback']));
        } else if (
            beneficios.includes('limite_alto') && beneficios.includes('cashback') ||
            beneficios.includes('pontos') && beneficios.includes('cashback')
        ) {
            grupo3cashback = cartoes['grupo_3_cashback']
            grupo6medianos = cartoes['grupo_6_medianos']
            uniaoGrupos = [...grupo3cashback, ...grupo6medianos]
            grupoOrdenado = ordenarPeloScore(uniaoGrupos)
            localStorage.setItem("cartoesRecomendados", JSON.stringify(grupoOrdenado));
        } else if (
            beneficios.includes('sem_anuidade') && beneficios.includes('facil_aprovacao')
        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_2_negativados']));
        } else if (
            beneficios.includes('sem_anuidade') && beneficios.includes('pontos')
        ) {
            cartoesGrupo5 = ['Cartão C6 Bank']
            grupo5 = getCartoesPeloNome(cartoesGrupo5, cartoes['grupo_5_interessantes'])
            grupo6medianos = cartoes['grupo_6_medianos']
            uniaoGrupos = [...grupo5, ...grupo6medianos]
            localStorage.setItem("cartoesRecomendados", JSON.stringify(uniaoGrupos));
        }
    } else if (renda < 20000) {
        if (
            beneficios.includes('limite_alto') && beneficios.includes('pontos') ||
            beneficios.includes('limite_alto') && beneficios.includes('facil_aprovacao')
        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_4_tops']));
        } else if (
            beneficios.includes('limite_alto') && beneficios.includes('sem_anuidade') ||
            beneficios.includes('limite_alto') && beneficios.includes('cashback') ||
            beneficios.includes('pontos') && beneficios.includes('sem_anuidade') ||
            beneficios.includes('pontos') && beneficios.includes('cashback')
        ) {
            grupo4Tops = cartoes['grupo_4_tops']
            grupo3cashback = cartoes['grupo_3_cashback']
            uniaoGrupos = [...grupo3cashback, ...grupo4Tops]
            grupoOrdenado = ordenarPeloScore(uniaoGrupos)
            localStorage.setItem("cartoesRecomendados", JSON.stringify(grupoOrdenado));
        } else if (
            beneficios.includes('sem_anuidade') && beneficios.includes('facil_aprovacao') ||
            beneficios.includes('sem_anuidade') && beneficios.includes('cashback') ||
            beneficios.includes('cashback') && beneficios.includes('facil_aprovacao')
        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_3_cashback']));

        } else if (
            beneficios.includes('pontos') && beneficios.includes('facil_aprovacao')
        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_5_interessantes']));
        }
    } else if (renda >= 20000) {
        if (
            beneficios.includes('limite_alto') && beneficios.includes('pontos') ||
            beneficios.includes('limite_alto') && beneficios.includes('cashback') ||
            beneficios.includes('pontos') && beneficios.includes('cashback')
        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_1_premiuns']));
        } else if (
            beneficios.includes('limite_alto') && beneficios.includes('facil_aprovacao')
        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_4_tops']));
        } else if (
            beneficios.includes('limite_alto') && beneficios.includes('sem_anuidade') ||
            beneficios.includes('facil_aprovacao') && beneficios.includes('cashback')
        ) {
            if (beneficios.includes('limite_alto') && beneficios.includes('sem_anuidade')) {
                cartoesGrupo3 = ['Cartão de crédito BMG', 'Vivo Itaú Cashback Mastercard Platinum']
                grupo3cashback = getCartoesPeloNome(cartoesGrupo3, cartoes['grupo_3_cashback'])
                grupo1Premiuns = cartoes['grupo_1_premiuns']
                uniaoGrupos = [...grupo3cashback, ...grupo1Premiuns]

            } else if (beneficios.includes('facil_aprovacao') && beneficios.includes('cashback')) {
                cartoesGrupo1 = ['Cartão C6 Carbon']
                grupo1Premiuns = getCartoesPeloNome(cartoesGrupo1, cartoes['grupo_1_premiuns'])
                grupo3cashback = cartoes['grupo_3_cashback']
                uniaoGrupos = [...grupo1Premiuns, ...grupo3cashback]
            }

            localStorage.setItem("cartoesRecomendados", JSON.stringify(uniaoGrupos));
        } else if (
            beneficios.includes('sem_anuidade') && beneficios.includes('pontos')
        ) {
            grupo5Interessantes = cartoes['grupo_5_interessantes']
            cartoesGrupo5 = ['Cartão C6 Bank']
            cartoesGrupo5 = getCartoesPeloNome(cartoesGrupo5, grupo5Interessantes)
            grupo1premiuns = cartoes['grupo_1_premiuns']
            uniaoGrupos = [...cartoesGrupo5, ...grupo1premiuns]
            localStorage.setItem("cartoesRecomendados", JSON.stringify(uniaoGrupos))
        } else if (
            beneficios.includes('sem_anuidade') && beneficios.includes('facil_aprovacao') ||
            beneficios.includes('sem_anuidade') && beneficios.includes('cashback')
        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_3_cashback']));

        } else if (
            beneficios.includes('pontos') && beneficios.includes('facil_aprovacao')
        ) {
            localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_6_medianos']));
        }

    } else {
        console.log('Nenhum grupo atendido')
        localStorage.setItem("cartoesRecomendados", JSON.stringify(cartoes['grupo_2_negativados']));
    }



    window.location.href = "cartoes.html";
}

function ordenarPeloScore(array) {
    return array.sort((a, b) => b.score - a.score);
}

function getCartoesPeloNome(nomes, cartoes) {
    return cartoes.filter(cartao => nomes.includes(cartao.titulo));
}

function renderizarCartoes() {
    const cartoesRecomendados = JSON.parse(localStorage.getItem("cartoesRecomendados"));

    if (cartoesRecomendados && cartoesRecomendados.length > 0) {
        const resultContainer = document.querySelector('.result-container');

        resultContainer.innerHTML = '';

        cartoesRecomendados.forEach((carto, index) => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.style.position = 'relative';

            const crownSpan = document.createElement('span');
            if (index == 0) {
                crownSpan.classList.add('crown');
                crownSpan.textContent = '👑';
                cardDiv.appendChild(crownSpan);
            }

            if (index == 1) {
                crownSpan.classList.add('crown');
                crownSpan.textContent = '🥈';
                cardDiv.appendChild(crownSpan);
            }

            if (index == 2) {
                crownSpan.classList.add('crown');
                crownSpan.textContent = '🥉';
                cardDiv.appendChild(crownSpan);
            }

            // Criar a imagem
            const img = document.createElement('img');
            img.src = carto.imagem;
            img.alt = carto.titulo;

            // Criar o título
            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = carto.titulo || "Cartão de crédito BMG";

            // Criar o corpo do cartão
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const rendaMinima = document.createElement('p');
            if (carto.renda_min) {
                rendaMinima.innerHTML = `<strong>Renda mínima:</strong> R$${carto.renda_min}`;
            } else {
                rendaMinima.innerHTML = `<strong>Renda mínima: </strong>` + "Não informado"
            }

            const limite = document.createElement('p');
            limite.innerHTML = `<strong>Limite:</strong> ${carto.limite}`;

            const beneficios = document.createElement('p');
            beneficios.innerHTML = `<strong>Benefícios:</strong> ${carto.beneficios}`;

            cardBody.appendChild(rendaMinima);
            cardBody.appendChild(limite);
            cardBody.appendChild(beneficios);

            // Criar as tags
            // const tagsDiv = document.createElement('div');
            // tagsDiv.classList.add('tags');
            // carto.tags.forEach(tag => {
            //     const tagSpan = document.createElement('span');
            //     tagSpan.classList.add('tag');
            //     tagSpan.textContent = tag;
            //     tagsDiv.appendChild(tagSpan);
            // });

            // Anuidade
            const anuidadeDiv = document.createElement('div');
            const anuidadeP = document.createElement('p');
            anuidade = carto.anuidade == null ? "Sem anuidade" : carto.anuidade;
            anuidadeP.innerHTML = `<strong>Anuidade: </strong>` + anuidade;
            anuidadeDiv.appendChild(anuidadeP);
            anuidadeDiv.classList.add('anuidade')

            const link = document.createElement('a');
            link.href = carto.link;
            link.classList.add('btn', 'btn-primary', 'btn-pedir');
            link.target = "_blank";
            link.textContent = "Pedir agora";

            if (index === 0) {
                cardDiv.appendChild(crownSpan);
            }
            cardDiv.appendChild(img);
            cardDiv.appendChild(title);
            cardDiv.appendChild(cardBody);
            cardDiv.appendChild(anuidadeDiv);
            cardDiv.appendChild(link);

            resultContainer.appendChild(cardDiv);
        });
    } else {
        const message = document.createElement('p');
        message.textContent = 'Nenhum cartão recomendado disponível.';
        document.querySelector('.result-container').appendChild(message);
    }
}