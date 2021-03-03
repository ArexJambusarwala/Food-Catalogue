import React, { useEffect } from 'react';
import carouselImages from '../carousel-images'
import '../styles/carousel.css'

function CarouselImage(props) {
    return <img src={props.src} className="carousel-images" alt={props.alt} />
}

const Carousel = React.memo(function Carousel() {
    useEffect(() => {
        (function setCarouselAnimation() {
            let carouselImages = document.getElementsByClassName("carousel-images");
            const numberOfCarouselImages = carouselImages.length, totalTime = numberOfCarouselImages * 5;
            for(let i=0; i<numberOfCarouselImages; i++) {
                carouselImages[i].style.animation = `carousel ${totalTime}s infinite`;
                carouselImages[i].style.animationDelay = `${i*5}s`;
            }
            setTimeout(setCarouselAnimation, 13501);
        })();
    }, []);

    return (
        <div id="carousel">
            {carouselImages.map(image => <CarouselImage 
                src={`./assets/${image.name}`} 
                alt={`background-carousel-image-${image.id}`} 
                key={image.id}
            />)}
        </div>
    );
});

export default Carousel