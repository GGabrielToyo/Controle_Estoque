class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    cadastrar() {
        let produto = this.lerDados();

        if (this.validaCampos(produto)) {
            if (this, this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);
            }
        }
        this.listaTabela();
        this.cancelar();
    }


    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('desc').value = '';
        document.getElementById('valor').value = '';

        document.getElementById('btn').innerText = 'Salvar';
        this.editId = null;
    }


    adicionar(produto) {
        produto.valor = parseFloat(produto.valor);
        this.arrayProdutos.push(produto);
        this.id++;
    }


    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].descricao = produto.descricao;
                this.arrayProdutos[i].valor = produto.valor;
                this.arrayProdutos[i].disponivel = produto.disponivel;
            }
        }
    }


    preparaEdit(dados) {
        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('desc').value = dados.descricao;
        document.getElementById('valor').value = dados.valor;
        document.getElementsByName('disp').value = dados.disponivel;
        document.getElementById('btn').innerText = 'Atualizar';
    }


    listaTabela() { //Cria a tabela de forma dinâmica e insere os dados da arrayProdutos
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_disponivel = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = `R$ ${this.arrayProdutos[i].valor}`;
            td_disponivel.innerText = this.arrayProdutos[i].disponivel;

            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'imgEdit.png';
            imgEdit.setAttribute("onclick", "produto.preparaEdit(" + JSON.stringify(this.arrayProdutos[i]) + ")");

            let imgDelete = document.createElement('img'); // Imagem do campo excluir 
            imgDelete.src = 'imgDelete.png';
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
        }
    }

    lerDados() { //Lê os dados dos campos no HTML
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.descricao = document.getElementById('desc').value;
        produto.valor = document.getElementById('valor').value;
        produto.disponivel = document.querySelector('input[name="disp"]:checked').value

        return produto;
    }


    validaCampos(produto) { //Validação para saber se há algum campo não preenchido
        let msg = '';

        if (produto.nomeProduto == '') {
            msg += '- Informe o nome do produto \n';
        }
        if (produto.valor == '') {
            msg += '- Informe o valor do produto';
        }
        if (msg != '') {
            alert(msg);
            return false
        }
        return true;
    }

    deletar(id) { //Evento javaScript para confirmação da exclusão do produto na lista
        if (confirm(`Deseja realmente deletar o produto ${id} ?`)) {
            let tbody = document.getElementById('tbody');

            for (let i = 0; i < this.arrayProdutos.length; i++) { //faz a verificação para excluir os dados do indice correto
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }


}

    var produto = new Produto();















