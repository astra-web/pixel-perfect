import '@webcomponents/custom-elements';

if (!document.getElementById("pixel-perfect-dialog")) {
    class PixelPerfectRoot extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({mode: 'open'});
            const div = document.getElementById("--inner-pixel-perfect-component");
            console.log(div)
            div.remove();
    
            shadowRoot.appendChild(div);
        }
    }
    
    customElements.define('pixel-perfect-root', PixelPerfectRoot);

    fetch(chrome.runtime.getURL('src/dialog/index.html')).then(r => r.text()).then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
        // not using innerHTML as it would break js event listeners of the page
    });
}
