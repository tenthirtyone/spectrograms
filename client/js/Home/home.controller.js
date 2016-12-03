(function () {
  'use strict';

  angular.module('App.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['HomeService', '$scope', 'routerHelper'];

  function HomeController(HomeService, $scope, routerHelper) {
    var vm = this;
    var draws = 0;
    var xPosition = 0;
    var canvasOut = document.getElementById('Spectrum');
    var ctxOut = canvasOut.getContext('2d');
    vm.drawStyles = [
      'DarkVibrant',
      'DarkMuted',
      'Vibrant',
      'Muted',
      'LightVibrant',
      'LightMuted'
    ];
    vm.drawStyle = 'Vibrant';
    vm.changeStyle = changeStyle;
    vm.drawRate = 30;
    vm.clearCanvas = clearCanvas;

    init();

    function init() {
      console.log('init');

      var video = document.getElementById('VideoPlayer');
      var canvas = document.getElementById('CanvasPlayer');
      var context = canvas.getContext('2d');

      var cw = Math.floor(canvas.clientWidth);
      var ch = Math.floor(canvas.clientHeight);
      canvas.width = cw;
      canvas.height = ch;

      video.addEventListener('play', function(){
        console.log('play');
          draw(this,context,cw,ch);
      },false);

      video.addEventListener('loadedmetadata', function() {
        console.log(video.duration);
      });

    }

    function draw(video,ctx,w,h) {
        if(video.paused || video.ended) return false;
        ctx.drawImage(video,0,0,w,h);
        //console.log(c.canvas.toDataURL("image/jpeg"));

        //document.body.style.backgroundColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
        updateSpectrum(draws, ctx)

        draws++;
        setTimeout(draw,20,video,ctx,w,h);
    }

    function updateSpectrum(draws, ctx) {
      if (draws % vm.drawRate === 0) {
        var img = document.createElement("IMG");
        img.setAttribute('src', ctx.canvas.toDataURL("image/jpeg"))
        img.addEventListener('load', function() {
          var vibrant = new Vibrant(img);
          vibrant.getPalette((err, palette) => {
            var rgb = palette[vm.drawStyle].rgb;
            console.log(vm.drawStyle);
            ctxOut.beginPath();
            ctxOut.moveTo(xPosition,0);
            ctxOut.lineTo(xPosition,200);
            ctxOut.lineWidth = 1;
            ctxOut.strokeStyle = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
            ctxOut.stroke();
            xPosition++;
          })
      });
      }
    }

    function clearCanvas() {
      ctxOut.clearRect(0, 0, canvasOut.width, canvasOut.height);
      draws = 0;
      xPosition = 0;
    }

    function changeStyle(style) {
      console.log('style')
      console.log(style)
      vm.drawStyle = style;
    }




    return vm;
  }
}());
