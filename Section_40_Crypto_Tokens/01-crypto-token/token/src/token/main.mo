import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Bool "mo:base/Bool";
import Iter "mo:base/Iter";

actor Token {
    var owner : Principal = Principal.fromText("bvk24-67kq6-mq3vv-gptjn-g5low-pggce-joirf-gi2un-lt4yk-j2xe3-jae");
    var totalSuply : Nat = 1000000000;
    var symbol : Text = "COMU";

    stable var balanceEntries : [(Principal, Nat)] = [];

    // creates a hash map to store the users and their amount
    // To crate the hash 3 arguments are needed: the initial size, function to check the key equality, function to hash a given value to a key
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    public query func balanceOf(id : Principal) : async Nat {
        let balance : Nat = switch (balances.get(id)) {
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getCoinSymbol() : async Text {
        return symbol;
    };

    // the shared clause indicated that when a clent calls this function, it's id will be passed in msg variable
    public shared (msg) func payOut() : async Text {
        let value = 10000;
        let text = await transfer(msg.caller, value);
        balances.put(msg.caller, value);
        return text;
    };

    public shared (msg) func canRequest() : async Bool {
        if (balances.get(msg.caller) == null) {
            return true;
        };
        return false;
    };

    public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
        if (balances.get(msg.caller) == null) {
            return "Users don't exist";
        };

        if (balances.get(to) == null) {
            return "Users don't exist";
        };

        let fromBalance = await balanceOf(msg.caller);
        if (fromBalance < amount) {
            return "Insufficient Founds";
        };

        let newFromBalance : Nat = fromBalance - amount;
        balances.put(msg.caller, newFromBalance);

        let toBalance = await balanceOf(to);
        let newToBalance : Nat = toBalance + amount;
        balances.put(to, newToBalance);

        return "Success";
    };

    system func preupgrade() {
        // transforms the hash-map in a list of tuples
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        // transforms the list of tuples in a hash map
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if (balances.size() < 1) {
            // adds the owner to the balance ladger with the initial amount
            balances.put(owner, totalSuply);
        };
    };

};
