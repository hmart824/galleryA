import React , {useState} from 'react';
import ImageForm from './ImageForm';
import Carousel from './Carousel';
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import './ImagesList.css';

function ImagesList(props) {
  const [addImage, setaddImage] = useState(false);
  const [imageToEdit, setImageToEdit] = useState({});
  const [carousel, setCarousel] = useState(false);
  return (
    <div className="container position-relative">
      {carousel && <Carousel images={props.images}/>}
      {(addImage || imageToEdit.image)
      && <ImageForm 
            addNewImage={props.addNewImage} 
            album={props.album} 
            imageToEdit={imageToEdit}
            setImageToEdit={setImageToEdit}
            updateImage={props.updateImage}
          />}
      <div className="header my-2">
        <div className="left d-flex align-items-center">
            <RiArrowGoBackFill className='back-btn' onClick={props.backToAlbum}/>
            <h1>{(props.images.length === 0) ? `No Images Inside ${props.album.albumName}` : `Images Of ${props.album.albumName}`}</h1>
        </div>
        <div className="right">
          <button 
            type="button" 
            className="btn btn-primary btn-sm mx-1" 
            onClick={()=>{
              setCarousel(!carousel);
            }}>
            {carousel ? 'Close Slide' : 'Slide Show'}
          </button>
          <button 
            type="button" 
            className="btn btn-primary btn-sm" 
            onClick={()=>{
              setaddImage(!addImage);
              setImageToEdit({});
            }}>
            {addImage || imageToEdit.image ? 'Cancel' : 'Add Image'}
          </button>
        </div>
        </div>
        <div className="images-list my-2">
          <ul>
            {props.images?.map((image , index)=>{
              return <li key={index} style={{cursor: 'pointer'}}>
                        <div className="card" style={{width: '18rem'}}>
                          <img src={image.imageURL} className="card-img-top" alt={image.imageName}/>
                          <div className="card-body d-flex justify-content-between">
                            <p className='image-name'>{image.imageName}</p>
                            <div className="opts">
                              <BiEdit style={{marginRight: '.2rem'}} onClick={()=>{
                                setImageToEdit({image , index});
                                setaddImage(true);
                                }}/>
                              <MdDelete onClick={()=>{props.removeImage(image.id)}}/>
                            </div>
                          </div>
                        </div>
                      </li>
            })}
            
          </ul>
        </div>
    </div>
  )
}

export default ImagesList