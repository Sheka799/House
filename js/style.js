const price = document.querySelector('.price'),
 link = document.querySelectorAll('.price__link'),
 cards = document.querySelectorAll('.cards');

 const toggleTabContent = (index) => {
   for(let i = 0; i < cards.length; i++) {
     if(index === i) {
       link[i].classList.add('active__link');
       cards[i].classList.remove('d-none');
     } else {
       link[i].classList.remove('active__link');
       cards[i].classList.add('d-none');
     }
   }
 };

 price.addEventListener('click', (event) => {
   let target = event.target;
   target = target.closest('.price__link');  
   if (target) {
     link.forEach((item, i) => {
       if(item === target) {
         toggleTabContent(i);
       }
     });
   }  
 });

