// Задача 9:
// Реализовать функцию конвертации JSON в строку

// Решение:

const convertToString = (json) => {
  return JSON.stringify(json); // написать самому
};

// Пример:

const example = {
  squadName: "Super hero squad",
  homeTown: "Metro City",
  formed: 2016,
  secretBase: "Super tower",
  active: true,
  members: [
    {
      name: "Molecule Man",
      age: 29,
      secretIdentity: "Dan Jukes",
      powers: ["Radiation resistance", "Turning tiny", "Radiation blast"],
    },
  ],
};

console.log(convertToString(example));
