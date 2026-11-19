var dati1;
var dati2;
var dati3;

// Quando si apre la pagina, scarica i 3 file JSON
window.onload = function() {
    leggiFile1();
    leggiFile2();
    leggiFile3();
};

// --- FILE 1: dati1GM.json ---
function leggiFile1() {
    var richiesta = new XMLHttpRequest();
    richiesta.open("GET", "dati1GM.json", true);
    richiesta.onreadystatechange = function() {
        if (richiesta.readyState == 4 && richiesta.status == 200) {
            dati1 = JSON.parse(richiesta.responseText);

            document.getElementById("titolo").innerHTML = dati1.titolo;
            document.getElementById("introduzione").innerHTML = dati1.introduzione;

            var menu = document.getElementById("menuNazioni");
            for (var i = 0; i < dati1.nazioni.length; i++) {
                var opzione = document.createElement("option");
                opzione.value = i;
                opzione.innerHTML = dati1.nazioni[i].nome;
                menu.appendChild(opzione);
            }
        }
    };
    richiesta.send();
}

function mostraNazione() {
    var indice = document.getElementById("menuNazioni").value;
    var box = document.getElementById("risultatoNazione");

    if (indice == "") {
        box.innerHTML = "Nessun paese selezionato.";
    } else {
        var n = dati1.nazioni[indice];
        box.innerHTML = "<b>Alleanza:</b> " + n.alleanza + "<br>" +
                        "<b>Soldati mobilitati:</b> " + n.soldati + "<br>" +
                        "<b>Info:</b> " + n.info;
    }
}

// --- FILE 2: morti1GM.json ---
function leggiFile2() {
    var richiesta = new XMLHttpRequest();
    richiesta.open("GET", "morti1GM.json", true);
    richiesta.onreadystatechange = function() {
        if (richiesta.readyState == 4 && richiesta.status == 200) {
            dati2 = JSON.parse(richiesta.responseText);

            var menu = document.getElementById("menuMorti");
            for (var i = 0; i < dati2.elenco.length; i++) {
                var opzione = document.createElement("option");
                opzione.value = i;
                opzione.innerHTML = dati2.elenco[i].tipo;
                menu.appendChild(opzione);
            }
        }
    };
    richiesta.send();
}

function mostraMorti() {
    var indice = document.getElementById("menuMorti").value;
    var box = document.getElementById("risultatoMorti");

    if (indice == "") {
        box.innerHTML = "Nessun dato selezionato.";
    } else {
        var m = dati2.elenco[indice];
        box.innerHTML = "<b>Morti:</b> " + m.morti + "<br>" +
                        "<b>Feriti / Prigionieri:</b> " + m.feriti + "<br>" +
                        "<b>Mezzi e armi:</b> " + m.mezzi;
    }
}

// --- FILE 3: cronologia_caporetto.json ---
function leggiFile3() {
    var richiesta = new XMLHttpRequest();
    richiesta.open("GET", "cronologia_caporetto.json", true);
    richiesta.onreadystatechange = function() {
        if (richiesta.readyState == 4 && richiesta.status == 200) {
            dati3 = JSON.parse(richiesta.responseText);

            var menu = document.getElementById("menuTappe");
            for (var i = 0; i < dati3.tappe.length; i++) {
                var opzione = document.createElement("option");
                opzione.value = i;
                opzione.innerHTML = dati3.tappe[i].giorno + " - " + dati3.tappe[i].titolo;
                menu.appendChild(opzione);
            }

            cambiaTappa(0);
        }
    };
    richiesta.send();
}

function cambiaTappa(i) {
    var t = dati3.tappe[i];
    document.getElementById("dataTappa").innerHTML = t.giorno;
    document.getElementById("titoloTappa").innerHTML = t.titolo;
    document.getElementById("testoTappa").innerHTML = t.testo;
    document.getElementById("immagineMappa").src = t.foto;
    document.getElementById("menuTappe").value = i;
}

function scegliTappa() {
    var indice = document.getElementById("menuTappe").value;
    cambiaTappa(indice);
}