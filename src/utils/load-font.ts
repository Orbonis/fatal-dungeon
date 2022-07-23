import WebFont from "webfontloader";

const loadedFonts: string[] = [];

export const LoadFont = (family: string): Promise<void> => {
    return new Promise((resolve) => {
        if (loadedFonts.indexOf(family) !== -1) {
            resolve();
        } else {
            WebFont.load({
                google: {
                    families: [ family ]
                },
                active: () => {
                    loadedFonts.push(family);
                    window.setTimeout(() => {
                        resolve();
                    }, 500);
                },
                fontloading: (family) => {
                    const el = document.createElement('p');
                    el.style.fontFamily = family;
                    el.style.fontSize = "0px";
                    el.style.visibility = "hidden";
                    el.innerHTML = '.';
                    
                    document.body.appendChild(el);
                }
            });
        }
    });
}