import React, { useEffect, useState } from "react";
import Animal from "../ui/animal_item";
import "../../styles/grid.css";

export default function AnimalList() {
  const [animals, setAnimals] = useState([]);

  // Fetch the disaster rescue animals from the database
  useEffect(() => {
    async function getAnimals() {
      let response = ""
      if(process.env.NODE_ENV === "production"){
        response = await fetch(`/animal/disaster`);
      }
      else{
        response = await fetch("http://localhost:5000/animal/disaster")
      }
     
      // Error handling
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      // Get the animals
      const animals = await response.json();
      setAnimals(animals);
    }

    getAnimals();

    return;
  }, [animals.length]);

  // This method will delete an animal
  async function deleteAnimal(id) {
      if(process.env.NODE_ENV === "production"){
        await fetch(`/${id}`, {
          method: "DELETE",
        });

      }
      else{
        await fetch(`http://localhost:5000/${id}`, {
          method: "DELETE",
        });
      }
  
    // Set new animals
    const newAnimals = animals.filter((el) => el._id !== id);
    setAnimals(newAnimals);
    // Refresh page
    window.location.reload(true);
  }

  // This method will map out the animals to the cards
  function animalList() {
    return animals.map((animal) => {
      return (
        <Animal
          animal={animal}
          deleteAnimal={() => deleteAnimal(animal._id)}
          key={animal._id}
        />
      );
    });
  }

  return (
    <div>
      <div className="header">
        <h3>Disaster Rescue Dogs</h3>
      </div>
      <div className="container">{animalList()}</div>
    </div>
  );
}
