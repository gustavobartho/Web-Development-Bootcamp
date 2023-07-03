import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import NFTActorClass "../nft/nft";
import Iter "mo:base/Iter";
import Prelude "mo:base/Prelude";

actor OpenD {

    // custom type with a NFT selling info
    private type Listing = {
        itemOwner : Principal;
        itemPrice : Nat;
    };

    // Hash map of the NFTs with the NFT id as the key and the NFT canister object as the value
    var mapOfNFTs = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);

    // Hash of the owners wit hthe owner id as the key and the list of owned NFTs ids as value
    var mapOfOwners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);

    // Hash of the NFTs listed to be sold with the NFT id as the key and the seeling info class as the value
    var mapOfListings = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);

    // Add a new NFT
    public shared (msg) func mint(imgData : [Nat8], name : Text) : async Principal {
        // gets the caller id
        let owner : Principal = msg.caller;

        // Add cycles so the NFT canister can go live
        Cycles.add(100_500_000_000);
        // creates the new NFT canister object
        let newNFT = await NFTActorClass.NFT(name, owner, imgData);

        // Gets the newly created NFT canister ID
        let newNFTPrincipal = await newNFT.getCanisterId();

        // updates the map ov all registered NFTs
        mapOfNFTs.put(newNFTPrincipal, newNFT);
        // atribute the new NFT to the owners list
        addToOwnershipMap(owner, newNFTPrincipal);

        // returns the new NFT id
        return newNFTPrincipal;
    };

    // Add a given NFT to a given owner in the ownership HashMap
    private func addToOwnershipMap(owner : Principal, nftId : Principal) {
        // checks if the owner exists in the owned NFTs HashMap
        var ownedNFTs : List.List<Principal> = switch (mapOfOwners.get(owner)) {
            case null List.nil<Principal>();
            case (?result) result;
        };
        // add the new NFT to that owners list
        ownedNFTs := List.push(nftId, ownedNFTs);
        // updates the HashMap with the updated List
        mapOfOwners.put(owner, ownedNFTs);
    };

    // Gets the NFTs owned by a given owner
    public query func getOwnedNFTs(user : Principal) : async [Principal] {
        // check if the owner is registered and return their NFTs
        var userNFTs : List.List<Principal> = switch (mapOfOwners.get(user)) {
            case null List.nil<Principal>();
            case (?result) result;
        };

        // cast the List in to an array
        return List.toArray(userNFTs);
    };

    // gets the ids of the NFTs listed to be sold
    public query func getListedNFTs() : async [Principal] {
        // gets the list of ids in the letaed Hash
        let ids = Iter.toArray(mapOfListings.keys());

        return ids;
    };

    // Add an NFT to be selled in the market
    public shared (msg) func listItem(id : Principal, price : Nat) : async Text {
        // checks if the item exists and gets it
        var item : NFTActorClass.NFT = switch (mapOfNFTs.get(id)) {
            case null return "Error: Not Found";
            case (?result) result;
        };

        // get the real owner
        let owner = await item.getOwner();
        // check if the person calling the methos to sell the NFT is the owner
        if (Principal.equal(owner, msg.caller)) {
            let newListing : Listing = {
                itemOwner = owner;
                itemPrice = price;
            };
            // add the NFT to the selling list
            mapOfListings.put(id, newListing);
            return "Success";
        } else {
            return "Error: Permission Denied";
        };
    };

    // gets the canister id
    public query func getOpenDCanisterId() : async Principal {
        return Principal.fromActor(OpenD);
    };

    // checks if a given NFT is listed do sell
    public query func isListed(id : Principal) : async Bool {
        return mapOfListings.get(id) != null;
    };

    // gets the original owner of a listed NFT
    public query func getOriginalOwner(nftId : Principal) : async Principal {
        // checks if the NFT is listed nad get its owner id
        var listing : Listing = switch (mapOfListings.get(nftId)) {
            case null return Principal.fromText("");
            case (?result) result;
        };

        return listing.itemOwner;
    };

    // gets the selling price for a given NFT
    public query func getListedNFTPrice(nftId : Principal) : async Nat {
        // checks if the NFT is listed nad get its price
        var listing : Listing = switch (mapOfListings.get(nftId)) {
            case null return 0;
            case (?result) result;
        };

        return listing.itemPrice;
    };
};
