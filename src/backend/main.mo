import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Service = {
    id : Nat;
    name : Text;
    description : Text;
    pricePerVisit : Nat;
  };

  type BookingRequest = {
    id : Nat;
    serviceId : Nat;
    user : Principal;
    address : Text;
    requestedDate : Text;
    status : Text;
  };

  module Service {
    public func compare(s1 : Service, s2 : Service) : Order.Order {
      Nat.compare(s1.id, s2.id);
    };
  };

  module BookingRequest {
    public func compare(b1 : BookingRequest, b2 : BookingRequest) : Order.Order {
      Nat.compare(b1.id, b2.id);
    };
  };

  let services = Map.empty<Nat, Service>();
  let bookings = Map.empty<Nat, BookingRequest>();

  var nextServiceId = 1;
  var nextBookingId = 1;

  public shared ({ caller }) func addService(name : Text, description : Text, pricePerVisit : Nat) : async () {
    let service : Service = {
      id = nextServiceId;
      name;
      description;
      pricePerVisit;
    };
    services.add(nextServiceId, service);
    nextServiceId += 1;
  };

  public query ({ caller }) func getServices() : async [Service] {
    services.values().toArray().sort();
  };

  public query ({ caller }) func getService(serviceId : Nat) : async Service {
    switch (services.get(serviceId)) {
      case (null) { Runtime.trap("Service not found") };
      case (?service) { service };
    };
  };

  public shared ({ caller }) func requestBooking(serviceId : Nat, address : Text, requestedDate : Text) : async () {
    if (not services.containsKey(serviceId)) {
      Runtime.trap("Service does not exist");
    };

    let bookingRequest : BookingRequest = {
      id = nextBookingId;
      serviceId;
      user = caller;
      address;
      requestedDate;
      status = "Pending";
    };
    bookings.add(nextBookingId, bookingRequest);
    nextBookingId += 1;
  };

  public query ({ caller }) func getUserBookings(user : Principal) : async [BookingRequest] {
    bookings.values().toArray().filter(func(b) { b.user == user }).sort();
  };

  public query ({ caller }) func getAllBookings() : async [BookingRequest] {
    bookings.values().toArray().sort();
  };
};
