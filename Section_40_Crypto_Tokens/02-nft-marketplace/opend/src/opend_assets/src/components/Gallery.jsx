import React, { useEffect, useState } from "react";
import Item from "./Item";
import { Principal } from "@dfinity/principal";

function Gallery(props) {
  const { title, ids, role } = props;

  const [items, setItems] = useState([]);

  const fetchNFTs = () => {
    if (ids != undefined) {
      setItems(ids.map(NFTId => (
        <Item id={NFTId} key={NFTId.toText()} role={role} />
      )));
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="gallery-view">
      <h3 className="makeStyles-title-99 Typography-h3">{title}</h3>
      <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
        <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
          <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center"></div>
          {items}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
