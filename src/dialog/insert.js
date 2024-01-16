import '@webcomponents/custom-elements';
import EasyLogicColorPicker from '../vendor/EasyLogicColorPicker.js';

if (!document.getElementById("pixel-perfect--dialog")) {
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

            function convertUnit() {
                let result = shadowRoot.getElementById("pixel-perfect--unit-result");
                let unit1 = shadowRoot.getElementById("pixel-pefect--select-meassure-1");
                let unit2 = shadowRoot.getElementById("pixel-pefect--select-meassure-2");
                let input = shadowRoot.getElementById("pixel-perfect--unit-input");

                result.value = this.convertUnit(input.value === "" ?
                 0 : parseInt(input.value), unit1.options[unit1.selectedIndex].value, unit2.options[unit2.selectedIndex].value);
            }

            this.createLinks(shadowRoot, [
                chrome.runtime.getURL('src/styles/colorpicker.css'),
                "https://fonts.googleapis.com/css?family=Inter"
            ])

            shadowRoot.createElement

            shadowRoot.getElementById("pixel-perfect--unit-input").addEventListener("input", convertUnit.bind(this));
            shadowRoot.getElementById("pixel-pefect--select-meassure-1").addEventListener("change", convertUnit.bind(this));
            shadowRoot.getElementById("pixel-pefect--select-meassure-2").addEventListener("change", convertUnit.bind(this));

            shadowRoot.getElementById("pixel-perfect--go-home").addEventListener("click", goHome.bind(this));
            this.createColorDialog(shadowRoot);
            this.activateScreenResizeListener(shadowRoot);
            this.setRulers(shadowRoot);
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

        createLinks(r, links) {
            for (let i = 0; i < links.length; i++) {
                let link = links[i];

                let l = document.createElement("link");
                l.href = link;
                l.rel = "stylesheet";

                r.prepend(l);
            }
        }

        createColorDialog(r) {
            const options = {
                color: "#fff",
                container: r.getElementById('pixel-pefect--color-picker'),
                onChange: function(color) {
                //   updateColor(color);
                },
                type: "default",
                position: "inline",
                paletteWidth: 400,
            };

                console.log(options.container)
            let picker = new EasyLogicColorPicker(options);
        }

        convertUnit(value, fromUnit, toUnit) {
            const unitFactors = {
              'px': 1,
              'pt': 1.3333333333333333,
              'em': 16,
              'rem': 16,
              'vw': 0.01,
              'vh': 0.01,
              'vmin': 0.0104166666666667,
              'vmax': 0.0104166666666667,
              'in': 96,
              'cm': 37.7952755905512,
              'mm': 3.77952755905512,
              'pc': 16,
            };
          
            const pxValue = value * unitFactors[fromUnit];
            return pxValue / unitFactors[toUnit];
          }

        getAllElementsWithID(r, id) {
            var matchingElements = [];
            var allElements = r.querySelectorAll('*');
            for (var i = 0, n = allElements.length; i < n; i++)
            {
                if (allElements[i].id.startsWith(id))
                {
                    // Element exists with attribute. Add to array.
                    matchingElements.push(allElements[i]);
                }
            }
            return matchingElements;
        }

        activateScreenResizeListener(r) {
            let elements = r.querySelectorAll("#pixel-perfect-section--devices div[data-pixel-perfect-width]");
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                element.addEventListener("click", () => {
                    let width = element.getAttribute("data-pixel-perfect-width");
                    let height = element.getAttribute("data-pixel-perfect-height");
                    chrome.runtime.sendMessage({type: "resizeWindow", width: width, height: height});
                })
            }
        }

        setRulers(r) {
            let rulerButton = r.getElementById("pixel-perfect--site-dimensions");
            rulerButton.addEventListener("click", () => {
                console.log("TODO: set rulers");
            });
        }
    }

    customElements.define('pixel-perfect-root', PixelPerfectRoot);

    fetch(chrome.runtime.getURL('src/dialog/index.html')).then(r => r.text()).then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
        // not using innerHTML as it would break js event listeners of the page
    });
}
