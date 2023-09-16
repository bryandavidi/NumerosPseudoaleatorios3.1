window.addEventListener('load', function () {

    class UniformDist {

        // OBTENER Ni
        getN_i(r_i, min, max) {
            var n_i = [];
            for (let index = 0; index < r_i.length; index++) {
                n_i[index] = min + (max - min) * r_i[index];
            }
            return n_i;
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
    }

    //CONEXION CON LOS COMPONENTES DE LA VISTA
    document.querySelector("#generate").addEventListener('click', function () {
        var un = new UniformDist();
        let min = parseInt(document.querySelector("#min").value);
        let max = parseInt(document.querySelector("#max").value);

        let r_i = JSON.parse(sessionStorage.getItem("ri"));
        console.log(r_i);
        
        let n_i = un.getN_i(r_i,min,max);
        var table = document.querySelector("#table-ud");
        createTable(table, un.createMatrix(r_i, n_i),  "#table-ud>tbody");
    });

    //ENVIAR LOS DATOS A LA VISTA DE LA TABLA
    function createTable(table, data, replace) {
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

        tbody.append(...contentTable);
    }
});