import { Equipment } from "./Equipment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "./global";

export function EquipmentsList({ setCart }) {
  const [equipments, setEquipmentsList] = useState([]);

  useEffect(() => {
    fetch(`${API}/products/equipments`)
      .then((data) => data.json())
      .then((product) => setEquipmentsList(product));
  }, []);

  return (
    <div className="equipment-list ">
      {equipments.map((equipment) => (
        <Equipment key={equipment._id} equipment={equipment} />
      ))}
    </div>
  );
}
