/**
 * @author me <at> joeltong <dot> org
 */

console.log('\'Allo \'Allo!');

screen.orientation.lock('landscape');

// Directed graph showing progression
// of video paths

var graph = graph || {};


// current node reference
// A string of nodes forms a path
var currNode = graph.a;


// Creation of Youtube video instance

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    //videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// Events ------------------------------

function onPlayerReady(event) {
  loadVideo(event.target, currNode.videoId);
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    console.log('Video ended!');
    fullscreenDisable();
    // alert('video ended!');
  } else {
    console.log(event.data)
  }
}

// End events --------------------------

function loadVideo(target, videoId) {
  fullscreenEnable();
  target.loadVideoById({
    'videoId': videoId,
    'startSeconds': 580, // TODO Change this to 0
    'suggestedQuality': 'large'
  });
};

function fullscreenEnable() {
  $('.video-container').removeClass('invisible');
  $('.prompt-container').addClass('invisible');
}

function fullscreenDisable() {
  $('.video-container').addClass('invisible');
  $('.prompt-container').removeClass('invisible');

  var parent = $('.prompts');
  parent.empty();

  // check if destination is reached
  if (currNode.goto.length === 0) {
    // alert('path complete!');
    onPathComplete();
    return;
  }

  $.each(currNode.goto, function(i, val) {
    var childContainer = $(document.createElement('div'));
    var child = $(document.createElement('a'));
    child
      .text(val.caption)
      .attr('name', val.id)
      .addClass('btn btn-block btn-success')
    child.click(function(e) {
      var id = e.target.name;
      currNode = graph[id];
      console.log(currNode);
      loadVideo(player, currNode.videoId);
    });

    childContainer
      .addClass('prompt row')
      .append(child);
    parent.append(childContainer);
  });
}


function onPathComplete() {
  $('.done-container').removeClass('invisible');
  $('.prompt-container').addClass('invisible');
}

/*
function stopVideo() {
  player.stopVideo();
}
*/
