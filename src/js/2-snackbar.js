import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/snackbar.css';

const submitForm = document.querySelector('.form');
submitForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const {
    elements: { delay, state },
  } = e.currentTarget;

  const stepDelay = Number(delay.value);
  const stateValue = state.value;

  if (stepDelay < 0) {
    onError(`❗ Please enter a positive number`);
  } else {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        Promise.resolve(stepDelay)
          .then(delay => onSuccess(`✅ Fulfilled promise in ${delay}ms`))
          .catch();
      } else {
        Promise.reject(stepDelay)
          .then()
          .catch(delay => onError(`❌ Rejected promise in ${delay}ms`));
      }
    }, stepDelay);
  }

  submitForm.reset();
}

function onSuccess(message) {
  iziToast.success({
    title: 'Success',
    message: `${message}`,
    position: 'topRight',
  });
}

function onError(message) {
  iziToast.error({
    title: 'Error',
    message: `${message}`,
    position: 'topRight',
  });
}
