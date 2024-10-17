export const getRandomEventColor = () => {
  const colors = [
    '#d09bd1',
    '#2b5e35',
    '#2b365e',
    '#5e2b3a',
    '#5e3e2b',
    '#d68c60',
    '#a32e43',
    '#2121b5',
    '#18c95f',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
