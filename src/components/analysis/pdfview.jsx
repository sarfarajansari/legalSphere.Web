import { Spin } from "antd";
import React, { memo, useEffect, useState } from "react";

const Pdfview = memo(({ chatId }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [chatId]);
  return (
    <div style={{ height: "100%", borderRadius: 20, overflow: "hidden" }}>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Spin size="large" />
        </div>
      )}
      <embed
        src={`http://localhost:7000/pdf/${chatId}`} // The URL of the PDF from FastAPI
        type="application/pdf"
        width="100%"
        height="100%"
        onLoad={(e) => {
          setLoading(false);
        }}
      />
    </div>
  );
});

export default Pdfview;
