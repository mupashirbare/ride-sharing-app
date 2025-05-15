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

  final String openRouteApiKey =
      '5b3ce3597851110001cf6248df54332d06dd4da58c4ec72a71d2367c';

  @override
  void onInit() {
    super.onInit();
    getCurrentLocation();
  }

  Future<void> getCurrentLocation() async {
    try {
      Position position = await Geolocator.getCurrentPosition();
      LatLng currentLatLng = LatLng(position.latitude, position.longitude);
      pickupPosition.value = currentLatLng;
      getAddressFromLatLng(currentLatLng);

      markers.add(
        Marker(
          markerId: const MarkerId('pickup'),
          position: currentLatLng,
          icon: BitmapDescriptor.defaultMarkerWithHue(
            BitmapDescriptor.hueGreen,
          ),
        ),
      );

      mapController?.animateCamera(
        CameraUpdate.newLatLngZoom(currentLatLng, 15),
      );
    } catch (e) {
      Get.snackbar('Location Error', 'Failed to get your location');
    }
  }

  void getAddressFromLatLng(LatLng position) async {
    try {
      final url = Uri.parse(
        'https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.latitude}&lon=${position.longitude}',
      );
      final response = await http.get(
        url,
        headers: {'User-Agent': 'safarx-app/1.0'},
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        pickupAddress.value = data['display_name'] ?? 'You are here';
      } else {
        pickupAddress.value = 'You are here';
      }
    } catch (_) {
      pickupAddress.value = 'You are here';
    }
  }

  void setDestinationFromPlace(String label, LatLng position) {
    destinationPosition.value = position;
    destinationAddress.value = label;
    destinationController.text = label;

    markers.add(
      Marker(
        markerId: const MarkerId('destination'),
        position: position,
        icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
      ),
    );

    getRoute();
  }

  Future<void> getRoute() async {
    if (pickupPosition.value == null || destinationPosition.value == null) {
      return;
    }

    final url = Uri.parse(
      'https://api.openrouteservice.org/v2/directions/driving-car',
    );
    final headers = {
      'Authorization': openRouteApiKey,
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

    final response = await http.post(url, headers: headers, body: body);

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final geometry = data['features'][0]['geometry']['coordinates'] as List;
      final polylineCoords = geometry.map((c) => LatLng(c[1], c[0])).toList();

      polylines.clear();
      polylines.add(
        Polyline(
          polylineId: const PolylineId('route'),
          color: Colors.green,
          width: 5,
          points: polylineCoords,
        ),
      );

      final distanceMeters =
          data['features'][0]['properties']['summary']['distance'];
      final distanceKm = (distanceMeters as num) / 1000.0;
      estimatedDistance.value = distanceKm.toDouble();
      estimatedFare.value = 2 + (distanceKm * 0.5);
    } else {
      Get.snackbar('Route Error', 'Unable to generate route.');
    }
  }

  void changeTabIndex(int index) {
    currentTabIndex.value = index;
  }

  void sendPickupRequest() {
    Get.snackbar("Ride Requested", "Looking for nearby drivers...");
  }
}
