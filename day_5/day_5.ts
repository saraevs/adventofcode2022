import {readFileSync, promises as fsPromises} from "fs";

function syncReadFile(filename: any) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);
  const arr2 = arr.filter(x => x !== '')
  return arr2;
}

const data = syncReadFile('day_5/data.txt');
const stacks = syncReadFile('day_5/stacks.txt').map(x =>  x.match(/.{1,4}/g)).filter(x => x !== null)
type StackType = { 1: string[], 2: string[], 3: string[], 4: string[], 5: string[] , 6: string[] , 7: string[] , 8: string[] , 9: string[]  }
const allStacks: StackType  = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: []
}

stacks.forEach(x => {
  const xlength = x ? x.length : 0
  for(let i=0; i<xlength; i++ ) {
    const stackNumber = i+1 as keyof StackType
    if (x !== null && x[i] !== '    ')
    allStacks[stackNumber].push(x[i].replace(' ',''))
  }
})

// moving crates one by one
// data.forEach(r => {
//   const arr = r.split(' ')
//   const amountToMove = parseInt(arr[1])
//   const fromStack = parseInt(arr[3]) as keyof StackType
//   const toStack = parseInt(arr[5]) as keyof StackType
//   for(let i = 0; i<amountToMove; i++) {
//     // console.log(i, fromStack, toStack, amountToMove)
//     // add crate to stack
//     allStacks[toStack].unshift(allStacks[fromStack][0])
//     // remove crate from stack
//     allStacks[fromStack].shift()
//   }
// })

// print out the first element of each array
// console.log("Part 1 answer:")
// for(let i=1; i<10; i++){
//   console.log(allStacks[i as keyof StackType][0])
// }

// Part 2
// moving crates all in one go
data.forEach(r => {
  const arr = r.split(' ')
  const amountToMove = parseInt(arr[1])
  const fromStack = parseInt(arr[3]) as keyof StackType
  const toStack = parseInt(arr[5]) as keyof StackType
  // console.log(allStacks)
  // console.log("instruction", arr, fromStack)
  const cratesToMove = allStacks[fromStack].slice(0, amountToMove)
  // add crates to stack
  allStacks[toStack] = cratesToMove.concat(allStacks[toStack])
  for(let i=0; i<amountToMove; i++) {
    allStacks[fromStack].shift()
  }
})

// print out the first element of each array
for(let i=1; i<10; i++){
  console.log(i, allStacks[i as keyof StackType][0])
}
