/* Swipe */ 


  var body = document.querySelector("body");
  var hammerSwipe = new Hammer(body);

  hammerSwipe.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

  hammerSwipe.on('swipe', function(e){
  if (timing == true) {
    if (e.deltaY < 0) {
      if (currentSlide<previousSlide) {
        currentSlide=currentSlide+1
      }
      else
        return
    }
    if (e.deltaY > 0) {
      if (currentSlide>0) {
        currentSlide=currentSlide-1
      }
      else
        return
    }
    $('.slider').css('transform','translateY(-' + currentSlide + '15%)')
      timing = false;
      setTimeout(function(){
        timing = true;
      }, 2000);
  }
  });