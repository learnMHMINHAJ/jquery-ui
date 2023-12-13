$( document).ready(function() {
    // accordion 
    $( "#accordion" ).accordion();
    //  draggable 
    $( "#draggable" ).draggable();
      // sortable 
    $( "#s_b" ).sortable();
    // date picker 
    $( "#datepicker" ).datepicker();
    $( document ).tooltip();
    $( "#tabs" ).tabs({
      collapsible: true
    });
  } );
    $( function() {
      $( "#d_c" ).draggable();
      $( "#droppable" ).droppable({
        drop: function( event, ui ) {
          $( this )
            .addClass( "ui-state-highlight" )
            .find( "p" )
              .html( "Dropped!" );
        }
      });
    } );
    var data = [
      "Html",
      "Css",
      "jq",
      "bootstrap"
    ]
      $( "#c_name" ).autocomplete({
        source: data
      });
      $( function() {
        if ( !$( "<canvas>" )[0].getContext ) {
          $( "<div>" ).text(
            "Your browser doesn't support canvas, which is required for this demo."
          ).appendTo( "#graphs" );
          return;
        }
     
        var i = 0,
          width = 100,
          height = 100;
     
        $.each( $.easing, function( name, impl ) {
          var graph = $( "<div>" ).addClass( "graph" ).appendTo( "#graphs" ),
            text = $( "<div>" ).text( ++i + ". " + name ).appendTo( graph ),
            wrap = $( "<div>" ).appendTo( graph ).css( 'overflow', 'hidden' ),
            canvas = $( "<canvas>" ).appendTo( wrap )[ 0 ];
     
          canvas.width = width;
          canvas.height = height;
          var drawHeight = height * 0.8,
            cradius = 10,
            ctx = canvas.getContext( "2d" );
          ctx.fillStyle = "black";
     
          // Draw background
          ctx.beginPath();
          ctx.moveTo( cradius, 0 );
          ctx.quadraticCurveTo( 0, 0, 0, cradius );
          ctx.lineTo( 0, height - cradius );
          ctx.quadraticCurveTo( 0, height, cradius, height );
          ctx.lineTo( width - cradius, height );
          ctx.quadraticCurveTo( width, height, width, height - cradius );
          ctx.lineTo( width, 0 );
          ctx.lineTo( cradius, 0 );
          ctx.fill();
     
          // Draw bottom line
          ctx.strokeStyle = "#555";
          ctx.beginPath();
          ctx.moveTo( width * 0.1, drawHeight + .5 );
          ctx.lineTo( width * 0.9, drawHeight + .5 );
          ctx.stroke();
     
          // Draw top line
          ctx.strokeStyle = "#555";
          ctx.beginPath();
          ctx.moveTo( width * 0.1, drawHeight * .3 - .5 );
          ctx.lineTo( width * 0.9, drawHeight * .3 - .5 );
          ctx.stroke();
     
          // Plot easing
          ctx.strokeStyle = "white";
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.moveTo( width * 0.1, drawHeight );
          $.each( new Array( width ), function( position ) {
            var state = position / width,
              val = impl( state, position, 0, 1, width );
            ctx.lineTo( position * 0.8 + width * 0.1,
              drawHeight - drawHeight * val * 0.7 );
          });
          ctx.stroke();
     
          // Animate on click
          graph.on( "click", function() {
            wrap
              .animate( { height: "hide" }, 2000, name )
              .delay( 800 )
              .animate( { height: "show" }, 2000, name );
          });
     
          graph.width( width ).height( height + text.height() + 10 );
        });
      } );
      $( function() {
        // run the currently selected effect
        function runEffect() {
          // get effect type from
          var selectedEffect = $( "#effectTypes" ).val();
     
          // Most effect types need no options passed by default
          var options = {};
          // some effects have required parameters
          if ( selectedEffect === "scale" ) {
            options = { percent: 50 };
          } else if ( selectedEffect === "size" ) {
            options = { to: { width: 200, height: 60 } };
          }
     
          // Run the effect
          $( "#effect" ).hide( selectedEffect, options, 1000, callback );
        };
     
        // Callback function to bring a hidden box back
        function callback() {
          setTimeout(function() {
            $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
          }, 1000 );
        };
     
        // Set effect from select menu value
        $( "#button" ).on( "click", function() {
          runEffect();
        });
      } );
      // position 
      $( function() {
        function position() {
          $( ".positionable" ).position({
            of: $( "#parent" ),
            my: $( "#my_horizontal" ).val() + " " + $( "#my_vertical" ).val(),
            at: $( "#at_horizontal" ).val() + " " + $( "#at_vertical" ).val(),
            collision: $( "#collision_horizontal" ).val() + " " + $( "#collision_vertical" ).val()
          });
        }
     
        $( ".positionable" ).css( "opacity", 0.5 );
     
        $( "select, input" ).on( "click keyup change", position );
     
        $( "#parent" ).draggable({
          drag: position
        });
     
        position();
      } );
      $( function() {
        function left( element, using ) {
          element.position({
            my: "right middle",
            at: "left+25 middle",
            of: "#container",
            collision: "none",
            using: using
          });
        }
        function right( element, using ) {
          element.position({
            my: "left middle",
            at: "right-25 middle",
            of: "#container",
            collision: "none",
            using: using
          });
        }
        function center( element, using ) {
          element.position({
            my: "center middle",
            at: "center middle",
            of: "#container",
            using: using
          });
        }
     
        left( $( "img" ).eq( 0 ) );
        center( $( "img" ).eq( 1 ) );
        right( $( "img" ).eq( 2 ) );
     
        function animate( to ) {
          $( this ).stop( true, false ).animate( to );
        }
        function next( event ) {
          event.preventDefault();
          center( $( "img" ).eq( 2 ), animate );
          left( $( "img" ).eq( 1 ), animate );
          right( $( "img" ).eq( 0 ).appendTo( "#container" ) );
        }
        function previous( event ) {
          event.preventDefault();
          center( $( "img" ).eq( 0 ), animate );
          right( $( "img" ).eq( 1 ), animate );
          left( $( "img" ).eq( 2 ).prependTo( "#container" ) );
        }
        $( "#previous" ).on( "click", previous );
        $( "#next" ).on( "click", next );
     
        $( "img" ).on( "click", function( event ) {
          $( "img" ).index( this ) === 0 ? previous( event ) : next( event );
        });
     
        $( window ).on( "resize", function() {
          left( $( "img" ).eq( 0 ), animate );
          center( $( "img" ).eq( 1 ), animate );
          right( $( "img" ).eq( 2 ), animate );
        });
      } );
      // resizable 
      $( function() {
        $( "#resizable" ).resizable();
      } );