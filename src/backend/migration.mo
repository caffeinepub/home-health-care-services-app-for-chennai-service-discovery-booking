import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  type Service = {
    id : Nat;
    name : Text;
    description : Text;
    pricePerVisit : Nat;
  };

  type BookingRequest = {
    id : Nat;
    serviceId : Nat;
    user : Principal.Principal;
    address : Text;
    requestedDate : Text;
    status : Text;
  };

  type OldActor = {
    services : Map.Map<Nat, Service>;
    bookings : Map.Map<Nat, BookingRequest>;
    nextServiceId : Nat;
    nextBookingId : Nat;
  };

  type NewActor = OldActor;

  public func run(old : OldActor) : NewActor {
    let cancerCareService : Service = {
      id = 3;
      name = "Cancer Care";
      description = "Comprehensive cancer care support package";
      pricePerVisit = 1500;
    };

    old.services.add(3, cancerCareService);
    { old with nextServiceId = 4 };
  };
};
