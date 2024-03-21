document.addEventListener("DOMContentLoaded", (event) => {
    const textAreas = document.getElementsByTagName('textarea');
    for (let i = 0; i < textAreas.length; i++) {
        const textarea = textAreas[i];

        textarea.addEventListener("keydown", (event) => submitOnEnter(event));
    }

    function submitOnEnter(event) {
        if (event.which === 13) {
            event.target.form.submit();
        }
    }
});