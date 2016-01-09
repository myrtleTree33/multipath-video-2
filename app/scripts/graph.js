/**
 * Stores the directed acyclic graph used.
 */

var graph = {
    "a": {
    "videoId": "LdH1hSWGFGU",
    "goto": [{
      "id": "b",
      "caption": "Kick the ball"
    }, {
      "id": "c",
      "caption": "Move the ball"
    }]
  },
  "b": {
    "videoId": "9xA6MxVeTG8",
    "goto": [{
      "id": "d",
      "caption": "Throw the ball"
    }]
  },
  "c": {
    "videoId": "uKQFLOPAYEs",
    "goto": [{
      "id": "d",
      "caption": "Lift the ball"
    }]
  },
  "d": {
    "videoId": "LaIljUoq2mc",
    "goto": []
  }
};
