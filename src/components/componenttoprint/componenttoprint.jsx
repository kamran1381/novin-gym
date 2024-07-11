import React from "react";

const ComponentToPrint = React.forwardRef(({ program }, ref) => (
    <div ref={ref} style={{ padding: '20px' }}>
       {console.log(program)}
        <h1>Program Details</h1>
        {program ? (
            <>
                <p className="text-black text-lg"><strong>Username:</strong> {program.name}</p>
                <p className="text-black text-lg"><strong>Created At:</strong> {program.weight}</p> 
                
            </>
        ) : (
            <p>Loading...</p>
        )}
    </div>
));

export default ComponentToPrint;