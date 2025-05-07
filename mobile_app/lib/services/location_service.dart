import 'dart:math';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'dart:async';
import 'package:get/get.dart';

class LocationService extends GetxService {
  static LocationService get instance => Get.find<LocationService>();

  final Location _location = Location();
  final RxBool _serviceEnabled = false.obs;
  final Rx<PermissionStatus> _permissionGranted = Rx<PermissionStatus>(
    PermissionStatus.denied,
  );
  final Rx<LocationData?> currentLocation = Rx<LocationData?>(null);

  // Route tracking
  final RxList<LatLng> routePoints = <LatLng>[].obs;
  final RxDouble distance = 0.0.obs;
  final RxDouble estimatedFare = 0.0.obs;
  final RxBool isCalculatingRoute = false.obs;
  final RxString errorMessage = ''.obs;

  // Fare calculation
  final double baseFare = 2.0;
  final double perKilometerRate = 0.5;
  final double perMinuteRate = 0.2;

  static const String _apiKey =
      'YOUR_API_KEY_HERE'; // <<--- insert your real API key here

  @override
  void onInit() {
    super.onInit();
    initialize();
  }

  Future<bool> initialize() async {
    try {
      _serviceEnabled.value = await _location.serviceEnabled();
      if (!_serviceEnabled.value) {
        _serviceEnabled.value = await _location.requestService();
        if (!_serviceEnabled.value) {
          errorMessage.value = 'Location services are disabled';
          return false;
        }
      }

      _permissionGranted.value = await _location.hasPermission();
      if (_permissionGranted.value == PermissionStatus.denied) {
        _permissionGranted.value = await _location.requestPermission();
        if (_permissionGranted.value != PermissionStatus.granted) {
          errorMessage.value = 'Location permissions are denied';
          return false;
        }
      }

      await _location.changeSettings(
        accuracy: LocationAccuracy.high,
        interval: 1000,
        distanceFilter: 10,
      );

      _location.onLocationChanged.listen(
        (LocationData locationData) {
          currentLocation.value = locationData;
        },
        onError: (e) {
          errorMessage.value = 'Error getting location updates: $e';
        },
      );

      return true;
    } catch (e) {
      errorMessage.value = 'Location service initialization error: $e';
      return false;
    }
  }

  Future<void> calculateRoute(LatLng origin, LatLng destination) async {
    try {
      isCalculatingRoute.value = true;
      errorMessage.value = '';

      PolylinePoints polylinePoints = PolylinePoints();

      // Build the PolylineRequest object
      PolylineRequest polylineRequest = PolylineRequest(
        origin: PointLatLng(origin.latitude, origin.longitude),
        destination: PointLatLng(destination.latitude, destination.longitude),
        mode:
            TravelMode
                .driving, // <--- NOTE: It's called mode not travelMode anymore
      );

      // Now call getRouteBetweenCoordinates with the request
      PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
        googleApiKey: _apiKey,
        request: polylineRequest,
      );

      if (result.points.isNotEmpty) {
        routePoints.value =
            result.points
                .map((point) => LatLng(point.latitude, point.longitude))
                .toList();

        double totalDistance = calculateDistance(routePoints);
        distance.value = totalDistance;

        double estimatedTime = totalDistance / 30 * 60; // Average 30 km/h
        estimatedFare.value = calculateFare(totalDistance, estimatedTime);
      } else {
        errorMessage.value = 'No route found: ${result.errorMessage}';
      }
    } catch (e) {
      errorMessage.value = 'Route calculation error: $e';
    } finally {
      isCalculatingRoute.value = false;
    }
  }

  double calculateDistance(List<LatLng> points) {
    double totalDistance = 0;
    for (var i = 0; i < points.length - 1; i++) {
      totalDistance += _coordinateDistance(
        points[i].latitude,
        points[i].longitude,
        points[i + 1].latitude,
        points[i + 1].longitude,
      );
    }
    return totalDistance;
  }

  double calculateFare(double distanceInKm, double timeInMinutes) {
    return baseFare +
        (distanceInKm * perKilometerRate) +
        (timeInMinutes * perMinuteRate);
  }

  double _coordinateDistance(
    double lat1,
    double lon1,
    double lat2,
    double lon2,
  ) {
    const double p = 0.017453292519943295; // Math.PI / 180
    final double a =
        0.5 -
        cos((lat2 - lat1) * p) / 2 +
        cos(lat1 * p) * cos(lat2 * p) * (1 - cos((lon2 - lon1) * p)) / 2;
    return 12742 * asin(sqrt(a)); // 2 * R; R = 6371 km
  }

  Future<LatLng?> getCurrentLatLng() async {
    try {
      LocationData? location = currentLocation.value;
      if (location != null &&
          location.latitude != null &&
          location.longitude != null) {
        return LatLng(location.latitude!, location.longitude!);
      }
      return null;
    } catch (e) {
      errorMessage.value = 'Error getting current location: $e';
      return null;
    }
  }

  void clearRoute() {
    routePoints.clear();
    distance.value = 0.0;
    estimatedFare.value = 0.0;
    errorMessage.value = '';
  }

  @override
  void onClose() {
    clearRoute();
    super.onClose();
  }
}
