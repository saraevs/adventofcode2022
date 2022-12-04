import {readFileSync, promises as fsPromises} from "fs";

function syncReadFile(filename: any) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

const getTotals = (data: string[]) => {
  const totals: number[] = []
  let currentTotal = 0;

  data.map(c => {
    if (c === '') {
      totals.push(currentTotal)
      currentTotal = 0;
    } else {
      currentTotal += parseInt(c);
    }
  })
  return totals;
}

const getMaxCalories = (totals: number[]) => {
  return Math.max(...totals)
}

const getTop3 = (totals: number[]) => {
  totals.sort((a, b) => a - b).reverse()

  const top3 = totals[0] + totals[1] + totals[2]

  return top3;
}

const data = syncReadFile('day_1/data.txt');
const totals = getTotals(data);

const maxCalories = getMaxCalories(totals);
console.log('maxCalories', maxCalories)

const top3 = getTop3(totals);
console.log('top3', top3)
