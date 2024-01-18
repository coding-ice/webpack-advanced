const btnEl1 = document.createElement('button')
const btnEl2 = document.createElement('button')

btnEl1.textContent = '加载stu'
btnEl1.addEventListener('click', () => {
  import('./stu').then((res) => {
    console.log(res)
  })
})

btnEl2.textContent = '加载tea'
btnEl2.addEventListener('click', () => {
  import('./teacher').then((res) => {
    console.log(res)
  })
})

document.body.append(btnEl1, btnEl2)
