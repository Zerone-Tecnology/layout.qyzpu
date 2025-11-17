var win = $(this);
if (win.width() <= 768) {
  const svg = document.getElementById("main_map");

  let zoomScale = 1.1;
  let svgX, svgY;
  let svgWidth; // assuming viewBox is square for now so svgWidth serves as svgHeight
  let origSvgX, origSvgY, origSvgWidth;

  let svgPanStartX, svgPanStartY;
  let panning = false;

  getViewBox(true);
  setViewBox();

  svg.onmousedown = function (e) {
    [svgPanStartX, svgPanStartY] = screenToSvgCoords(e.pageX, e.pageY);
    panning = true;
  };

  function pan(e) {
    const [svgPanEndX, svgPanEndY] = screenToSvgCoords(e.pageX, e.pageY);
    svgX += svgPanStartX - svgPanEndX;
    svgY += svgPanStartY - svgPanEndY;
    setViewBox();
  }

  window.onmouseup = function (e) {
    if (panning) {
      panning = false;
      pan(e);
    }
  };

  window.onmousemove = function (e) {
    if (panning) {
      pan(e);
    }
  };

  window.onwheel = function (e) {
    let scaleFactor = 1;
    if (e.deltaY < 0) {
      scaleFactor = 1 / zoomScale;
    } else if (e.deltaY > 0) {
      scaleFactor = zoomScale;
    }

    let oldWidth = svgWidth;
    svgWidth *= scaleFactor;
    svgX += (oldWidth - svgWidth) / 2;
    svgY += (oldWidth - svgWidth) / 2;
    if (panning) {
      pan(e);
    } else {
      setViewBox();
    }
  };

  svg.ondblclick = function (e) {
    svgX = origSvgX;
    svgY = origSvgY;
    svgWidth = origSvgWidth;
    setViewBox();
  };

  function screenToSvgCoords(screenX, screenY) {
    function convert(screenCoord, screenOffset, screenSize, svgCoord, svgSize) {
      return (svgSize / screenSize) * (screenCoord - screenOffset) + svgCoord;
    }
    const rect = svg.getBoundingClientRect();
    const x = convert(screenX, rect.x, rect.width, svgX, svgWidth);
    const y = convert(screenY, rect.y, rect.height, svgY, svgWidth);
    return [x, y];
  }

  function getViewBox(first = false) {
    let viewBox = svg.getAttribute("viewBox").split(" ");
    svgX = parseFloat(viewBox[0]);
    svgY = parseFloat(viewBox[1]);
    svgWidth = parseFloat(viewBox[2]);

    if (first) {
      origSvgX = svgX;
      origSvgY = svgY;
      origSvgWidth = svgWidth;
    }
  }

  function setViewBox() {
    let viewBox = [svgX, svgY, svgWidth, svgWidth].join(" ");
    svg.setAttribute("viewBox", viewBox);
  }

}

$('.showFilter').on('click', function(){
  $('.left-wrap').toggleClass('show');
});

$('.category-ul li').on('click', function(){
  $('.category-ul li').removeClass('active');
  $(this).toggleClass('active');
});


$('.category-ul .title').hover(function(){
  data = $(this).attr('data-class');
  var arRooms = document.querySelectorAll(".rooms ." + data);
  arRooms.forEach(function(el) {
    el.classList.add("on");
  });
}, function(){
  data = $(this).attr('data-class');
  var arRooms = document.querySelectorAll(".rooms ." + data);
  arRooms.forEach(function(el) {
    el.classList.remove("on");
  });
})

if (screen.width <= 768) {
  $('#guk').on('click', function(){
    $('.guk-wrap').addClass('show');
    // $('.guk-wrap #f1').addClass('show');
    // $('.left-wrap').addClass('show');
    $('.map-wrap').removeClass('show');
    $('.btn-back').addClass('show');
    $('.guk-ul').addClass('show');
  })
} else {

  $('#guk').on('click', function(){
    $('.guk-wrap').addClass('show');
    // $('.guk-wrap #f1').addClass('show');
    $('.left-wrap').addClass('show');
    $('.map-wrap').removeClass('show');
    $('.btn-back').addClass('show');
    $('.guk-ul').addClass('show');
  })
}

$('#uk-1').on('click', function(){
  $('.uk-1-wrap').addClass('show');
  // $('.guk-wrap #f1-1').addClass('show');
  $('.left-wrap').addClass('show');
  $('.map-wrap').removeClass('show');
  $('.btn-back').addClass('show');
  $('.uk-1-ul').addClass('show');
})

$('.btn-back').on('click', function(){
  $('.guk-wrap').removeClass('show');
  $('.uk-1-wrap').removeClass('show');
  $('.map-wrap').addClass('show');
  $('.btn-back').removeClass('show');
  $('.left-wrap').removeClass('show');
  $('.guk-ul').removeClass('show');
  $('.uk-1-ul').removeClass('show');
})

$('.rooms rect').on("click", function(e) {
  var id = $(this).attr('id');
  $('.popup').addClass('show');

  var offsets = $(this).offset();
  var top = offsets.top;
  var left = offsets.left;

  console.log(left);

  if (win.width() > 768){
    $('.popup').css('top', top);
    $('.popup').css('left', left);
  }
  $('#popup .title .num').text(id);
  $('#popup .content').text(id);

  $(this).addClass('on');

});

$('.popup .close').on("click", function() {
  $('.popup').removeClass('show');
  $('#popup .content').clear();
});

document.addEventListener(
  "click",
  function(event) {
    if(event.target.matches(".rooms rect")){
      $('.popup').addClass('show');
    }
    else if (event.target.matches(".popup .close") || !event.target.closest(".popup")) {
      $('.popup').removeClass('show');
    }
  },
  false
)

$('.floor-ul li').on('click', function(){
  var floorId = $(this).attr('data-floor');
  var floorUl = $(this).parent().attr('data-ul');
  $('.floor-wrap').removeClass('show');
  $('#' + floorId).addClass('show');
  $('.' + floorUl + ' li').removeClass('active');
  $(this).addClass('active');
})

var wordStates = document.querySelectorAll(".list-ul li");
var svgStates = document.querySelectorAll(".rooms rect");

function removeAllOn() {
  wordStates.forEach(function(el) {
    el.classList.remove("on");
  });
  svgStates.forEach(function(el) {
    el.classList.remove("on");
  });
}

function addOnFromState(el) {
  var stateCode = el.getAttribute("data-room");
  var svgState = document.querySelector("#" + stateCode);
  el.classList.add("on");
  svgState.classList.add("on");
}

function addOnFromList(el) {
  var stateId = el.getAttribute("id");
  var wordState = document.querySelector("[data-room='" + stateId + "']");
  el.classList.add("on");
  wordState.classList.add("on");
}

wordStates.forEach(function(el) {
  el.addEventListener("mouseenter", function() {
    addOnFromState(el);
  });
  el.addEventListener("mouseleave", function() {
    removeAllOn();
  });
});

svgStates.forEach(function(el) {
  el.addEventListener("mouseenter", function() {
    addOnFromList(el);
  });
  el.addEventListener("mouseleave", function() {
    removeAllOn();
  });
});

