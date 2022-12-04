import {readFileSync, promises as fsPromises} from "fs";

function syncReadFile(filename: any) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}


const getTotalContained = (data: string[]) => {
  const contained = data.filter(x => isContained(x))
  return contained.length
}

const isContained = (pair: string): boolean => {
  const pairs = pair.split(',').map(x => x.split('-')).flat().map(x => parseInt(x));
  const fullyContained = (pairs[0] <= pairs[2] && pairs[1] >= pairs[3]) || (pairs[0] >= pairs[2] && pairs[1] <= pairs[3])
  return fullyContained
}

const getTotalOverlapped = (data: string[]) => {
  const overlapped = data.filter(x => x === '' ? false : isOverlapped(x))
  return overlapped.length
}

const isOverlapped = (pair: string): boolean => {
  const firstPair = pair.split(',')[0].split('-').map(x => parseInt(x))
  const secondPair = pair.split(',')[1].split('-').map(x => parseInt(x))


  const overlapped = secondPair[0] <= firstPair[1] && secondPair[1] >= firstPair[0]

  console.log(firstPair, secondPair, overlapped)
  return overlapped;
}

const data = syncReadFile('day_4/data.txt');
const totalContained = getTotalContained(data)
console.log('total contained:', totalContained)
const totalOverlapped = getTotalOverlapped(data)
console.log('total overlapped:', totalOverlapped)
