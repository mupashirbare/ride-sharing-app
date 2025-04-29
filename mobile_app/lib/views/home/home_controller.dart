// lib/controllers/home_controller.dart
import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';

class HomeController extends GetxController {
  GoogleMapController? mapController;

  final Rx<LatLng?> pickupPosition = Rx<LatLng?>(null);
  final Rx<LatLng?> destinationPosition = Rx<LatLng?>(null);

  final RxString pickupAddress = ''.obs;
  final RxString destinationAddress = ''.obs;

  final RxSet<Marker> markers = <Marker>{}.obs;
  final RxSet<Polyline> polylines = <Polyline>{}.obs;

  final TextEditingController destinationController = TextEditingController();

  final RxDouble estimatedFare = 0.0.obs;
  final RxDouble estimatedDistance = 0.0.obs;

  static const String _googleApiKey = 'YOUR_GOOGLE_API_KEY'; // Replace this

  @override
  void onInit() {
    super.onInit();
    getCurrentLocation();
  }

  Future<void> getCurrentLocation() async {
    try {
      Position position = await Geolocator.getCurrentPosition();
      pickupPosition.value = LatLng(position.latitude, position.longitude);
      pickupAddress.value = "Current Location";

      markers.add(
        Marker(
          markerId: const MarkerId('pickup'),
          position: pickupPosition.value!,
          icon: BitmapDescriptor.defaultMarkerWithHue(
            BitmapDescriptor.hueGreen,
          ),
        ),
      );

      mapController?.animateCamera(
        CameraUpdate.newCameraPosition(
          CameraPosition(target: pickupPosition.value!, zoom: 15),
        ),
      );
    } catch (e) {
      print('Error getting location: $e');
    }
  }

  void updateDestination(String value) async {
    if (value.isEmpty) return;

    try {
      List<String> parts = value.split(',');
      double lat = double.parse(parts[0].trim());
      double lng = double.parse(parts[1].trim());

      destinationPosition.value = LatLng(lat, lng);
      destinationAddress.value = "Destination Selected";

      markers.add(
        Marker(
          markerId: const MarkerId('destination'),
          position: destinationPosition.value!,
          icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
        ),
      );

      await getRoute();
    } catch (e) {
      Get.snackbar(
        'Error',
        'Please enter coordinates like: latitude,longitude',
      );
    }
  }

  Future<void> getRoute() async {
    if (pickupPosition.value == null || destinationPosition.value == null)
      return;

    PolylinePoints polylinePoints = PolylinePoints();
    PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
      request: PolylineRequest(
        origin: PointLatLng(
          pickupPosition.value!.latitude,
          pickupPosition.value!.longitude,
        ),
        destination: PointLatLng(
          destinationPosition.value!.latitude,
          destinationPosition.value!.longitude,
        ),
        mode: TravelMode.driving,
      ),
    );

    if (result.points.isNotEmpty) {
      List<LatLng> polylineCoordinates =
          result.points
              .map((point) => LatLng(point.latitude, point.longitude))
              .toList();

      polylines.clear();
      polylines.add(
        Polyline(
          polylineId: const PolylineId('route'),
          points: polylineCoordinates,
          width: 5,
          color: Colors.green,
        ),
      );

      double distance = _calculateTotalDistance(polylineCoordinates);
      estimatedDistance.value = distance;
      estimatedFare.value = 2 + (distance * 0.5);
    }
  }

  double _calculateTotalDistance(List<LatLng> points) {
    double totalDistance = 0.0;
    for (int i = 0; i < points.length - 1; i++) {
      totalDistance += _coordinateDistance(
        points[i].latitude,
        points[i].longitude,
        points[i + 1].latitude,
        points[i + 1].longitude,
      );
    }
    return totalDistance;
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
        math.cos((lat2 - lat1) * p) / 2 +
        math.cos(lat1 * p) *
            math.cos(lat2 * p) *
            (1 - math.cos((lon2 - lon1) * p)) /
            2;
    return 12742 * math.asin(math.sqrt(a)); // Distance in KM
  }
}
