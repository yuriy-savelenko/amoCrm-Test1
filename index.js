const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Функция для форматирования числа с добавлением ведущего нуля, если число меньше 10
function formatNumberWithLeadingZero(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

const createTimerAnimator = () => {
  let intervalId;

  return (seconds) => {
    // Очищаем предыдущий интервал (если такой есть)
    clearInterval(intervalId);

    let remainingSeconds = seconds;

    // Функция для обновления времени в элементе таймера
    const updateTimerElement = () => {
      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const secs = remainingSeconds % 60;

      const formattedHours = formatNumberWithLeadingZero(hours);
      const formattedMinutes = formatNumberWithLeadingZero(minutes);
      const formattedSeconds = formatNumberWithLeadingZero(secs);

      timerEl.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    // Обновляем таймер сразу при запуске анимации
    updateTimerElement();

    // Запускаем интервал для обновления таймера каждую секунду
    intervalId = setInterval(() => {
      remainingSeconds--;

      // Если время закончилось, останавливаем анимацию
      if (remainingSeconds <= 0) {
        clearInterval(intervalId);
        timerEl.textContent = 'hh:mm:ss'
      } else {
        updateTimerElement();
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очищаем input от всего, кроме цифр
  inputEl.value = inputEl.value.replace(/\D/g, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});