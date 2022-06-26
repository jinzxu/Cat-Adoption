import React from "react";
// Route defines the different pages of the application
import { Route, Routes } from "react-router-dom";

// Import components
import Navigation from "./components/navigation";
import Create from "./components/create";
import AdoptCats from "./components/pages/rescue_animals";
import Edit from "./components/edit";
import MountainAdopt from "./components/pages/mountain_rescue";
import WaterAdopt from "./components/pages/water_rescue";
import DisasterAdopt from "./components/pages/disaster_rescue";
import AllCats from "./components/pages/all_animals";

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<AdoptCats />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/water" element={<WaterAdopt />} />
        <Route path="/mountain" element={<MountainAdopt />} />
        <Route path="/disaster" element={<DisasterAdopt />} />
        <Route path="/all" element={<AllCats />} />
      </Routes>
    </div>
  );
};

export default App;
