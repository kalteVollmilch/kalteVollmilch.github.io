const buttons = [
    {
        heading: "Suggestions",
        buttons: [
            {
                caption: "Content Suggestions",
                text: "Please make all content suggestions to https://forums.dovetailgames.com/forums/suggestions.75/"
            },
            {
                caption: "Angry Content Suggestions",
                text: "Are you ? Will you ? Can you ? Have you thought of ? Put all your suggestions on the forums and give details why you think it should be made and what you feel is so special about it.",
            },
            {
                caption: "PLEASE LISTEN",
                text: "OK FOLKS PLEASE LISTEN !! We love all the content suggestions, BUT they'll all get lost from chat, you really need to put them all on the forums, this something you need to do, we can't log them all."
            }
        ]
    },
    {
        heading: "Support",
        buttons: [
            {
                caption: "Support Link",
                text: "Are you experiencing issues with a DTG product? File a support ticket at Support desk ===> https://dovetailgames.freshdesk.com/support/home"
            }
        ]
    },
    {
        heading: "TS Stream",
        buttons: [
            {
                caption: "This is a TS 2021 Stream",
                text: "Please note: This is a TS2021 stream. The streamer will not be answering questions regarding TSW2 content"
            },
            {
                caption: "This is a TS 2022 Stream",
                text: "Please note: This is a TS2022 stream. The streamer will not be answering questions regarding TSW2 content"
            },
            {
                caption: "TS 2022 Announcement",
                text: "https://forums.dovetailgames.com/threads/announcing-train-simulator-2022.44829/"
            }
        ]
    },
    {
        heading: "Roadmap",
        buttons: [
            {
                caption: "Roadmap Link",
                text: "https://live.dovetailgames.com/live/train-sim-world/articles/article/tsw2-roadmap-8-february-2022"
            }
        ]
    },
    {
        heading: "Festival of Rail",
        buttons: [
            {
                caption: "Schedule Link",
                text: "https://live.dovetailgames.com/live/train-sim-world/articles/article/festival-of-rail-announced-tsw"
            }
        ]
    },
    {
        heading: "Steam",
        buttons: [
            {
                caption: "no !drop",
                text: "writing \"!drop\" doesn't do anything, you get emotes by simply watching the stream"
            },
            {
                caption: "No points",
                text: "Watching this stream will not give you any points, only emotes"
            },
            {
                caption: "repeating !drop gets you a timeout",
                text: "Please note: Writing \"!drop\" will get you timeouted for 12hrs"
            }
        ]
    }

]

window.onload = function() {
    let buttonsDiv = document.getElementById("buttons-div");
    if (!buttonsDiv) {
        return;
    }

    let buttonTemplate = document.createElement("button");
    buttonTemplate.classList.add("copyToClipboardButton");
    buttonTemplate.classList.add("btn");
    buttonTemplate.classList.add("btn-outline-dark");
    buttonTemplate.classList.add("m-1");
    buttonTemplate.type = "button";
    buttonTemplate.dataset.content = "";

    buttons.forEach(function(buttonGroup){
        let groupHeadingValue = buttonGroup.heading;
        let groupButtons = buttonGroup.buttons;

        let groupDiv = document.createElement("div");
        let groupHeadingELement = document.createElement("h2");
        groupHeadingELement.innerText = groupHeadingValue;
        groupDiv.appendChild(groupHeadingELement);

        groupButtons.forEach(function(button) {
            let buttonVerboseContent = button.caption;
            let buttonHiddenContent = button.text;
            let buttonToAppend = buttonTemplate.cloneNode();
            buttonToAppend.dataset.content = buttonHiddenContent;
            buttonToAppend.textContent = buttonVerboseContent;
            buttonToAppend.title = buttonHiddenContent;
            groupDiv.appendChild(buttonToAppend);
        })

        buttonsDiv.appendChild(groupDiv);
    });

    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    
    addButtonEventListeners(toastList);
}

function addButtonEventListeners(toastList) {

    let successToast = toastList[0];
    let errorToast = toastList[1];

    document.querySelectorAll(".copyToClipboardButton").forEach(function(button) {
        button.addEventListener("click", function(event) {
            let textarea = document.getElementById("lastCopiedText");
            navigator.clipboard.writeText(button.dataset.content)
            .then(
                function() {
                    successToast.show();
                    textarea.textContent = button.dataset.content;
                },
                function(){
                    errorToast.show();
                    textarea.textContent = "-- ERROR COPYING TEXT --";
            });
        });

        button.addEventListener("mouseover", function(event) {
            let textarea = document.getElementById("textToCopyPreview");
            textarea.textContent = button.dataset.content;
        });

        button.addEventListener("mouseleave", function(event) {
            let textarea = document.getElementById("textToCopyPreview");
            textarea.textContent = '';
        });
    });
}