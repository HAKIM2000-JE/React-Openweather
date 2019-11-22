import React from "react";
import Icon from "./Icon/";
import Temperature from "./Temperature";

import "./Weather.scss";
import { DoubleBounce } from "better-react-spinkit";

// Composant fonctionnel
// Il reçoit UN argument qu'on éclate en plusieurs variables avec la syntaxe de décomposition
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Affecter_par_d%C3%A9composition
// Ce composant n'a aucun état
// Il ne fait que recevoir des propriétés
// Et les affiche
const Weather = ({ display, city, icon, temperature, status, loading }) => {
  if (!display) return <div></div>;

  if (loading) {
    return <div className="mt-3 d-flex justify-content-center">
      <DoubleBounce size={60} color="#CCC" />
    </div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-8 col-md-4 col-lg-3 m-auto">
          <div className="card shadow mt-3 weather-card">
            <div className="card-header text-center">
              <h2>{city}</h2>
              <p className="m-0">{status}</p>
            </div>
            <div className="card-body">
              <Icon icon={icon} />
              <Temperature value={temperature} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
