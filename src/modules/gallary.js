
const gallary = () => {
 
  const gallaryModal = document.querySelector('.modal-gallary'),
   big = document.querySelector('#overlay-big');
  
  const link = document.querySelectorAll('.portfolio-slide img');
   for (let i=0; i < link.length; i++) {
    link[i].classList.add('link');
   }

  document.addEventListener('click', (event) => {
    let target = event.target;

    if (target.classList.contains('link')) {
      gallaryModal.style.display = 'block';
      big.src = target.dataset.image;
    } else if (target.classList.contains('close_icon')) {
      gallaryModal.style.display = 'none';
    } else if (target.classList.contains('modal-gallary')) {
      gallaryModal.style.display = 'none';
    }
  });
};

export default gallary;