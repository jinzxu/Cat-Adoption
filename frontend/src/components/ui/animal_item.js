import { Link } from "react-router-dom";
import Card from "./card";
import "../../styles/animal.css";

export default function Animal(props){
  
  let image = "";

  // Set default image if none provided
  if (props.animal.image != null && props.animal.image.length > 0){
    image = props.animal.image;
  }
  else{
    image = "https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_Retriever_Dukedestiny01_drvd.jpg";
  }
  
  // Remove animal and reload page
  function remove(){
      props.deleteAnimal(props.animal._id);
      window.location.reload(true);

  }
  return (
     <Card>
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="content">
            <h3>{props.animal.name}</h3>
            <h4>{props.animal.age}</h4>
            <h4>{props.animal.breed}</h4>
            <h4>{props.animal.gender}</h4>
            <h4>Reserved: {props.animal.reserved}</h4>
        </div>
        <div className="actions">
            <div className="edit">
              <button className="btn btn-link">
                  <Link to={`/edit/${props.animal._id}`}>Edit</Link>
              </button>
            </div>
            <div className="delete">
              <button className="btn btn-link"
                  onClick={()=> remove()}
              >
              Delete
              </button>
            </div>
        </div>
    </Card>
      
  );
}
