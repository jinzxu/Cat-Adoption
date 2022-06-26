import React, { useEffect, useState } from "react";
import Cat from "../ui/animal_item";
import "../../styles/grid.css";

export default function CatList() {
  const [animals, setCats] = useState([]);
  console.log(window.location.pathname)
  // This method fetches the animals from the database.
  useEffect(() => {
    async function getCats() {
      let response = ""
      if (process.env.NODE_ENV === "production") {
        response = await fetch(`/animal/water`);
      }
      else {
        response = await fetch("http://localhost:5000/animal/water")
      }

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const animals = await response.json();
      setCats(animals);
    }

    getCats();

    return;
  }, [animals.length]);

  // This method will delete an animal
  async function deleteCat(id) {
    if (process.env.NODE_ENV === "production") {
      await fetch(`/${id}`, {
        method: "DELETE",
      });
    }
    else {
      await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
    }
    // set new animals
    const newCats = animals.filter((el) => el._id !== id);
    setCats(newCats);
    // Refresh page
    window.location.reload(true);
  }

  // This method will map out the animals to the cards
  function animalList() {
    return animals.map((animal) => {
      return (
        <Cat
          animal={animal}
          deleteCat={() => deleteCat(animal._id)}
          key={animal._id}
        />
      );
    });
  }

  return (
    <div>
      <div className="header">
        <h3>Water Adopt Cats</h3>
      </div>
      <div className="container">{animalList()}</div>
    </div>
  );
}
