<template>
    <div class="menu">
      <ul class="menu-items">
        <li @click="$router.push('/')">volver</li>
        <li @click="$router.push('/Perfil')">reserva Aqui!</li>
      </ul>
    </div>
    <router-view />
  </template>
  
  <script>
  export default {
    name: "MenuComponent",
  };
  </script>
  
  <style scoped>
  body {
  background-color: #1a1a2e; /* Cambia el color */
  
}
  /* 🔥 Estilo del menú */
  .menu {
    display: flex;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(135deg, #110c32, #140c2d);
    border-bottom: 3px solid #0a2037;
    box-shadow: 0px 4px 10px rgb(14, 27, 55);
  }
  
  /* 🔥 Estilo de la lista del menú */
  .menu-items {
    display: flex;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .menu-items li {
    padding: 12px 25px;
    background: linear-gradient(135deg, #1e3247, #20304e);
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(47, 18, 59, 0.3);
    transition: all 0.3s ease-in-out;
  }
  
  /* 🔥 Efecto al pasar el mouse sobre las opciones */
  .menu-items li:hover {
    background: linear-gradient(135deg, #09093e, #5b59af);
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(206, 210, 211, 0.5);
  }
  </style>
  
