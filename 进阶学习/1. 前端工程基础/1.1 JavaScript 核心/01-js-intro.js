const studentName = '小明'
const age = 18
const currentModule = 'JavaScript 核心'

console.log(studentName)
console.log(age)
console.log(`${studentName}正在学习${currentModule}`)

const showInfoBtn = document.querySelector('#showInfoBtn')
const result = document.querySelector('#result')

showInfoBtn.addEventListener('click', function () {
  result.textContent = `${studentName}今年${age}岁，今天开始学习${currentModule}。`
})
