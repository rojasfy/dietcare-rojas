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

function getFriendList() {
  var storedList = localStorage.getItem("localFriendList");
  if (storedList == null) {
    friendList = [];
  } else {
    friendList = JSON.parse(storedList);
  }
  return friendList;
}

function localStoragelistacita(plista) {
  localStorage.setItem("listacitalocal", JSON.stringify(plista));
}
