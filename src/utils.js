export function displayDialogue(dialogueObj, onDisplayEnd) {
    const dialogueUI = document.getElementById("textbox-container");
    const dialogue = document.getElementById("dialogue");
    const speaker = document.getElementById("speaker-name");
    const closeBtn = document.getElementById("close");

    if (!Array.isArray(dialogueObj.text)) {
        console.error("dialogueObj.text harus berupa array");
        return;
    }

    let index = 0;
    let intervalRef;
    let isTyping = false; // <-- blok input saat true
    let keyPressHandler;
    let closeBtnHandler;

    dialogueUI.classList.add("visible");
    speaker.innerText = dialogueObj.name;

    function showText(text) {
        clearInterval(intervalRef);
        isTyping = true;
        let i = 0;
        dialogue.innerHTML = "";

        intervalRef = setInterval(() => {
            if (i < text.length) {
                dialogue.innerHTML += text[i];
                i++;
            } else {
                clearInterval(intervalRef);
                isTyping = false;
            }
        }, 15);
    }

    function nextDialogue() {
        if (isTyping) return; // <-- Blok input saat efek ketik

        dialogueUI.classList.remove("visible");

        setTimeout(() => {
            dialogue.innerHTML = "";

            if (index < dialogueObj.text.length) {
                showText(dialogueObj.text[index]);
                dialogueUI.classList.add("visible");
                index++;
            } else {
                clearInterval(intervalRef);
                closeBtn.removeEventListener("click", closeBtnHandler);
                removeEventListener("keypress", keyPressHandler);
                dialogueUI.classList.remove("visible");

                setTimeout(() => {
                    dialogue.innerHTML = "";
                    speaker.innerHTML = "";
                    onDisplayEnd();
                }, 200);
            }
        }, 200);
    }

    closeBtnHandler = () => {
        nextDialogue();
    };

    keyPressHandler = (e) => {
        if (e.code === "Enter") {
            closeBtn.click();
        }
    };

    // Mulai dari kalimat pertama
    showText(dialogueObj.text[index]);
    index++;

    // Register event listener
    closeBtn.addEventListener("click", closeBtnHandler);
    addEventListener("keypress", keyPressHandler);
}

export function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
        k.camScale(k.vec2(1));
    } else {
        k.camScale(k.vec2(1.5));
    }
}