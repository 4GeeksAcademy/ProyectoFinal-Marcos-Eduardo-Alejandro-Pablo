import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";



export const AiringToday = () => {

  const [data, setData] = useState("");


  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.tvmaze.com/schedule?country=es&date=`);
      const data = await response.json();
      setData(data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {data && data.length > 0 && <h1>Estrenos de hoy:</h1>}
          <div className="col d-flex gap-5 flex-wrap">

            {data && data.length > 0 && data.map((card, index) => {
              return <Card key={index} cardInfo={card} />
            }
            )}
          </div>
        </div>
      </div>

    </>
  );
};
