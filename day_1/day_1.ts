import {readFileSync, promises as fsPromises} from "fs";

function syncReadFile(filename: any) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  // console.log(arr);

  const totals: number[] = []
  let currentTotal = 0;

  arr.map(c => {
    // console.log('c', c, parseInt(c))
    if (c === '') {
      totals.push(currentTotal)
      currentTotal = 0;
    } else {
      currentTotal += parseInt(c);
    }
  })

  const maxCalories = Math.max(...totals)

  console.log('totals', totals)
  console.log('maxCalories', maxCalories)

  return maxCalories;
}

syncReadFile('day_1/data.txt');
