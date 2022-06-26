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
      if (process.env.NODE_ENV === "production") {
        response = await fetch(`/animal/${params.id.toString()}`);
      }
      else {
        response = await fetch(`http://localhost:5000/animal/${params.id.toString()}`);
      }

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const animal = await response.json();
      if (!animal) {
        window.alert(`Cat with id ${id} not found`);
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
    const editedCat = {
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
    if (process.env.NODE_ENV === "production") {
      await fetch(`/update/${params.id}`, {
        method: "POST",
        body: JSON.stringify(editedCat),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    else {
      await fetch(`http://localhost:5000/update/${params.id}`, {
        method: "POST",
        body: JSON.stringify(editedCat),
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
        <h3>Edit Cat</h3>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            minlength="1"
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
            minlength="1"
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
          <text>Gender:</text>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genderOptions"
              id="typeMale"
              value="Mmale"
              checked={form.gender === "Male"}
              onChange={(e) => updateForm({ gender: e.target.value })}
            />
            <label htmlFor="typeSearchAndAdopt" className="form-check-label">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genderOptions"
              id="typeFemale"
              value="Female"
              checked={form.gender === "Female"}
              onChange={(e) => updateForm({ gender: e.target.value })}
            />
            <label htmlFor="typeFemale" className="form-check-label">
              Female
            </label>
          </div>
        </div>

        <div className="form-group">
          <text>Adopted:</text>
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
            value="Edit cat"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
