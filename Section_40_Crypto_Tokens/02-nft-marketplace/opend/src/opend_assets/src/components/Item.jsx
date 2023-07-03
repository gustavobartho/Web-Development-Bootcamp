import React, { useEffect, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import Button from "./Button";
import { opend } from "../../../declarations/opend";
import Loader from "./Loader";
import CURRENT_USER_ID from "../index";
import PriceLabel from "./PriceLabel";

function Item(props) {
  const { id, role } = props;

  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [listed, setListed] = useState(false);
  const [priceLabel, setPriceLabel] = useState();

  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({ host: localHost });

  // to run it locally this line is required, if deployed to the live IC then it can be removed
  agent.fetchRootKey();

  let NFTActor;

  const loadNFT = async () => {
    NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id
    });

    setName(await NFTActor.getName());
    setUserId((await NFTActor.getOwner()).toText());

    const imageData = new Uint8Array(await NFTActor.getAsset())
    const image = URL.createObjectURL(new Blob([imageData.buffer, { type: "image/png" }]));
    setImageURL(image);

    switch (role) {
      case "collection":
        handleCollection();
        break;
      case "discover":
        handleDiscover();
        break;
      default:
        break;
    }
  };

  const handleCollection = async () => {
    if (await opend.isListed(id)) {
      setUserId("OpenD");
      setBlur({ filter: "blur(4px)" });
      setListed(true);
    } else {
      setButton(<Button handleClick={handleSell} text="Sell" />);
    }
  };

  const handleDiscover = async () => {
    const originalOwner = await opend.getOriginalOwner(id);
    if (originalOwner.toText() != CURRENT_USER_ID.toText()) {
      setButton(<Button handleClick={handleBuy} text="Buy" />);
    }

    const price = await opend.getListedNFTPrice(id);
    setPriceLabel(<PriceLabel sellPrice={price.toString()} />);
  };

  let price;
  const handleSell = () => {
    setPriceInput(<input
      placeholder="Price in DANG"
      type="number"
      className="price-input"
      value={price}
      onChange={(e) => (price = e.target.value)}
    />);
    setButton(<Button handleClick={sellItem} text="Confirm" />);
  };

  const sellItem = async () => {
    setLoaderHidden(false);
    setBlur({ filter: "blur(4px)" });
    const listingResult = await opend.listItem(id, Number(price));
    if (listingResult === "Success") {
      const openDId = await opend.getOpenDCanisterId();
      const transferResult = await NFTActor.transferOwnership(openDId);
      setButton();
      setPriceInput();
      setBlur();
      setUserId("OpenD");
      setListed(true)
    }
    setLoaderHidden(true);
  };

  const handleBuy = async () => {

  }

  useEffect(() => {
    loadNFT();
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">

        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={imageURL}
          style={blur}
        />

        <Loader hidden={loaderHidden} />

        <div className="disCardContent-root">
          {priceLabel}
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<br />{listed && <span className="purple-text">Listed</span>}
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {userId}
          </p>
          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
