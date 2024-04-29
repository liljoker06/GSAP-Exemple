function createContinuousAnimation(newIconId, targetElementId, callback) {
    const targetRect = document.querySelector(targetElementId).getBoundingClientRect();
    const mainLogoRect = document.querySelector('.main-logo').getBoundingClientRect();
    const x = targetRect.left + targetRect.width / 2 - (mainLogoRect.left + mainLogoRect.width / 2);
    const y = targetRect.top + targetRect.height / 2 - (mainLogoRect.top + mainLogoRect.height / 2);

    if (Array.isArray(newIconId)) {
        newIconId.forEach(id => {
            let tl = gsap.timeline({
                onComplete: callback,
                repeat: 0,
                yoyo: false,
                defaults: { ease: "power1.inOut" }
            });
            tl.to(id, { x: x, y: y, duration: 2 });
            tl.to(id, { x: 0, y: 0, duration: 0, immediateRender: false });
        });
    } else {
        var tl = gsap.timeline({
            onComplete: callback,
            repeat: 0,
            yoyo: false,
            defaults: { ease: "power1.inOut" }
        });
        tl.to(newIconId, { x: x, y: y, duration: 2 });
        tl.to(newIconId, { x: 0, y: 0, duration: 0, immediateRender: false });
    }
}


function createSequentialAnimation(newIconIds, targetElementIds, speed, onCompleteCallback) {
    let tl = gsap.timeline({
        defaults: { duration: 2 / speed, ease: "power1.inOut" },
        onComplete: onCompleteCallback
    });

    newIconIds.forEach((newIconId, index) => {
        const targetElementId = targetElementIds[index];
        const targetRect = document.querySelector(targetElementId).getBoundingClientRect();
        const mainLogoRect = document.querySelector('.main-logo').getBoundingClientRect();
        const x = targetRect.left + targetRect.width / 2 - (mainLogoRect.left + mainLogoRect.width / 2);
        const y = targetRect.top + targetRect.height / 2 - (mainLogoRect.top + mainLogoRect.height / 2);

        if (Array.isArray(newIconId)) {
            newIconId.forEach(id => {
                tl.to(id, { x: x, y: y, duration: 2 / speed });
                tl.to(id, { x: 0, y: 0, duration: 0 }, "+=0.1");
            });
        } else {
            tl.to(newIconId, { x: x, y: y, duration: 2 / speed });
            tl.to(newIconId, { x: 0, y: 0, duration: 0 }, "+=0.5");
        }
    });
}


window.addEventListener('DOMContentLoaded', (event) => {
    const newIconIds = [
    ['#newIcon1', '#newIcon11', '#newIcon8'],
    '#newIcon2',
    '#newIcon3',
    '#newIcon4',
    '#newIcon5', 
    '#newIcon6', 
    '#newIcon7', 
    '#newIcon8', 
    '#newIcon9', 
    '#newIcon10'];
    const targetElementIds = ['#element1', 
    '#element2', 
    '#element3',
    '#element4',
    '#element5',
    '#element6',
    '#element7', 
    '#element8', 
    '#element9', 
    '#element10'
];
    let speed = 4;  // Facteur de vitesse initial

    function startAnimations() {
        // Commencer avec les animations continues
        let animationsComplete = 0;
        newIconIds.forEach((newIconId, index) => {
            createContinuousAnimation(newIconId, targetElementIds[index], () => {
                animationsComplete++;
                if (animationsComplete === newIconIds.length) {
                    // Une fois toutes terminées, démarrer la séquence d'animations séquentielles
                    createSequentialAnimation(newIconIds, targetElementIds, speed, startAnimations); // Relancer les animations
                }
            });
        });
    }

    startAnimations(); // Lancer le cycle d'animations
});
