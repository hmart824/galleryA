import React , {useState} from 'react';
import './AlbumsList.css';
import AlbumForm from './AlbumForm';
import { TiDeleteOutline } from "react-icons/ti";

function AlbumList(props) {
    const [addAlbum, setAddAlbum] = useState(false);
  return (
    <div className="container position-relative">
        {addAlbum && <AlbumForm addAlbum={props.addAlbum}/>}
        <div className="header my-2">
            <h1>Albums</h1>
            <button 
            type="button" 
            className="btn btn-primary btn-sm" 
            onClick={()=>{setAddAlbum(!addAlbum)}}>
            {addAlbum ? 'Cancel' : 'Add Album'}
            </button>
        </div>
        <div className="albums-list my-2">
            <ul>
                {props.albums.map((album , index)=>{
                    return <li key={index} onClick={()=>{props.setAlbum(album)}}>
                                <TiDeleteOutline className='remove' 
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    props.removeAlbum(album.id)
                                }}/>
                                <img src="/folder.png" alt="" />
                                <p>{album.albumName}</p>
                            </li>
                })}
            </ul>
        </div>
    </div>
  )
}

export default AlbumList