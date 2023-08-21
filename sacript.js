document.addEventListener("DOMContentLoaded", () => {
    const postItContainer = document.getElementById("postItContainer");
    const postItInput = document.getElementById("postItInput");
    const addPostItButton = document.getElementById("addPostItButton");

    addPostItButton.addEventListener("click", () => {
        const content = postItInput.value.trim();
        if (content) {
            createPostIt(content);
            postItInput.value = "";
        }
    });

    postItContainer.addEventListener("mousedown", (e) => {
        const postIt = e.target.closest(".postIt");
        if (postIt) {
            const offsetX = e.clientX - postIt.getBoundingClientRect().left;
            const offsetY = e.clientY - postIt.getBoundingClientRect().top;

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);

            function onMouseMove(e) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;

                postIt.style.left = `${x}px`;
                postIt.style.top = `${y}px`;
            }

            function onMouseUp() {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }
        }
    });

    function createPostIt(content) {
        const postIt = document.createElement("div");
        postIt.className = "postIt";
        postIt.textContent = content;
        postIt.style.width = "150px";
        postIt.style.height = "150px";
        postIt.style.margin = "3px";
        postItContainer.appendChild(postIt);
        saveToLocalStorage();
    }

    function saveToLocalStorage() {
        const postIts = Array.from(document.querySelectorAll(".postIt")).map(postIt => ({
            content: postIt.textContent,
            top: postIt.style.top,
            left: postIt.style.left,
        }));
        localStorage.setItem("postIts", JSON.stringify(postIts));
    }

    function loadFromLocalStorage() {
        const savedPostIts = JSON.parse(localStorage.getItem("postIts")) || [];
        savedPostIts.forEach(savedPostIt => {
            const postIt = createPostIt(savedPostIt.content);
            postIt.style.top = savedPostIt.top;
            postIt.style.left = savedPostIt.left;
        });
    }

    loadFromLocalStorage();
});
