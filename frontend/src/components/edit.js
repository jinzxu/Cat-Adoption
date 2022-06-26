import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  // Initialize form and setform with use state
  const [form, setForm] = useState({
    age: "",
    animal_type: "",
    breed: "",
    color: "",
    name: "",
    outcome_type: "",
    gender: "",
    location_lat: 0.0,
    location_long: 0.0,
    age_weeks: 0.0,
    reserved: "",
    image: "",
  });
  // Parameters
  const params = useParams();
  // Navigation
  const navigate = useNavigate();
  // Retrieve the animal by id
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();

      let response = ""
      if(process.env.NODE_ENV === "production"){
        response = await fetch(`/animal/${params.id.toString()}`);
      }
      else{
        response = await fetch(`http://localhost:5000/animal/${params.id.toString()}`);
      }

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const animal = await response.json();
      if (!animal) {
        window.alert(`Animal with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(animal);
    }

    fetchData();
    return;
  }, [params.id, navigate]);

  // Update form and handle state
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    // Set the default values to the animal' current values
    e.preventDefault();
    const editedAnimal = {
      name: form.name,
      age: form.age,
      animal_type: form.animal_type,
      breed: form.breed,
      color: form.color,
      outcome_type: form.outcome_type,
      gender: form.gender,
      location_lat: form.location_lat,
      location_long: form.location_long,
      age_weeks: form.age_weeks,
      reserved: form.reserved,
      image: form.image,
    };

    // Update the database.
    if(process.env.NODE_ENV === "production"){
      await fetch(`/update/${params.id}`, {
        method: "POST",
        body: JSON.stringify(editedAnimal),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    else{
      await fetch(`http://localhost:5000/update/${params.id}`, {
        method: "POST",
        body: JSON.stringify(editedAnimal),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    
    // Naviagte back to search grid
    navigate("/");
    window.location.reload(true);
  }

  // Display the form to update animal information
  return (
    <div>
      <form className="form-body" onSubmit={onSubmit}>
        <h3>Edit Animal</h3>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            minlength= "1"
            maxlength="40"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            minlength= "1"
            maxlength="75"
            className="form-control"
            id="breed"
            placeholder="Enter Breed"
            value={form.breed}
            onChange={(e) => updateForm({ breed: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            minlenth="1"
            maxlength="20"
            className="form-control"
            id="color"
            placeholder="Enter Color"
            value={form.color}
            onChange={(e) => updateForm({ color: e.target.value })}
          />
        </div>

        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="age">Age (Years)</label>
              <input
                type="number"
                className="form-control"
                min="0"
                max="25"
                id="age"
                placeholder="Enter Age"
                value={form.age}
                onChange={(e) => updateForm({ age: e.target.value })}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="age_weeks">Age (Weeks)</label>
              <input
                type="number"
                id="age_weeks"
                placeholder="Enter Age in Weeks"
                className="form-control"
                value={form.age_weeks}
                onChange={(e) =>
                  updateForm({ age_weeks: parseFloat(e.target.value) })
                }
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="location_lat">Location (Latitude)</label>
              <input
                type="number"
                step="0.000000000000001"
                min="-90"
                max="90"
                className="form-control"
                id="location_lat"
                value={form.location_lat}
                onChange={(e) =>
                  updateForm({ location_lat: parseFloat(e.target.value) })
                }
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="location_long">Location (Longitude)</label>
              <input
                type="number"
                step="0.000000000000001"
                min="-180"
                max="180"
                className="form-control"
                id="location_long"
                value={form.location_long}
                onChange={(e) =>
                  updateForm({ location_long: parseFloat(e.target.value) })
                }
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="color">Image</label>
          <input
            type="url"
            pattern="https://.*"
            className="form-control"
            id="image"
            placeholder="Enter an Image URL"
            value={form.image}
            onChange={(e) => updateForm({ image: e.target.value })}
          />
        </div>
        
        <div className="form-group">
          <text>Type:</text> 
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="typeOptions"
              id="typeDog"
              value="Dog"
              checked={form.animal_type === "Dog"}
              onChange={(e) => updateForm({ animal_type: e.target.value })}
            />
            <label htmlFor="typeDog" className="form-check-label">
              Dog
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="typeOptions"
              id="typeCat"
              value="Cat"
              checked={form.animal_type === "Cat"}
              onChange={(e) => updateForm({ animal_type: e.target.value })}
            />
            <label htmlFor="typeCat" className="form-check-label">
              Cat
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <text>Gender:</text> 
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genderOptions"
              id="typeSpayedFemale"
              value="Spayed Female"
              checked={form.gender === "Spayed Female"}
              onChange={(e) => updateForm({ gender: e.target.value })}
            />
            <label htmlFor="typeSearchAndRescue" className="form-check-label">
              Spayed Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genderOptions"
              id="typeIntactFemale"
              value="Intact Female"
              checked={form.gender === "Intact Female"}
              onChange={(e) => updateForm({ gender: e.target.value })}
            />
            <label htmlFor="typeIntactFemale" className="form-check-label">
              Intact Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genderOptions"
              id="typeNeuteredMale"
              value="Neutered Male"
              checked={form.gender === "Neutered Male"}
              onChange={(e) => updateForm({ gender: e.target.value })}
            />
            <label htmlFor="typeNeuteredMale" className="form-check-label">
              Neutered Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genderOptions"
              id="typeIntactMale"
              value="Intact Male"
              checked={form.gender === "Intact Male"}
              onChange={(e) => updateForm({ gender: e.target.value })}
            />
            <label htmlFor="typeIntactMale" className="form-check-label">
              Intact Male
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <text>Status:</text> 
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="statusOptions"
              id="typeSearchAndRescue"
              value="Search and Rescue"
              checked={form.outcome_type === "Search and Rescue"}
              onChange={(e) => updateForm({ outcome_type: e.target.value })}
            />
            <label htmlFor="typeSearchAndRescue" className="form-check-label">
              Search and Rescue
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="statusOptions"
              id="typeAdoption"
              value="Adoption"
              checked={form.outcome_type === "Adoption"}
              onChange={(e) => updateForm({ outcome_type: e.target.value })}
            />
            <label htmlFor="typeAdoption" className="form-check-label">
              Adoption
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="statusOptions"
              id="typeReturnToOwner"
              value="Return to Owner"
              checked={form.outcome_type === "Return to Owner"}
              onChange={(e) => updateForm({ outcome_type: e.target.value })}
            />
            <label htmlFor="typeReturnToOwner" className="form-check-label">
              Return to Owner
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="statusOptions"
              id="typeEuthenasia"
              value="Euthenasia"
              checked={form.outcome_type === "Euthenasia"}
              onChange={(e) => updateForm({ outcome_type: e.target.value })}
            />
            <label htmlFor="typeEuthenasia" className="form-check-label">
              Euthenasia
            </label>
          </div>
        </div>

        <div className="form-group">
          <text>Reserved:</text> 
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="reservedOptions"
              id="typeTrue"
              value="True"
              checked={form.reserved === "True"}
              onChange={(e) => updateForm({ reserved: e.target.value })}
            />
            <label htmlFor="typeTrue" className="form-check-label">
              True
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="reservedOptions"
              id="typeFalse"
              value="False"
              checked={form.reserved === "False"}
              onChange={(e) => updateForm({ reserved: e.target.value })}
            />
            <label htmlFor="typeFalse" className="form-check-label">
              False
            </label>
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit animal"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
