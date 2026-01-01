const CODE_VERSION = "2.0.0";

const scheduleData = [
  { dia: "01/01", leitura: "Deuteronômio 28:1-7", sunday: false },
  { dia: "02/01", leitura: "Deuteronômio 28:8-14", sunday: false },
  { dia: "03/01", leitura: "Deuteronômio 28:15-26", sunday: false },
  { dia: "DOM 04/01", leitura: "Deuteronômio 28:27-44", sunday: true },
  { dia: "05/01", leitura: "Deuteronômio 28:45-57", sunday: false },
  { dia: "06/01", leitura: "Deuteronômio 28:58-68", sunday: false },
  { dia: "07/01", leitura: "Gálatas 3:6-14", sunday: false },
  { dia: "08/01", leitura: "Provérbios 26:2", sunday: false },
  { dia: "09/01", leitura: "Lucas 6:20-31", sunday: false },
  { dia: "10/01", leitura: "Lucas 6:32-38", sunday: false },
  { dia: "DOM 11/01", leitura: "Lucas 6:39-49", sunday: true },
  { dia: "12/01", leitura: "Hebreus 3:7-11", sunday: false },
  { dia: "13/01", leitura: "Hebreus 3:12-19", sunday: false },
  { dia: "14/01", leitura: "Hebreus 4:11-16", sunday: false },
  { dia: "15/01", leitura: "Hebreus 11:1-6", sunday: false },
  { dia: "16/01", leitura: "Efésios 1:16-23", sunday: false },
  { dia: "17/01", leitura: "Efésios 2:1-10", sunday: false },
  { dia: "DOM 18/01", leitura: "Gênesis 12:1-7", sunday: true },
  { dia: "19/01", leitura: "Gênesis 24:1-9", sunday: false },
  { dia: "20/01", leitura: "Gênesis 24:10-21", sunday: false },
  { dia: "21/01", leitura: "Gênesis 24:22-49", sunday: false },
  { dia: "22/01", leitura: "Gênesis 24:50-67", sunday: false },
  { dia: "23/01", leitura: "Provérbios 31:1-31", sunday: false },
  { dia: "24/01", leitura: "Gálatas 5:16-26", sunday: false },
  { dia: "DOM 25/01", leitura: "João 6:24-27", sunday: true },
  { dia: "26/01", leitura: "João 6:28-29", sunday: false },
  { dia: "27/01", leitura: "João 6:30-40", sunday: false },
  { dia: "28/01", leitura: "João 6:41-51", sunday: false },
  { dia: "29/01", leitura: "João 6:52-58", sunday: false },
  { dia: "30/01", leitura: "João 6:59-71", sunday: false },
  { dia: "31/01", leitura: "Salmo 27", sunday: false },
  { dia: "DOM 01/02", leitura: "Isaías 53:1-6", sunday: true },
  { dia: "02/02", leitura: "Isaías 53:7-12", sunday: false },
  { dia: "03/02", leitura: "Isaías 54:1-6", sunday: false },
  { dia: "04/02", leitura: "Isaías 54:7-17", sunday: false },
  { dia: "05/02", leitura: "Isaías 55:1-11", sunday: false },
  { dia: "06/02", leitura: "Isaías 61:1-4", sunday: false },
  { dia: "07/02", leitura: "Tiago 3:1-12", sunday: false },
  { dia: "DOM 08/02", leitura: "Tiago 3:13-18", sunday: true },
  { dia: "09/02", leitura: "Números 12:1-16", sunday: false },
];

const container = document.getElementById("scheduleContainer");
const resetButton = document.getElementById("resetButton");

const storedVersion = localStorage.getItem("codeVersion");
if (storedVersion !== CODE_VERSION) {
  localStorage.setItem("codeVersion", CODE_VERSION);
}

let checkedReadings = JSON.parse(localStorage.getItem("checkedReadings")) || {};

function generateBibleUrl(versiculo) {
  const livrosMap = {
    Deuteronômio: "dt",
    Gálatas: "gl",
    Provérbios: "pv",
    Lucas: "lc",
    Hebreus: "hb",
    Efésios: "ef",
    Gênesis: "gn",
    João: "jo",
    Salmo: "sl",
    Isaías: "is",
    Tiago: "tg",
    Números: "nm",
  };

  const match = versiculo.match(/^([^\d]+)\s+(\d+):?(\d*)-?(\d*)/);
  if (!match) return "#";

  const livroNome = match[1].trim();
  const capitulo = match[2];
  const versiculoInicio = match[3];
  const versiculoFim = match[4];

  const codigoLivro = livrosMap[livroNome] || livroNome.toLowerCase();

  let url = `https://www.bibliaonline.com.br/acf/${codigoLivro}/${capitulo}`;

  if (versiculoInicio) {
    url += `/${versiculoInicio}`;
    if (versiculoFim) {
      url += `-${versiculoFim}`;
    }
  }

  return url;
}

function renderSchedule() {
  container.innerHTML = "";

  scheduleData.forEach((item, index) => {
    const itemId = `day-${index}`;

    const dayItem = document.createElement("div");
    dayItem.className = "day-item" + (item.sunday ? " sunday" : "");
    dayItem.dataset.id = itemId;

    const dayDate = document.createElement("div");
    dayDate.className = "day-date";
    dayDate.textContent = item.dia;

    const dayReading = document.createElement("div");
    dayReading.className = "day-reading";
    dayReading.textContent = item.leitura;

    const checkbox = document.createElement("div");
    checkbox.className = "checkbox";
    if (checkedReadings[itemId]) {
      checkbox.classList.add("checked");
    }

    const verButton = document.createElement("button");
    verButton.className = "ver-button";
    verButton.textContent = "VER";
    verButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const url = generateBibleUrl(item.leitura);
      window.open(url, "_blank");
    });

    dayItem.appendChild(dayDate);
    dayItem.appendChild(dayReading);
    dayItem.appendChild(verButton);
    dayItem.appendChild(checkbox);

    dayItem.addEventListener("click", () => toggleCheck(itemId, checkbox));

    container.appendChild(dayItem);
  });
}

function toggleCheck(itemId, checkbox) {
  checkbox.classList.toggle("checked");

  if (checkbox.classList.contains("checked")) {
    checkedReadings[itemId] = true;
  } else {
    delete checkedReadings[itemId];
  }

  localStorage.setItem("checkedReadings", JSON.stringify(checkedReadings));
}

function resetReadings() {
  if (
    confirm(
      "Tem certeza que deseja limpar TODAS as marcações de leitura? Esta ação não pode ser desfeita."
    )
  ) {
    checkedReadings = {};
    localStorage.removeItem("checkedReadings");
    renderSchedule();
    alert("Marcações resetadas com sucesso!");
  }
}

renderSchedule();
resetButton.addEventListener("click", resetReadings);
