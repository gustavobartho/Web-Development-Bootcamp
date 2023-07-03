import Principal "mo:base/Principal";

// Creating a actor as an class enables it to be instantiated on demand
actor class NFT(name : Text, owner : Principal, content : [Nat8]) = this {

    private let itemName = name;
    private var nftOwner = owner;
    private let imageBytes = content;

    // gets the NFT name
    public query func getName() : async Text {
        return itemName;
    };

    // gets the NFT owner id
    public query func getOwner() : async Principal {
        return nftOwner;
    };

    // gets the NFT image
    public query func getAsset() : async [Nat8] {
        return imageBytes;
    };

    // gets the NFT canister id
    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };

    // transfers an nft to a new owner
    public shared (msg) func transferOwnership(newOwner : Principal) : async Text {
        if (msg.caller == nftOwner) {
            nftOwner := newOwner;
            return "Success";
        } else {
            return "Error: Permission Denied";
        };
    }

};
