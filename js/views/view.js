// ----------------------------------> Viewer
class GalaxyView {

    constructor() {
        this._elementoTitulo = document.getElementById("titulo");
        this._elementoDireito = document.getElementById("direito");
        this._elementoData = document.getElementById("dataG");
        this._elementoDescricao = document.getElementById("descricao");
        this._elementoMidia = document.getElementById("media");
        this._elementoImagem = document.getElementById("img-prin");

    }

    botaNaTela(titulo, imagem, direito, data, descricao, midia) {

        this._elementoTitulo.textContent = titulo;
        this._elementoDireito.textContent = `Copyright: ${direito}`;
        this._elementoData.textContent = `Date: ${data}`;
        this._elementoDescricao.textContent = `Description: ${descricao}`;
        this._elementoMidia.textContent = `Media Type: ${midia}`;
        this._elementoImagem.setAttribute("src", `${imagem}`);

    }

}


let controle = new ControllerUniverso();

controle.busca();

document.getElementById("data").addEventListener('input', function () {
    controle.busca();

})

document.getElementById("proximo").addEventListener("click", function () {
    controle.proxima();
})

document.getElementById("anterior").addEventListener("click", function () {
    controle.anterior();
})
