const buttons = [
    {
        heading: "Roadmap links - TSW3",
        buttons: [
            {
                caption: "Part 1",
                text: "https://live.dovetailgames.com/live/train-sim-world/articles/article/tsw-roadmap-10-08-22",
            },
            {
                caption: "Part 2",
                text: "https://live.dovetailgames.com/live/train-sim-world/articles/article/tsw-roadmap-part-2-10-08",
            },
        ]
    },
    {
        heading: "Support / Tech Support",
        buttons: [
            {
                caption: "Link + some text",
                text: "Are you experiencing issues with a DTG product? File a support ticket at Support desk ===> https://dovetailgames.freshdesk.com/support/home"
            },
            {
                caption: "Link",
                text: "https://dovetailgames.freshdesk.com/support/home"
            }
        ]
    },
    {
        heading: "TSW Suggestions",
        buttons: [
            {
                caption: "Content Suggestions - LINK",
                text: "https://forums.dovetailgames.com/forums/suggestions.75/"
            },
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
        heading: "TS Stream",
        buttons: [
            {
                caption: "This is a TS 2022 Stream",
                text: "Please note: This is a TS2022 stream. The streamer will not be answering questions regarding TSW2 content"
            },
            {
                caption: "TS Classic Announcement",
                text: "https://live.dovetailgames.com/live/train-simulator/articles/article/ts-classic-out-now"
            }
        ]
    },
    {
        heading: "Creators Club",
        buttons: [
            {
                caption: "Introduction Article",
                text: "https://live.dovetailgames.com/live/train-sim-world/articles/article/start-creating-with-tsw-2",
            },
            {
                caption: "Startpage",
                text: "https://creatorsclub.dovetailgames.com/"
            }
        ]
    },
    {
        heading: "General Stuff",
        buttons: [
            {
                caption: "No Caps",
                text: "Please don't use all caps"
            }
        ]
    },
    {
        heading: "Steam",
        buttons: [
            {
                caption: "!drop is spam",
                text: "Please note: \"!drop\" is considered spam and will be deleted"
            },
            {
                caption: "todays drops are backgrounds",
                text: "Todays drops are 3 static backgrounds and they will drop after 10 minutes"
            },
            {
                caption: "todays drops are emojis",
                text: "Todays drops are 3 emojis and they will drop after 10 minutes"
            },
            {
                caption: "keep chat in english",
                text: "Please keep the chat in english, thank you"
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

function join(t, a, s) {
    function format(m) {
       let f = new Intl.DateTimeFormat('en', m);
       return f.format(t);
    }
    return a.map(format).join(s);
 }

function getWeekNumber(date) {
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
    var weekNo = Math.ceil((((date - yearStart) / 86400000) + 1)/7);
    return [date.getUTCFullYear(), weekNo];
}

function getPreviousRoadmapDate() {
    let currentDate = new Date(new Date().setDate(new Date().getDate() - 28));
    return getLastRoadmapDate(currentDate);
}

function getNextRoadmapDate() {
    let currentDate = new Date(new Date().setDate(new Date().getDate() + 28));
    return getLastRoadmapDate(currentDate);
}

function getCurrentRoadmapDate() {
    let currentDate = new Date();
    return getLastRoadmapDate(currentDate);
}

function getLastRoadmapDate(date) {
    let currentDay = date.getDay();
    let currentWeekNumber = getWeekNumber(date)[1];

    // get last weeknumber which is a multiple of (1 + 4x) -> 1, 7, 11, 15..
    let weekOfInterval = (currentWeekNumber + 1 ) % 4;
    date.setDate(date.getDate() - (weekOfInterval * 7));

    // weeknumber of last thursday
    if (currentDay === 1) {
        date.setDate(date.getDate() - 27);
    }
    else if (currentDay > 2) {
        date.setDate(date.getDate() - (currentDay - 2));
    }

    let dateOptions = [{day: 'numeric'}, {month: 'long'}, {year: 'numeric'}];
    return `https://live.dovetailgames.com/live/train-sim-world/articles/article/tsw2-roadmap-${join(date, dateOptions, '-').toLowerCase()}`;
}