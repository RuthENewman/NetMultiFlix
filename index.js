const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progressBar');
const toggleButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.playerSlider');

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

video.addEventListener('click', playAndPause)
toggleButton.addEventListener('click', playAndPause)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', updateProgress)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', updateRange))
ranges.forEach(range => range.addEventListener('mousemove', updateRange))


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
