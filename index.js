require("dotenv").config();

const colors = require("colors");
const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

// console.log(process.argv); // Muestra variables de entorno del sistema
// console.log(process.env.MAPBOX_KEY); // Imprime variables de entorno

const main = async () => {
  const busquedas = new Busquedas();
  let opt;
  do {
    opt = await inquirerMenu();
    // console.log({ opt });
    // await pausa();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput("Ciudad: "); // termino de busqueda

        // Buscar los lugares
        const lugares = await busquedas.ciudad(termino);

        // Seleccionar el lugar
        const id = await listarLugares(lugares);
        const lugarselected = lugares.find((l) => l.id === id);
        // console.log(lugarselected);

        // Clima

        // Mostrar resultados
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:", lugarselected.nombre);
        console.log("Lat:", lugarselected.lat);
        console.log("Lng:", lugarselected.lng);
        console.log("Temperatura:");
        console.log("Mínima");
        console.log("Máxima");

        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
