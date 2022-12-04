import {readFileSync, promises as fsPromises} from "fs";

function syncReadFile(filename: any) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}


const totalContained = (data: string[]) => {
  const contained = data.filter(x => isContained(x))
  return contained.length
}

const isContained = (pair: string): boolean => {
  const pairs = pair.split(',').map(x => x.split('-')).flat().map(x => parseInt(x));
  const fullyContained = (pairs[0] <= pairs[2] && pairs[1] >= pairs[3]) || (pairs[0] >= pairs[2] && pairs[1] <= pairs[3])
  return fullyContained
}

const data = syncReadFile('day_4/data.txt');
const total = totalContained(data)
console.log('total: ', total)
