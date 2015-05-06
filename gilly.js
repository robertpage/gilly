gilly = (function ( ) {
  var coverNode;
  var imageNode;

  return {
    show:show,
    stopShow:stopShow,
    removeAll:removeAll
  };

  function show ( imageArray, videoArray ) {
    coverNode = document.createElement( 'div' ); 
    coverNode.classList.add( 'click-catcher' );

    coverNode.addEventListener( 'click', stopShow, false );

    document.body.appendChild(coverNode);

    if ( imageArray !== undefined && imageArray.length !== 0 ) {
      for (var i = 0; i < imageArray.length; i++) {
        imageNode = document.createElement( 'img' ); 
        imageNode.src = imageArray[i];
        imageNode.classList.add( 'click-catcher-media-wrapper' );

        coverNode.appendChild(imageNode);
      }
    }

    if ( videoArray !== undefined && videoArray.length !== 0 ) {
      for (var i = 0; i < videoArray.length; i++) { 
        iframeNode = document.createElement( 'iframe' ); 
        iframeNode.src = videoArray[i];
        iframeNode.classList.add( 'click-catcher-media-wrapper' );
        iframeNode.style.height = 480+"px"; 
        iframeNode.setAttribute('frameborder', '0')
        iframeNode.setAttribute('allowFullScreen', '')

        coverNode.appendChild( iframeNode );
      }
 
    }


    fade( coverNode, true, 0.1, 0, 1 );

  }

  function stopShow ( ) {
    fade( coverNode, false, 0.1, 1, 0, removeAll );

  }

  function removeAll ( ) {
    document.body.removeChild(coverNode);
  }


  function fade ( node, fadeIn, rate, initial, end, callback ) {
    var start = null;

    function step(timestamp) {
      if ( !start ) start = timestamp;
      var progress = timestamp - start;
      coverNode.style.opacity = initial;

      if ( fadeIn === true ) {
        setIn( );
      } else {
        setOut( );
      }
    }

    window.requestAnimationFrame(step);

    function setIn ( ) {
      if ( initial < end ) {
        window.requestAnimationFrame(step);
        initial = initial + rate;
      } else {
        if ( callback !== undefined ) {
          callback( );
        }
      }
    }

    function setOut ( ) {
      if ( initial > end ) {
        window.requestAnimationFrame(step);
        initial = initial - rate;
      } else {
        if ( callback !== undefined ) {
          callback( );
        }
      }
    }

  }

})( );