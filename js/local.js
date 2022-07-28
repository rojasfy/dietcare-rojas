let listacita = [];

function addcita(pnombre, pnumero, pemail, pfecha) {
  let newcita = {
    paciente: pnombre,
    celular: pnumero,
    email: pemail,
    fechaCita: pfecha,
  };
  console.log(newcita);
  listacita.push(newcita);
  localStoragelistacita(listacita);
}

function getlistacita() {
  var acumuladolista = localStorage.getItem("listacitalocal");
  if (acumuladolista == null) {
    listacita = [];
  } else {
    listacita = JSON.parse(acumuladolista);
  }
  return listacita;
}

function localStoragelistacita(plista) {
  localStorage.setItem("listacitalocal", JSON.stringify(plista));
}
