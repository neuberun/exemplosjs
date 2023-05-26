// elementos e variáveis
const input_valor = document.getElementById('valor');
const lista_valores = document.getElementById('valores');
const ordenacao = document.getElementById('tipos_ordenacao');
let arr = [];

function add() {
    if (input_valor.value !== "") {
        node = document.createElement("li");
        node.innerHTML = parseInt(input_valor.value);
        lista_valores.append(node);
        input_valor.value = "";
    } else {
        window.alert("Digite apenas números inteiros!");
    }
}

function ordenar() {
    arr = Array.from(lista_valores.children).map(v => parseInt(v.innerText));

    switch (parseInt(ordenacao.value)) {
        case 1:
            console.log("bubble")
            bubble_sort();
            break;
        case 2:
            console.log("selection")
            selection_sort();
            break;
        case 3:
            console.log("quick")
            quick_sort(arr, 0, arr.length - 1);
            break;
        default:
            console.log("default")
            bubble_sort();
    }

    atualizar_lista();
}

function misturar() {
    arr = Array.from(lista_valores.children).map(v => parseInt(v.innerText));
    arr.sort((a, b) => 0.5 - Math.random());
    atualizar_lista();
}

function atualizar_lista() {
    lista_valores.innerHTML = "";

    arr.forEach((valor) => {
        let li = document.createElement("li");
        li.innerText = valor;
        lista_valores.appendChild(li);
    });
}

function limpar_lista() {
    lista_valores.innerHTML = "";
}

// métodos de ordenação

bubble_sort = () => {
    // iteração externa
    for (let i = 0; i < arr.length; i++) {

        // iteração interna
        for (let j = 0; j < arr.length - i - 1; j++) {

            // comparação de valores em ordem ascendente
            if (arr[j + 1] < arr[j]) {

                // trocas
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }
        }
    };
}

selection_sort = () => {
    let min;

    for (let i = 0; i < arr.length; i++) {
        // índice do menor valor
        min = i;

        // checar o resto da lista por um valor menor
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        // comparar os índices
        if (min !== i) {
            // trocar
            [arr[i], arr[min]] = [arr[min], arr[i]];
        }
    }
}

quick_sort = (arr, posicao_inicial, posicao_final) => {
    let index;

    if (arr.length > 1) {
        index = particionamento(arr, posicao_inicial, posicao_final);

        if (posicao_inicial < index - 1) {
            // mais valores ao lado da posição inicial
            quick_sort(arr, posicao_inicial, index - 1);
        }

        if (index < posicao_final) {
            // mais valores ao lado da posião final
            quick_sort(arr, index, posicao_final);
        }
    }
}

// função de apoio ao algoritmo quick_sort 
particionamento = (arr, posicao_inicial, posicao_final) => {
    let pivot = arr[Math.floor((posicao_final + posicao_inicial) / 2)],
        i = posicao_inicial,
        j = posicao_final;

    while (i <= j) {
        // incrementar o ponteiro da posição inicial se o valor or menor que o pivot
        while (arr[i] < pivot) {
            i++;
        }

        // decrementar o ponteiro da posição final se o valor for maior que o pivot
        while (arr[j] > pivot) {
            j--;
        }

        // senão troque
        if (i <= j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }

    return i;
}