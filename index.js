const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progressBar');
const toggleButton = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.playerSlider');
const fullScreenButton = document.querySelector('.viewFullScreenButton');

function initialize() {

}

function playAndPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();

  }
}

function updateButton() {
  const iconButton = this.paused ? '►' : '❚ ❚';
  toggleButton.textContent = iconButton;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}

function updateRange() {
  video[this.name] = this.value;
}

function updateProgress() {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function openFullScreen() {
  if (video.requestFullScreen) {
    video.requestFullScreen();
  } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
      } else if (video.msRequestFullScreen) {
        video.msRequestFullScreen();
      }

  }


video.addEventListener('click', playAndPause)
toggleButton.addEventListener('click', playAndPause)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', updateProgress)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', updateRange))
ranges.forEach(range => range.addEventListener('mousemove', updateRange))
fullScreenButton.addEventListener('click', openFullScreen)

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
