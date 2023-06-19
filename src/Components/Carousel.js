import React from 'react';
import './Carousel.css';

function Carousel(props) {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" >
        <div className="carousel-inner">
            {props.images.map((image , index)=>{
                return <div key={index} className="carousel-item active">
                            <img src={image.imageURL}  alt={image.imageName}/>
                        </div>
            })}
            
            
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
  )
}

export default Carousel