document.addEventListener("DOMContentLoaded", function() {
    let nav = document.getElementById('top-sub-nav');
    window.addEventListener('scroll', () => {
        
        let y = window.scrollY;
        console.log(y)
        if (y <= 16){
            nav.style.marginTop = '0px';
            nav.classList.remove('scroll');
            nav.style.top = '44px';

        }else{
            nav.style.marginTop = '0px';
            nav.classList.add('scroll');
            nav.style.top = '0px';
        }
    });
  });
  