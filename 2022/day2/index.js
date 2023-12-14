const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function fetchData(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'Cookie': "session=53616c7465645f5fbf0bc3e6b4fc4a6cd5372f45dff80263d294932a1ff3c4d8d50c27b863884115fa8e5797ba324d2ab7feab439071c336fc7180caba6c19a1;",
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}


async function getInput() {
  const currentPath = process.cwd();
  const yearDayFolder = currentPath.split(path.sep).slice(-2).join('');
  const [yearStr, dayStr] = yearDayFolder.split('day');
  
  const pathfolders = `${yearStr}/day/${dayStr}`;
  const inputLink = `https://adventofcode.com/${pathfolders}/input`;

    if (!inputLink) {
        throw new Error('Please provide a link as a command-line argument.');
    } else {
        return await fetchData(inputLink);
    }
}
async function getEInput() {
  const filePath = "./example.input";
  return await fs.readFileSync(filePath, 'utf-8');
}

async function run() {
  let input = await getInput();
  let rounds = input.split("\n")
  let s = 0;
  let u = 0;
  for (const round of rounds) {
    const [P1,P2] = round.split(' ');
    if(P1&&P2){
      const point = getPoint(P1,P2);
      const point2 = getPointPart2(P1,P2);
      s+= point;
      u+= point2;
    }
  }
  console.log(s,u); 
}


function getPoint(P1,P2){
  let score = P2.charCodeAt(0)-87;
  switch (P1) {
    case "A": // Rock
      if (P2=="X") return score+3;
      if (P2=="Y") return score+6;
      return score;
    case "B": // Paper
      if (P2=="Z") return score+6;
      if (P2=="Y") return score+3;
      return score;
    case "C": // Scissors
      if (P2=="X") return score+6;
      if (P2=="Z") return score+3;
      return score;
  }
}

function getPointPart2(P1,P2){
  switch (P1) {
    case "A": // Rock
      if (P2=="X") return getPoint(P1,"Z");
      if (P2=="Y") return getPoint(P1,"X");
      return getPoint(P1,"Y");
    case "B": // Paper
      if (P2=="X") return getPoint(P1,"X");
      if (P2=="Y") return getPoint(P1,"Y");
      return getPoint(P1,"Z");
    case "C": // Scissors
      if (P2=="X") return getPoint(P1,"Y");
      if (P2=="Y") return getPoint(P1,"Z");
      return getPoint(P1,"X");
  }
}

run();