import React , {useRef} from 'react';
import { serverTimestamp } from "firebase/firestore";

function AlbumForm(props) {

  const albumNameInput = useRef();
  const onSubmitHandler = (e)=>{
    e.preventDefault();
    let albumName = albumNameInput.current.value.trim();
    if(albumName !== ''){
      let album = {
        albumName,
        createdAt: serverTimestamp()
      }
      props.addAlbum(album);
      albumNameInput.current.value = '';
    }
  }

  return (
    <form className='text-center my-5 shadow p-3 mb-5 bg-body-tertiary rounded mx-auto' style={{maxWidth: '36rem'}} onSubmit={onSubmitHandler}>
        <label htmlFor="inputAlbum" className="form-label h2">Create an Album</label>
        <input type="text" id="inputAlbum" className="form-control mx-auto" placeholder='Album Name' style={{maxWidth: '33rem'}} ref={albumNameInput}/>
        <button type="button" className="btn btn-outline-danger btn-sm my-2 mx-2" onClick={()=>{albumNameInput.current.value = ''}}>Clear</button>
        <button type="submit" className="btn btn-outline-success btn-sm my-2 mx-2">Create</button>
    </form>
  )
}

export default AlbumForm