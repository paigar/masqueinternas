const accordion1 = document.getElementsByClassName('containerAcordeon');

for (i=0; i<accordion1.length; i++) {
  accordion1[i].addEventListener('click', function () {
    this.classList.toggle('activeAcordeon')
  })
}