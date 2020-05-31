// Enables tooltips everywhere
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// ############################################################################

const progressBar = document.querySelector('.progress-bar')
const progressButtons = document.querySelectorAll('.task')
const errorMessage = document.querySelector('.alert-danger')

// ############################################################################

const animate = () => {
  let progress = parseInt(localStorage.getItem('progress'))

  // Intialize the localStorage
  if(!progress){
    progress = 5
    localStorage.setItem('progress', progress)
  }

  // Initialize the progress bar
  const cls = ['bg-danger', 'bg-warning']
  progressBar.classList.remove(...cls)

  // Change its properties and content given what's stored in the LS
  progressBar.style.width = `${progress}%`
  progressBar.innerText = `${progress}%`

  // Change the colors for 3 different levels (#TO DO : add more levels)
  if(progress < 50){
    progressBar.classList.add('bg-danger')
  }else if(progress >= 50 && progress < 100){
    progressBar.classList.add('bg-warning')
  }else if(progress === 100){
    progressBar.classList.remove('progress-bar-striped')
    progressBar.classList.add('bg-success')
  }
}

// ############################################################################

const displayErrorMessage = (taskToDo) => {
  errorMessage.innerText = ` ⚠️ Tu dois encore completer l'Etape ${taskToDo} !`
  errorMessage.classList.add('display')
  setTimeout( () => { errorMessage.classList.remove('display') } ,5000 )
}

// ############################################################################

const progressCompute = (currentIndex) => {
  const totalTasks = progressButtons.length
  const currentProgress = (currentIndex / totalTasks) * 100

  // Store the value in the LS, only if it's the first time the user completes this
  // task.
  if(currentProgress > parseInt(localStorage.getItem('progress'))){
    localStorage.setItem('progress', currentProgress)
  }
}

// ############################################################################

const progressBarAnimation = (e) => {
  // Display the task at the (as) top (as possible) of the page
  // TO DO : Enhance this 👎
  e.currentTarget.parentElement.parentElement.scrollIntoView(false)

  const tasksArray = [...progressButtons]
  const currentTask = tasksArray.indexOf(e.currentTarget) + 1
  // console.log('current task index :', currentTask)

  const lastTaskDone = Math.round(localStorage.getItem('progress') * tasksArray.length / 100)
  const taskToDo = lastTaskDone + 1

  if(taskToDo < currentTask){
    displayErrorMessage(taskToDo)
  }else{
    e.currentTarget.classList.add('done')
    progressCompute(currentTask)
    animate()
  }
}

// ############################################################################

// Every time a user clicks on a task, animate the progress bar
progressButtons.forEach( button => {
  button.addEventListener('click', progressBarAnimation)
})

// ############################################################################

// Initialize the Game
animate()

// ############################################################################

// Enable solution button after the click on link
// const solutionButton = document.querySelector('.solution-button')
// const taskNine = document.querySelector('#task-nine')

// const enableSolution = () => {
//   setTimeout( () => {
//     solutionButton.disabled = false
//     solutionButton.nextElementSibling.remove()
//   }, 120000 )

//   // Clear localStorage 1h after this action
//   setTimeout( () => {
//     localStorage.clear()
//   }, 3600000 )
// }

// taskNine.addEventListener('click', enableSolution)

// ############################################################################

// Fonction quiz (REFACTOR!)

const quizForm = document.getElementById('fonction-quiz');

const listFunctions = ['preload()', 'loadImage()', 'setup()', 'createCanvas()', 'background()', 'resize()', 'draw()', 'image()', 'noStroke()', 'color()', 'drawBubble()', 'fill()', 'ellipse()', 'textStyle()', 'textSize()', 'text()'];

const correctFonctionQuiz = (event) => {
  const answerInputs = quizForm.querySelectorAll("input");
  const uniqueInputs = [];

  answerInputs.forEach((input) => {
    const answer = input.value;
    if (listFunctions.includes(answer)) {
      if (!uniqueInputs.includes(answer)) {
        uniqueInputs.push(answer);
      } else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
      }
      input.classList.add('is-valid');
      input.classList.remove('is-invalid');
    } else {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
    }
  })

  event.preventDefault();
}


const submitButton = document.getElementById('fonction-quiz-submit');

submitButton.addEventListener('click', correctFonctionQuiz);
