'use script';

// var notes = [];

window.onload = function() {
  getNotes();
  document.getElementById('addNote').onclick = function() {
    addNote();
  };
  window.onresize = saveNotes;
  window.onbeforeunload = saveNotes;
}

function addNote(title = '', text = '') {
  var note = document.createElement('li');
  var texten = document.createElement('div');
  var titel = document.createElement('textArea');
  var inhoud = document.createElement('textArea');
  var img = document.createElement('img');
  titel.value = title;
  inhoud.value = text;
  note.id = document.getElementsByTagName('ul')[0].children.length;
  img.src = 'images/close.png';
  img.className = 'closeNote';
  img.onclick = closeNote;
  // titel.onblur = function() {
  //   notes[this.parentNode.parentNode.id]['titel'] = this.value;
  // };
  // inhoud.onblur = function() {
  //   notes[this.parentNode.parentNode.id]['inhoud'] = this.value;
  // };
  texten.appendChild(titel);
  texten.appendChild(inhoud);
  note.appendChild(texten);
  note.appendChild(img);
  document.getElementsByTagName('ul')[0].appendChild(note);
  titel.focus();
  // notes[note.id] = {titel: titel.value, inhoud: inhoud.value};
}

function closeNote() {
  var note = this.parentNode;
  // notes.splice(note.id, 1);
  this.parentNode.parentNode.removeChild(this.parentNode);
}



function getNotes() {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(function(note) {
      addNote(note.titel, note.inhoud);
    });
}

function saveNotes() {
  var notes = document.getElementsByTagName('li').
  notes = Array.prototype.map.call(notes, function(note) {
    return {
      titel: note.firstChild.firstChild.textContent,
      inhoud: note.firstChild.lastChild.textContent
    };
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}
