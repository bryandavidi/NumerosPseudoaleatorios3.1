window.addEventListener('load', function () {

    class LinearCongruence {
        // OBTENER Xi
        getX_i(x0, a, c, m, tam) {
            var x_i = [];
            for (let index = 0; index < tam; index++) {
                x0 = ((a * x0) + c) % m;
                x_i.push(x0);
            }
            return x_i;
        }

        //OBTENER Ri
        getR_i(x_i, m) {
            var r_i = [];
            for (let index = 0; index < x_i.length; index++) {
                r_i[index] = (x_i[index] / (m));
            }
            return r_i;
        }

        //OBTENER Ni
        getN_i(r_i, min, max) {
            var n_i = [];
            for (let index = 0; index < r_i.length; index++) {
                n_i[index] = min + (max - min) * r_i[index];
            }
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
        cl = new LinearCongruence();
        let x_0 = parseInt(document.querySelector("#x0").value);
        let k = parseInt(document.querySelector("#k").value);
        let c = parseInt(document.querySelector("#c").value);
        let g = parseInt(document.querySelector("#g").value);
        let tam = 50;
        let min = parseInt(document.querySelector("#min").value);
        let max = parseInt(document.querySelector("#max").value);

        let a = 1 + 2 * k;
        let m = Math.pow(2, g);
        let x_i = cl.getX_i(x_0, a, c, m, tam);
        let r_i = cl.getR_i(x_i, m);

        sessionStorage.clear();
        sessionStorage.setItem("ri", JSON.stringify(r_i));

        let n_i = cl.getN_i(r_i, min, max);

        createTable(cl.createMatrix(x_i, r_i, n_i));

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
            contentTable.push(tr)
        }
        tbody.append(...contentTable);
    }
});