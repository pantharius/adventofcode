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
  let lines = input.split("\n");
  s=0;
  u=0;
  for (const line of lines) {
    const [E1,E2] = line.split(',');
    if(E1&&E2){
      const [VS1,VE1] = E1.split('-').map(c=>+c);
      const [VS2,VE2] = E2.split('-').map(c=>+c);
      if((VS1>=VS2 && VE1<=VE2)
        || (VS2>=VS1 && VE2<=VE1)){
        s+=1;
      }

      if((VS1<=VE2 && VE1>=VE2)
        || (VS2<=VE1 && VE2>=VE1)){
        u+=1;
      }
    }
  }

  console.log(s,u);
}

function getRangeNums(range){
  const [VS,VE] = range.split('-');
  return [..."-".repeat(VE-VS)].map((c,i)=>i+VS)
}

run();