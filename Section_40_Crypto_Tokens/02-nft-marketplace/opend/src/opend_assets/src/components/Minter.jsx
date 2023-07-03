import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { opend } from "../../../declarations/opend";
import Item from "./Item";
import Loader from "./Loader";

function Minter() {
  // create form hook to interact with the form (instead of creating a state for each input)
  // register -> object to register and add in all of the inputs the user creates in the form
  // handleSubmit -> Function that will be called when the form is submitted
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [NFTPrincipal, setNFTPrincipal] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    let { name, image } = data;
    const imageByteData = [... new Uint8Array(await image[0].arrayBuffer())];

    const newFNTID = await opend.mint(imageByteData, name);
    setNFTPrincipal(newFNTID);
    setLoading(false);
  };

  if (NFTPrincipal !== "") return (
    <div className="minter-container">
      <h3 className="Typography-root makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
        Minted!
      </h3>
      <div className="horizontal-center">
        <Item id={NFTPrincipal.toText()} />
      </div>
    </div>
  );

  if (NFTPrincipal == "") return (
    <div className="minter-container">

      <Loader hidden={!loading} />

      <h3 className="makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
        Create NFT
      </h3>
      <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
        Upload Image
      </h6>
      <form className="makeStyles-form-109" noValidate="" autoComplete="off">
        <div className="upload-container">
          <input
            {...register("image", { required: true })}
            className="upload"
            type="file"
            accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
          />
        </div>
        <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
          Collection Name
        </h6>
        <div className="form-FormControl-root form-TextField-root form-FormControl-marginNormal form-FormControl-fullWidth">
          <div className="form-InputBase-root form-OutlinedInput-root form-InputBase-fullWidth form-InputBase-formControl">
            <input
              {...register("name", { required: true })}
              placeholder="e.g. CryptoDunks"
              type="text"
              className="form-InputBase-input form-OutlinedInput-input"
            />
            <fieldset className="PrivateNotchedOutline-root-60 form-OutlinedInput-notchedOutline"></fieldset>
          </div>
        </div>
        <div className="form-ButtonBase-root form-Chip-root makeStyles-chipBlue-108 form-Chip-clickable">
          <span onClick={loading ? null : handleSubmit(onSubmit)} className="form-Chip-label">Mint NFT</span>
        </div>
      </form>
    </div>
  );
}

export default Minter;
