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