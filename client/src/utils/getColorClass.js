  //colores para las categorias 
  export const getColorClass = (categoryName) => {
    const colors = {
      Entretenimiento: "bg-[#56CCF2]",
	    Negocios: "bg-[#F2994A]",//azul
    	Arte: "bg-[#27AE60]",//naranja
      Moda: "bg-[#88D94C]",//verde
      Deportes: "bg-[#ED0004]",//rojo
      Cocina: "bg-[#F5EC10]",//amarillo
      Viajes: "bg-[##A16F18]",//marron
      Educación:"bg-[#A1288D]",//violeta
      Salud:"bg-[#55EDA3]",//verde agua
      Tecnología:"bg-[#07C6ED]",//celeste
      Anime:"bg-[#ED149C]",//rosa
      Musica:"bg-[#613EAB]"//violeta azulado
    }
    return colors[categoryName] || "bg-gray-400";
  }
