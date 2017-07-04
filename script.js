'use script';

window.onload = function() {
  getNotes();
  document.getElementById('addNote').onclick = function() {
    addNote();
  };
  window.onbeforeunload = saveNotes;
}

function addNote(title = '', text = '', kleur = '') {
  var kleuren = ['#b6bed6', '#b6ccaf', '#f4e8a1'];
  var note = document.createElement('li');
  var texten = document.createElement('div');
  var titel = document.createElement('textArea');
  var inhoud = document.createElement('textArea');
  var img = document.createElement('img');
  titel.value = title;
  inhoud.value = text;
  img.src = 'images/close.png';
  img.className = 'closeNote';
  img.onclick = function() {
    var note = this.parentNode;
    note.parentNode.removeChild(note);
  }
  note.style.backgroundColor = kleur || kleuren[Math.floor(Math.random() * kleuren.length)];
  texten.appendChild(titel);
  texten.appendChild(inhoud);
  note.appendChild(texten);
  note.appendChild(img);
  document.getElementsByTagName('ul')[0].appendChild(note);
  titel.focus();
}

function getNotes() {
  var notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach(function(note) {
    addNote(note.titel, note.inhoud, note.kleur);
  });
}

function saveNotes() {
  var notes = document.getElementsByTagName('li');
  notes = Array.prototype.slice.call(notes);
  notes = notes.map(function(note) {
    return {
      titel: note.firstChild.firstChild.value,
      inhoud: note.firstChild.lastChild.value,
      kleur: note.style.backgroundColor
    };
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}
