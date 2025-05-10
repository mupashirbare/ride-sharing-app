// lib/controllers/home_controller.dart
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;

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

  final RxInt currentTabIndex = 0.obs;

  final String _apiKey =
      '5b3ce3597851110001cf6248df54332d06dd4da58c4ec72a71d2367c';

  @override
  void onInit() {
    super.onInit();
    getCurrentLocation();
  }

  Future<void> getCurrentLocation() async {
    try {
      final position = await Geolocator.getCurrentPosition();
      pickupPosition.value = LatLng(position.latitude, position.longitude);
      pickupAddress.value = "You are here";

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
      print('Error: $e');
    }
  }

  void setDestinationFromPlace(String label, LatLng location) {
    destinationPosition.value = location;
    destinationAddress.value = label;

    markers.add(
      Marker(
        markerId: const MarkerId('destination'),
        position: location,
        icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
      ),
    );

    getRoute();
  }

  Future<void> getRoute() async {
    if (pickupPosition.value == null || destinationPosition.value == null)
      return;

    final url = Uri.parse(
      'https://api.openrouteservice.org/v2/directions/driving-car',
    );
    final headers = {
      'Authorization': _apiKey,
      'Content-Type': 'application/json',
    };
    final body = jsonEncode({
      'coordinates': [
        [pickupPosition.value!.longitude, pickupPosition.value!.latitude],
        [
          destinationPosition.value!.longitude,
          destinationPosition.value!.latitude,
        ],
      ],
    });

    try {
      final response = await http.post(url, headers: headers, body: body);
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final coords = data['features'][0]['geometry']['coordinates'] as List;
        final points = coords.map((c) => LatLng(c[1], c[0])).toList();

        polylines.clear();
        polylines.add(
          Polyline(
            polylineId: const PolylineId('route'),
            points: points,
            color: Colors.green,
            width: 5,
          ),
        );

        final distMeters =
            data['features'][0]['properties']['summary']['distance'];
        final distanceKm = (distMeters as num) / 1000.0;
        estimatedDistance.value = distanceKm;
        estimatedFare.value = 2 + (distanceKm * 0.5);
      } else {
        Get.snackbar(
          'Error',
          'Could not fetch route. Check OpenRouteService key or locations.',
        );
      }
    } catch (e) {
      print('Route Error: $e');
      Get.snackbar('Error', 'Failed to fetch route');
    }
  }

  void changeTabIndex(int index) {
    currentTabIndex.value = index;
  }

  void sendPickupRequest() {
    Get.snackbar("Ride Requested", "Searching for drivers...");
  }
}
