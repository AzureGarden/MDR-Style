const ResponseFacility = {
    handleMouseMove: (event) => {
        const { x, y } = event.data;

        const circle = document.createElement('div');
        circle.classList.add('fade-out-circle');

        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        circle.style.backgroundColor = `rgb(${x % 255}, ${y % 255}, ${(x + y) % 255})`;

        document.body.appendChild(circle);

        const getRandomFloat = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        const dx = getRandomFloat(-10, 10);
        const dy = getRandomFloat(-10, 10);
    
        const moveCircle = () => {
            const left = parseFloat(circle.style.left);
            const top = parseFloat(circle.style.top);
            circle.style.left = `${left + dx}px`;
            circle.style.top = `${top + dy}px`;
    
            if (left < 0 || top < 0 || left > window.innerWidth || top > window.innerHeight) {
                circle.remove();
            } else {
                requestAnimationFrame(moveCircle);
            }
        };
    
        moveCircle();
    
        setTimeout(() => {
            circle.remove();
        }, 1000);
    },
    handleClick: (event) => {
        const { message } = event.data;
        
        console.log("Button clicked:", message);
    }
};

export default ResponseFacility;