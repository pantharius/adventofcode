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
  let elvesStocks = input.split(/\n\n/);
  const elvesCalories = [];
  for (const elfStock of elvesStocks) {
    let elfCalorie = elfStock.split('\n').map(c=>+c).reduce((a,b)=>a+b,0);
    elvesCalories.push(elfCalorie);
  }
  let sortedElves = [...elvesCalories.entries()].sort((a,b)=>b[1]-a[1]);
  console.log(sortedElves[0][1]);
  console.log(sortedElves.slice(0,3).map(c=>c[1]).reduce((a,b)=>a+b,0));
}

run();