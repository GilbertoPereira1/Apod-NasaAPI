// ----------------------------------> Controller
class ControllerUniverso {

    ultimoDia(ano, mes) {
        let data = new Date(ano, mes, 0);

        return data.getDate();
    }

    dataAtual(){
    let now = new Date;
    let dia = now.getDate();
    if(dia.toString().length == 1){
        dia = '0'+dia;
    } 

    let mes = now.getMonth();
    mes++;
    
    if(mes.toString().length == 1){
        mes = '0'+mes;
    } 
    let ano = now.getFullYear();
    let dataFinal =  `${ano}-${mes}-${ dia}`;

     return dataFinal;
    }

    busca() {
        let dia = document.getElementById("data").value;
        let model = new gModel();
        model.buscaDados(dia);

        document.getElementById("data").value = dia;
    }

    proxima() {
        let dia = document.getElementById("data").value;

        if(dia == "" || dia == this.dataAtual()){
            
            return;
        }        

        let arrayData = dia.split("-");

        let ultimoDia = this.ultimoDia(arrayData[0], arrayData[1]);

        if(arrayData[1] == 12 && arrayData[2] == 31){
            arrayData[0]++;
            arrayData[1] = '0' + 1;
            arrayData[2] = '0' + 1;
        } else if (arrayData[2] < ultimoDia) {
            arrayData[2]++;
            if (arrayData[2].toString().length == 1) {
                arrayData[2] = '0' + arrayData[2];
            }
        } else if (arrayData[2] == ultimoDia) {
            arrayData[1]++;
            if (arrayData[1].toString().length == 1) {
                arrayData[1] = '0' + arrayData[1];
            }
            arrayData[2] = '0' + 1;
        }

        let novoDia = arrayData.join("-");

        let model = new gModel();
        model.buscaDados(novoDia);

        document.getElementById("data").value = novoDia;
    }

    anterior() {
        let dia = document.getElementById("data").value;
        if(dia == ""){
            
            dia = this.dataAtual();

        }

        let arrayData = dia.split("-");
        
        if(arrayData[1] == 1 && arrayData[2] == 1){
            arrayData[0]--;
            arrayData[1] = 12;
            arrayData[2] = 31;
        }else if(arrayData[2] > 1){
            arrayData[2]--;
            if (arrayData[2].toString().length == 1) {
                arrayData[2] = '0' + arrayData[2];
            }
        }else if(arrayData[2] == 1){
            arrayData[1]--;
            if (arrayData[1].toString().length == 1) {
                arrayData[1] = '0' + arrayData[1];
            }
            arrayData[2] = this.ultimoDia(arrayData[0], arrayData[1]);
        }


        let novoDia = arrayData.join("-");


        let model = new gModel();
        model.buscaDados(novoDia);


        document.getElementById("data").value = novoDia;
    }
}

// ----------------------------------> Model
class gModel {

    constructor() {
        this._titulo = "";
        this._imagem = "";
        this._direito = "";
        this._data = "";
        this._descricao = "";
        this._tipoDeMidia = "";
    }

    get titulo() {
        return this._titulo;
    }

    get imagem() {
        return this._imagem;
    }


    buscaDados(data) {
        let request = new XMLHttpRequest();

        request.open("GET", `https://api.nasa.gov/planetary/apod?api_key=dxn9Ln0dZqaCkKHg42b3eJp0gWqbe8YvVPLL2F7t&date=${data}`);

        request.addEventListener("load", () => {

            if (request.status == 200) {

                let response = JSON.parse(request.responseText);
                this._titulo = response.title;
                this._imagem = response.hdurl;
                if (response.copyright == undefined) {
                    this._direito = `Not found`;
                } else {
                    this._direito = response.copyright;
                }

                this._data = response.date;
                this._descricao = response.explanation;
                this._tipoDeMidia = response.media_type;


                let view = new GalaxyView();
                view.botaNaTela(this._titulo, this._imagem, this._direito, this._data, this._descricao, this._tipoDeMidia)

            } else {
                console.log("Código inesperado");
            }

        });

        request.send();
    }

}

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
