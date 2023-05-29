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
    for (let i = 0; i < arr.length; i++) {

        for (let j = 0; j < arr.length - i - 1; j++) {

            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }
        }
    };
}

selection_sort = () => {
    let min;

    for (let i = 0; i < arr.length; i++) {
        min = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];
        }
    }
}

quick_sort = (arr, posicao_inicial, posicao_final) => {
    let index;

    if (arr.length > 1) {
        index = particionamento(arr, posicao_inicial, posicao_final);

        if (posicao_inicial < index - 1) {
            quick_sort(arr, posicao_inicial, index - 1);
        }

        if (index < posicao_final) {
            quick_sort(arr, index, posicao_final);
        }
    }
}

particionamento = (arr, posicao_inicial, posicao_final) => {
    let pivot = arr[Math.floor((posicao_final + posicao_inicial) / 2)],
        i = posicao_inicial,
        j = posicao_final;

    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }

        while (arr[j] > pivot) {
            j--;
        }

        if (i <= j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }

    return i;
}