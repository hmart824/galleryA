import { useState , useReducer , useEffect} from 'react';
import './App.css';

//components
import AlbumsList from './Components/AlbumsList';
import Navbar from './Components/Navbar';
import ImagesList from './Components/ImagesList';

//tostify imports
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// firebase imports
import { doc , collection , addDoc , getDocs , deleteDoc , query , where , updateDoc , orderBy} from "firebase/firestore";
import { db } from './Firebase';

//reducer function
export const reducer = (state , action)=>{
  const { payload } = action;
  switch (action.type) {
    case "LOADING":
    case "DELETE_ALL_DATA":
    case "GET_ALL_DATA": {
      return {
        ...state,
        [payload.state]: payload.value
      };
    }
    case "ADD_DATA": {
      return {
        ...state,
        [payload.state]: [payload.value, ...state[payload.state]]
      };
    }
    case "REMOVE_DATA": {
      return {
        ...state,
        [payload.state]: state[payload.state].filter((el) => el.id !== payload.id)
      };
    }
    case "UPDATE_DATA": {
      let duplicate = state[payload.state];
      duplicate[payload.index] = payload.value;
      return {
        ...state,
        [payload.state]: duplicate
      };
    }
    default:
      return state;
  }

};

function App() {
  const [album, setAlbum] = useState(null);
  const [state , dispatch] = useReducer(reducer , {albums: [], images: [] , loading: false});

  //fetch all albums
  useEffect(() => {
    const getAlbums = async()=>{
      dispatch({type: "LOADING" , payload:{state: 'loading' , value: true}});
       //get all albums from db
      const q = query(collection(db, "albums"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q);
      const albums = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });

      //set all albums
      dispatch({
        type: 'GET_ALL_DATA' , 
        payload: {
          state: 'albums',
          value: albums
          }
        });
        dispatch({type: "LOADING" , payload:{state: 'loading' , value: false}});
    }
    getAlbums();
  }, [])

  //fetch all images
  useEffect(() => {
    const getImages = async()=>{
      dispatch({type: "LOADING" , payload:{state: 'loading' , value: true}});
        if(album !== null){
          const q = query(collection(db, "images"), where('albumId' , '==' , album.id))
          const imageQuerySnapshot = await getDocs(q);
          const images = imageQuerySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          });
          dispatch({
            type: 'GET_ALL_DATA' , 
            payload: {
              state: 'images',
              value: images
              }
            });
        }
        dispatch({type: "LOADING" , payload:{state: 'loading' , value: false}});
    }
    getImages();
  },[album]);

  
  
  //add new album
  const addAlbum = async(album)=>{

    //add in db
    const albumRef = collection(db, "albums");
    const docRef = await addDoc(albumRef, album);

    //add new album to the albums array
    dispatch({
      type: 'ADD_DATA' , 
      payload: {
        state: 'albums',
        value: {
          id: docRef.id,
           ...album
        }
      }});
    toast.success("Album created successfully.");
  }

  //remove the album
  const removeAlbum = async(id)=>{

    //remove all images linked to the album in db
    const q = query(collection(db, "images") , where('albumId' , '==' ,id))
    const imagesIdsQuerySnapshot = await getDocs(q);
    const imagesIds = imagesIdsQuerySnapshot.docs.map(doc => doc.id);
    console.log(imagesIds);
    imagesIds.forEach(async(id)=>{
      await deleteDoc(doc(db, "images", id));
    });

    
    await deleteDoc(doc(db, "albums", id));

    //filter removed album
    dispatch({
      type: 'REMOVE_DATA' , 
      payload: {
        state: 'albums',
        id
      }
    });
    toast.error("Album removed successfully.");
  }

  //add new image
  const addNewImage = async(image)=>{

    //add in db
    const imageRef = collection(db, "images");
    const imageDocRef = await addDoc(imageRef, image);

    //add new image to the images array
    dispatch({
      type: 'ADD_DATA' , 
      payload: {
        state: 'images',
        value: {
          id: imageDocRef.id,
           ...image
        }
      }
    });
    toast.success("Image added successfully.");
  }

  //remove the image
  const removeImage = async(id)=>{
    //remove from db
    await deleteDoc(doc(db, "images", id));

    //remove from images
    dispatch({
      type: 'REMOVE_DATA' , 
      payload: {
        state: 'images',
        id
      }
    });
    toast.error("Image removed successfully.");
  }

  //update the image
  const updateImage = async(image , index)=>{
    //update in db
    const imageRef = doc(db, "images", image.id);
    await updateDoc(imageRef, image);

    //update in images
    dispatch({
      type: 'UPDATE_DATA',
      payload: {
        state: 'images',
        value : image,
        index
      }
    })
    toast.info("Image updated successfully.");
  }

  //retrurn to album
  const backToAlbum = ()=>{
    setAlbum(null);
    dispatch({
      type: 'DELETE_ALL_DATA',
      payload: {
        state: 'images',
        value: []
      }
    })
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="App">
        <Navbar/>
        {state.loading && (<div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>)}
        {album ? 
        (!state.loading && <ImagesList
          album={album}
          addNewImage={addNewImage}
          removeImage={removeImage}
          setAlbum={setAlbum}
          images={state.images}
          updateImage={updateImage}
          backToAlbum={backToAlbum}
          />) : 
        (!state.loading && <AlbumsList 
        addAlbum={addAlbum}
        removeAlbum={removeAlbum}
        setAlbum={setAlbum} 
        albums={state.albums}
        />)}
      </div>
    </>
  );
}

export default App;
