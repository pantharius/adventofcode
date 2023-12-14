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
  s=[];
  for (const line of lines) {
    if(line.length>0){
      let firsthalf = [...line.substring(0,line.length/2)];
      let secondhalf = [...line.substring(line.length/2)];
      let repeatedChar = firsthalf.find(c=>secondhalf.includes(c));
      let prio = repeatedChar.charCodeAt(0) - (/[a-z]/.test(repeatedChar) ? 96 : 38);
      s.push(prio);
    }
  }
  console.log("1: "+s.reduce((a,b)=>a+b,0));
}
async function runday2() {
  let input = await getInput();
  let lines = input.split("\n");
  let groupes = lines.reduce((r, e, i) =>
    (i % 3 ? r[r.length-1].push(e) : r.push([e])) && r
  , []);

  s=[];
  for (const group of groupes) {
    let commons = group.reduce((common, current) => {
      if (common.length === 0) {
        return current;
      }
      return [...common].filter(item => current.includes(item));
    }, []);
    let repeatedChar = commons[0];
    if(repeatedChar){
      let prio = repeatedChar.charCodeAt(0) - (/[a-z]/.test(repeatedChar) ? 96 : 38);
      s.push(prio);
    }
  }
  console.log("2: "+s.reduce((a,b)=>a+b,0));
}

run();
runday2();