document.getElementById('formularioEvento').addEventListener('submit', function (i) {
  i.preventDefault();
  const tituloEvento = document.getElementById('tituloEvento').value;
  const fechaEvento = document.getElementById('fechaEvento').value;
  if (tituloEvento === '' || fechaEvento === '') {
    alert('Por favor completa todos los campos.');
    return;
  }

  agregarEvento(tituloEvento, fechaEvento);

  document.getElementById('formularioEvento').reset();
});

let listaEventos = JSON.parse(localStorage.getItem('eventos')) || [];

document.addEventListener('DOMContentLoaded', mostrarEventos);
  function mostrarEventos() {
  listaEventos.forEach(evento => {
    agregarEventoDOM(evento.titulo, evento.fecha);
  });
}

function agregarEvento(titulo, fecha) {
  const evento = { titulo, fecha };
  listaEventos.push(evento);
  localStorage.setItem('eventos', JSON.stringify(listaEventos));
  agregarEventoDOM(titulo, fecha);
}

function agregarEventoDOM(titulo, fecha) {
  const li = document.createElement('li');
  li.innerHTML = `${titulo} - ${fecha} <button class="botonEliminar">Eliminar</button>`;
  document.getElementById('listaEventos').appendChild(li);
  li.querySelector('.botonEliminar').addEventListener('click', function () {
    li.style.opacity = '0';
    setTimeout(() => {
      li.remove();
      eliminarEvento(titulo, fecha);
    }, 300);
  });
}

function eliminarEvento(titulo, fecha) {
  listaEventos = listaEventos.filter(evento => !(evento.titulo === titulo && evento.fecha === fecha));
  localStorage.setItem('eventos', JSON.stringify(listaEventos));
}

document.getElementById('campoBusqueda').addEventListener('input', function (e) {
  const terminoBusqueda = e.target.value.toLowerCase();
  const eventos = document.querySelectorAll('#listaEventos li');
  eventos.forEach(evento => {
    const textoEvento = evento.textContent.toLowerCase();
    if (textoEvento.includes(terminoBusqueda)) {
      evento.style.display = '';
    } else {
      evento.style.display = 'none';
    }
  });
});
