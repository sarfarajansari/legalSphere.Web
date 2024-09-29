import React from "react";

const Pdfview = ({ chatId }) => {
  return (
    <div style={{ height: "100%",borderRadius:20,overflow:'hidden' }}>
      <embed
        src="http://localhost:7000/pdf/chatId" // The URL of the PDF from FastAPI
        type="application/pdf"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Pdfview;
