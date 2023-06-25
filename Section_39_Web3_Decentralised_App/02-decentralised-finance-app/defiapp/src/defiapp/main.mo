// imports libraries
import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

// actor - class to hold the canister
actor DeFiApp {
  // variable with current ammount of money
  // stable - indicated the variable should persist over deploys
  stable var currentValue : Float = 300;

  // Gets the current time in nanoseconds since 1/1/1970
  stable var startTime = Time.now();

  // := is used to atribute a new value to a variable inside the canister
  //currentValue := 100;

  // let is for constants (like const in JS)
  let id = 2837283782372837;

  // Debug.print print data in terminal
  // debug_show - transform number to text
  //Debug.print(debug_show (id));

  // func - for defining a private function
  public func deposit(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  // CHALLENGE: Allow users to withdraw an amount from the currentValue
  // decrease  currentValue by the amount
  public func withdraw(amount : Float) {
    // add type so it doesn't have to infer type an cause warning
    let finalValue : Float = currentValue - amount;
    if (finalValue >= 0) {
      currentValue -= amount;
    } else {
      Debug.print("Amount too large!");
    };
  };

  // query - specifies that the function is a query (don't change canister variables just read them - is much faster then update methods)
  // every tyme a function return an output it maus run assynchronouslly
  public query func checkBalance() : async Float {
    return currentValue;
  };

  public func compound() {
    // gets elapsed time in seconds
    let currentTime = Time.now();
    let timeDeltaS = (currentTime - startTime) / (10 ** 9);
    currentValue := currentValue * (1.01 ** Float.fromInt(timeDeltaS));
    startTime := currentTime;
  };

};
