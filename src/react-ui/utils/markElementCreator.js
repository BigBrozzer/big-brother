export function createMarkHtmlElementOnThePage(action) {
    const markElement = document.createElement('div');

    markElement.setAttribute('style', `position: absolute; top: ${action.pageY}px;
    left: ${action.pageX}px; background: red; width: 20px; height: 20px;`);

    document.body.appendChild(markElement);
}

