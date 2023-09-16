window.addEventListener('load', function () {
    class Normal {

        //OBTENER EL NUMERO DE DATOS
        getN_i(data) {
            let n_i = [];
            data.forEach(element => {
                n_i.push(this.calculateNormInv(element).toFixed(5));
            });
            return n_i;
        }

        //DISTRIBUCION DE DISTRIBUCION DE PROBABILIDAD NORMAL INVERSA (FUNCION)
        calculateNormInv(v) {
            var acumulador = 0.00000028666;
            var i;
            for (i = -5; acumulador < v; i = i + 0.00001) {
                acumulador = acumulador + (0.00001 * this.calculaz(i - 0.000005));
            }
            return i;
        }

        //DENSIDAD DE PROBABILIDAD NORMAL (FUNCION)
        calculaz(v) {
            return Math.exp(-Math.pow(v, 2) / 2) / Math.sqrt(2 * Math.PI);
        }

        // OBTENER EL VALOR MINIMO
        getMin(list) {
            return Math.min(...list);
        }

        // OBTENER EL VALOR MAXIMO
        getMax(list) {
            return Math.max(...list);
        }

        //OBTENER EL INTERVALO
        getInterval(min, max, numberInterval) {
            var interval = [], aux = min;
            for (let index = 0; index < numberInterval; index++) {
                let number = aux + (max - min) / numberInterval;
                interval[index] = parseFloat(number.toFixed(10));
                aux = interval[index];
            }
            return interval.map(Number);
        }

        //OBTENER LA FRECUENCIA
        getFrecuency(x_i, init, list_final) {
            var frec = [];
            var count = 0;
            x_i.forEach(element => {
                if (element >= init && element <= list_final[0]) {
                    count++;
                }
            });
            frec.push(count);
            init = list_final[0];
            for (let index = 1; index < list_final.length; index++) {
                count = 0;
                x_i.forEach(element => {
                    if (this.isInFrecuency(element, init, list_final[index])) {
                        count++;
                    }
                });
                frec.push(count);
                init = list_final[index];
            }
            return frec;
        }

        //SABER SI ESTA EN FRECUENCIA
        isInFrecuency(number, init, final) {
            return number > init && number <= final;
        }

        //CREAR LA MATRIZ
        createMatrix(r_i, n_i) {
            let result = [];
            for (let i = 0; i < r_i.length; i++) {
                let data = [];
                data.push(i + 1, r_i[i], n_i[i]);
                result.push(data);
            }
            return result;
        }

        //CREANDO LA OTRA MATRIZ
        createMatrix2(min, max) {
            return [[min, max]];
        }
    }

    //CONEXION CON LOS COMPONENTES DE LA VISTA
    document.querySelector("#generate").addEventListener('click', function () {
        let n = new Normal();
        let r_i = JSON.parse(sessionStorage.getItem("ri"));
        let n_i = n.getN_i(r_i);
        var table1 = document.querySelector("#table-content");
        createTable(table1, n.createMatrix(r_i, n_i));
        let min = n.getMin(n_i); // VALOR MINIMO
        let max = n.getMax(n_i); // VALOR MAXIMO 
        let intervalos = n.getInterval(min, max, 20); // NUMERO DE INTERVALOS
        let frecuencias = n.getFrecuency(n_i, min, intervalos); // NUMERO DE FRECUENCIAS
        var table2 = document.querySelector("#table-interval");
        createTable(table2, n.createMatrix(intervalos, frecuencias));
        var table3 = document.querySelector("#table-minmax");
        createTable(table3, n.createMatrix2(min, max));
    });

    //ENVIAR LOS DATOS A LA VISTA DE LA TABLA
    function createTable(table, data) {
        var tbody = document.createElement("tbody")

        if(table.childElementCount>1){
            table.replaceChild(tbody,table.lastChild)
        }else{
            table.appendChild(tbody)
        }

        let contentTable = []
        for (let i = 0; i < data.length; i++) {
            var tr = document.createElement("tr");
            for (let j = 0; j < data[i].length; j++) {
                var td = document.createElement("td");
                var value = document.createTextNode(data[i][j])
                td.appendChild(value);
                tr.appendChild(td);
            }
            contentTable.push(tr);
        }
        tbody.append(...contentTable);
       
    }
});