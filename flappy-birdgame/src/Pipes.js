import React from "react";

function Pipes({ pipePosition }) {
  return (
    <div>
      <img
        src="https://media.geeksforgeeks.org/wp-content/uploads/20231211115753/6d2a698f31595a1.png"
        alt="pipe"
        className="pipe"
        style={{
          left: pipePosition.x,
          top: pipePosition.y,
      }}
        draggable={true}
      />
    </div>
  );
}

export default Pipes;
