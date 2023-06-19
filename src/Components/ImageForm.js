import React , {useRef , useEffect} from 'react';
import { serverTimestamp } from "firebase/firestore";

function ImageForm(props) {
const imageNameInput = useRef();
const imageURLInput = useRef();

useEffect(() => {
    if(props.imageToEdit.image){
        imageNameInput.current.value = props.imageToEdit.image.imageName;
        imageURLInput.current.value = props.imageToEdit.image.imageURL;
    }
}, [props.imageToEdit.image])



const handleSubmit = (e)=>{
    e.preventDefault();
    let imageName = imageNameInput.current.value.trim();
    let imageURL = imageURLInput.current.value.trim();

    if(imageName !== '' && imageURL !== '' && !props.imageToEdit.image){
        let image = {
            imageName,
            imageURL,
            albumId: props.album.id,
            createdAt: serverTimestamp()
        }
        props.addNewImage(image);
        clearInputs();
    }else{
        let image = {
            id: props.imageToEdit.image.id,
            imageName,
            imageURL,
            albumId : props.imageToEdit.image.albumId,
            createdAt: props.imageToEdit.image.createdAt,
            updatedAt: serverTimestamp()
        }
        props.updateImage(image , props.imageToEdit.index);
        props.setImageToEdit({});
        clearInputs();
    }
}

const clearInputs = ()=>{
    imageNameInput.current.value = '';
    imageURLInput.current.value = '';
}
  return (
    <form className='text-center my-5 shadow p-3 mb-5 bg-body-tertiary rounded mx-auto' style={{maxWidth: '36rem'}} onSubmit={handleSubmit} >
        <label htmlFor="inputImageName" className="form-label h2">{props.imageToEdit.image ? 'Edit Image' :'Add Image'}</label>
        <input type="text" id="inputImageName" className="form-control mx-auto my-1" placeholder='Image Name' style={{maxWidth: '33rem'}} ref={imageNameInput}/>
        <input type="text" id="inputImageURL" className="form-control mx-auto" placeholder='Image URL' style={{maxWidth: '33rem'}} ref={imageURLInput}/>
        <button type="button" className="btn btn-outline-danger btn-sm my-2 mx-2" onClick={clearInputs}>Clear</button>
        <button type="submit" className="btn btn-outline-success btn-sm my-2 mx-2">{props.imageToEdit.image ? 'Edit' : 'Create'}</button>
    </form>
  )
}

export default ImageForm