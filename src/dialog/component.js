

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