import React from "react";
import "../styles/mainstyle.css";
import { tariffsData } from "../data/tariffsData";
import Card from "./Card";

function Tariffs() {
  return (
    <div className="section_3">
      <h5 className="section__3-heading">наши тарифы</h5>

      <div className="tariff__cards">
        {tariffsData.map((card, index) => (
          <Card key={index}
            tariff={card.currentTariff}
            color={card.color}
            title={card.title}
            subtitle={card.subtitle}
            icon={card.icon}
            price={card.price}
            withoutSell={card.withoutSell}
            credit={card.credit}
            includes={card.tariffIncludes}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Tariffs;
