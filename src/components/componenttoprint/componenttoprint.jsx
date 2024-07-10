import React from "react";
const ComponentToPrint = React.forwardRef((props, ref) => (
    
    <div ref={ref} style={{ padding: '20px' }}>
    {console.log(props)}
      <h1>Program Details</h1>
      {props.program ? (
        <>
          {/* <p className="text-black text-lg"><strong>ID:</strong> {props.program.id}</p> */}
          <p  className="text-black text-lg" ><strong>Username:</strong> {props.program.name}</p>
          <p className="text-black text-lg" ><strong>Created At:</strong> {props.program.weight}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  ));


  export default ComponentToPrint