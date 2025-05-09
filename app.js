const API_URL = "https://script.google.com/macros/s/AKfycbzeaVhUVFshijboc-fkOfZEw8jASZNl4cGMW6Di4UA78JChmw4JclFoS5-JEElCv7e_/exec";

// Función para autenticar
async function login(email, password) {
  const response = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);
  const { rol } = await response.json();
  
  if (rol) {
    localStorage.setItem('user', JSON.stringify({ email, rol }));
    window.location.href = `${rol}.html`;
  } else {
    alert("Usuario no registrado");
  }
}

// Función para crear tareas (Recepcionista)
async function crearTarea(detalle) {
  const user = JSON.parse(localStorage.getItem('user'));
  
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'crearTarea',
      detalle: detalle,
      email: user.email
    })
  });
  
  return await response.json();
}

// Función para cargar tareas (Admin/Auxiliar)
async function cargarTareas() {
  const user = JSON.parse(localStorage.getItem('user'));
  
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'getTareas',
      rol: user.rol,
      email: user.email
    })
  });
  
  return await response.json();
}
