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