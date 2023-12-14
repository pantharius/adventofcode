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
  //.match(/.{1,3}/g) || []
  //.map(c=>+c)
  // s=0;
  let stacks = [];
  let i = 0;
  while (lines[i].includes('[')) {
    let lineEl = lines[i].match(/.{1,4}/g) || [];
    let lineStacks = lineEl.map(c=>c.trim());
    for (const [index,lineStack] of lineStacks.entries()) {
      if(!stacks[index]){
        stacks[index] = [];
      }
      if(lineStack!==""){
        stacks[index].push(lineStack.replace(/[\[|\]]/g,''));
      }
    }
    i++;
    // console.log(stacks);
  }
  i+=2;
  stacks2=[...stacks.map(c=>[...c])]
  console.log(stacks2);
  for (const line of lines.slice(i)) {
    // console.log(line);
    if(line=="") continue;
    let nums = [...line.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/)].slice(1).map(c=>+c-1);
    for (let j = 0; j <= nums[0]; j++) {
      stacks[nums[2]].unshift(stacks[nums[1]].shift())
    }
    stacks2[nums[2]].unshift(...stacks2[nums[1]].slice(0,nums[0]+1))
    stacks2[nums[1]] = stacks2[nums[1]].slice(nums[0]+1);
    console.log(nums)
    console.log(stacks2)
  }

  console.log(stacks.map(c=>c[0]).join(''));
  console.log(stacks2.map(c=>c[0]).join(''));
}

run();