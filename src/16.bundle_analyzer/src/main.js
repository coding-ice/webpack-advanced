import './style.css'
import sub from './utils/sub'
import sum from './utils/sum'
import dayjs from 'dayjs'

function swap(arr, a, b) {
  const temp = arr[a]

  arr[a] = arr[b]
  arr[b] = temp

  return arr
}

console.log(swap([10, 20, 30], 0, 1))
console.log(swap([10, 30, 20], 0, 1))

console.log(sub(10, 5))
console.log(sum(10, 5))
console.log(dayjs().format("YYYY-MM-DD"))
