import 'css/index.css';

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  const btnPrint = document.querySelector('.btn-round--print');
  btnPrint.addEventListener('click', (event) => {
    event.preventDefault();
    window.print();
  });
});