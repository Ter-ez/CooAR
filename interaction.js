AFRAME.registerComponent('accepts-clicks', {
init: function() {
this.el.addEventListener('touchend', handleMarkerEvent);
this.el.addEventListener('markerFound', handleMarkerEvent);
},
tick: function() {
hideSpeechBubbleIfNoMarker();
}
});

function toggleSpeechBubble(dialogue) {

    var speechBubble = document.querySelector(".speech-bubble");
    if (speechBubble.style.display === 'none' || !speechBubble.style.display) {
        speechBubble.innerHTML = dialogue;
        speechBubble.style.display = 'block';
    } else {
        speechBubble.style.display = 'none';
    }
};

function toggleNotification() {
    var speechBubble = document.querySelector(".notification");
    if (speechBubble.style.display === 'none' || !speechBubble.style.display) {
        speechBubble.style.display = 'block';
    } else {
        speechBubble.style.display = 'none';
    }
}

function hideSpeechBubbleIfNoMarker() {
    var speechBubble = document.querySelector(".speech-bubble");
    var notification =  document.querySelector(".notification");

    if (speechBubble.style.display === 'none' || !speechBubble.style.display) return;

    var shouldHide = true;
    citizens.forEach(function(citizen) {
        var citizenMarker = document.querySelector("#" + citizen.name + "-marker");
        if (citizenMarker && citizenMarker.object3D.visible) shouldHide = false;
    });

    lostitems.forEach(function(lostitem) {
        var lostitemMarker = document.querySelector("#" + lostitem.name + "-marker");
        if (lostitemMarker && lostitemMarker.object3D.visible) shouldHide = false;
    });


    if (shouldHide) {
        speechBubble.style.display = 'none';
        if (notification.style.display === 'block') {
            notification.style.display = 'none';
        }
    }
};

function handleMarkerEvent() {
    citizens.forEach(function(citizen) {
        var citizenMarker = document.querySelector("#" + citizen.name + "-marker");
        if (citizenMarker && citizenMarker.object3D.visible) {
            if (searchForBuilderTool(citizen)) {
                toggleSpeechBubble(citizen.successDialogue);
                    updateProgress();
                    toggleNotification();
                closeNotification = true;
            } else {
                toggleSpeechBubble(citizen.dialogue);
            }
        }
    });

    lostitems.forEach(function(lostitem) {
        var lostitemMarker = document.querySelector("#" + lostitem.name + "-marker");
        if (lostitemMarker && lostitemMarker.object3D.visible) {
            toggleSpeechBubble(lostitem.dialogue);
            if (!userState.hasBuilderTool(lostitem)) userState.addTool(lostitem);
        }
    });
}

function searchForBuilderTool(citizen) {
    return userState.lostitems.some(function(lostitem) {
        return lostitem.name === citizen.lostitem.name;
    });
};