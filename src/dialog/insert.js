import '@webcomponents/custom-elements';

if (!document.getElementById("pixel-perfect-dialog")) {
    class PixelPerfectRoot extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({mode: 'open'});
            const div = document.getElementById("--inner-pixel-perfect-component");
            div.remove();

            let setSection = function (section) {
                let id = `pixel-perfect-section--${section}`;
                let wrapper = shadowRoot.getElementById("pixel-perfect--sections");

                wrapper.classList.add("active");
                shadowRoot.getElementById(id).classList.add("active");
                shadowRoot.getElementById("pixel-perfect--home").classList.add("remove");
                shadowRoot.getElementById("pixel-perfect--home").classList.remove("active");
            };

            let goHome = function () {
                let sections = this.getAllElementsWithID(shadowRoot, "pixel-perfect-section--");
                let wrapper = shadowRoot.getElementById("pixel-perfect--sections");

                wrapper.classList.remove("active");
                for (let i = 0; i < sections.length; i++) {
                    sections[i].classList.remove("active");
                }
                shadowRoot.getElementById("pixel-perfect--home").classList.remove("remove");
                shadowRoot.getElementById("pixel-perfect--home").classList.add("active");
            };

            shadowRoot.appendChild(div);

            let activators = this.getAllElementsWithAttribute(shadowRoot, 'data-pixel-perfect-section');
            for (let i = 0; i < activators.length; i++) {
                let activator = activators[i];
                activator.addEventListener("click", () => {
                    setSection(activator.getAttribute("data-pixel-perfect-section"));
                })
            }

            shadowRoot.getElementById("pixel-perfect--go-home").addEventListener("click", goHome.bind(this))

        }

        getAllElementsWithAttribute(r, attribute) {
            var matchingElements = [];
            var allElements = r.querySelectorAll('*');
            for (var i = 0, n = allElements.length; i < n; i++)
            {
                if (allElements[i].getAttribute(attribute) !== null)
                {
                    // Element exists with attribute. Add to array.
                    matchingElements.push(allElements[i]);
                }
            }
            return matchingElements;
        }

        getAllElementsWithID(r, id) {
            var matchingElements = [];
            var allElements = r.querySelectorAll('*');
            for (var i = 0, n = allElements.length; i < n; i++)
            {
                if (allElements[i].id === id)
                {
                    // Element exists with attribute. Add to array.
                    matchingElements.push(allElements[i]);
                }
            }
            return matchingElements;
        }
    }

    customElements.define('pixel-perfect-root', PixelPerfectRoot);

    fetch(chrome.runtime.getURL('src/dialog/index.html')).then(r => r.text()).then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
        // not using innerHTML as it would break js event listeners of the page
    });
}
