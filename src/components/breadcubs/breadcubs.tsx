import React from "react";
import { Link } from "react-router-dom";

interface Bradscub {
  id: number;
  link?: string;
  name: string;
  active?: boolean;
}

interface BradscubsProps {
  bradscubs: Bradscub[];
}

const Bradscubs: React.FC<BradscubsProps> = ({ bradscubs }) => {
  return (
    <div className="bradscubs row">
      {bradscubs.map((bradscub) => (
        <div key={bradscub.id} className="bradscubs_item">
          {!bradscub.active ? (
            <Link to={bradscub.link || "#"}>{bradscub.name}</Link>
          ) : (
            <span>{bradscub.name}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Bradscubs;
