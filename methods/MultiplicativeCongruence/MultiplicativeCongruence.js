window.addEventListener('load', function () {

    class MultiplicativeCongruence {
        // OBTENER Xi
        getX_i(x0, a, m, tam) {
            var x_i = [];
            for (let index = 0; index < tam; index++) {
                x0 = (a * x0) % m;
                x_i.push(x0);
            }
            return x_i;
        }

        //OBTENER Ri
        getR_i(x_i, m) {
            let r_i = [];
            x_i.forEach(element => {
                r_i.push(element / (m - 1));
            });
            return r_i;
        }

        //OBTENER Ni
        getN_i(r_i, a, b) {
            let n_i = [];
            r_i.forEach(element => {
                n_i.push(a + (b - a) * element);
            });
            return n_i;
        }

        //CREAR LA MATRIZ
        createMatrix(x_i, r_i, n_i) {
            let result = [];
            for (let i = 0; i < r_i.length; i++) {
                let data = [];
                data.push(i + 1, x_i[i], r_i[i], n_i[i]);
                result.push(data);
            }
            return result;
        }
    }

     //CONEXION CON LOS COMPONENTES DE LA VISTA
    document.querySelector("#generate").addEventListener('click', function () {
        cm = new MultiplicativeCongruence();
        //Entrada de datos
        let x_0 = parseInt(document.querySelector("#x0").value);
        let t = parseInt(document.querySelector("#t").value);
        let g = parseInt(document.querySelector("#g").value);
        let min = parseInt(document.querySelector("#min").value);
        let max = parseInt(document.querySelector("#max").value);
        let tam = 15;

        let a = (8 * t) + 3;
        let m = Math.pow(2, g);

        let x_i = cm.getX_i(x_0, a, m, tam);
        let r_i = cm.getR_i(x_i, m);

        let n_i = cm.getN_i(r_i, min, max);

        sessionStorage.clear();
        sessionStorage.setItem("ri", JSON.stringify(r_i));

        createTable(cm.createMatrix(x_i, r_i, n_i));
    });

    //ENVIAR LOS DATOS A LA VISTA DE LA TABLA
    function createTable(data) {
        var table = document.querySelector("#table-content");
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
        //var new_tbody = document.createElement('tbody');
        tbody.append(...contentTable)
    }
});