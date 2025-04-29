import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart' as loc;
import 'package:geocoding/geocoding.dart';

class HomeController extends GetxController {
  // Map Controller
  late GoogleMapController mapController;

  // Default location (can be set to your city's coordinates)
  final LatLng defaultLocation = const LatLng(52.5200, 13.4050); // Berlin coordinates
  final double defaultZoom = 15.0;

  // Observables
  final currentLocation = Rxn<LatLng>();
  final currentAddress = 'Getting location...'.obs;
  final selectedNavIndex = 0.obs;
  final markers = <Marker>{}.obs;
  
  // Location service
  final loc.Location location = loc.Location();
  
  @override
  void onInit() {
    super.onInit();
    _initializeLocation();
  }

  @override
  void onClose() {
    mapController.dispose();
    super.onClose();
  }

  // Initialize location services
  Future<void> _initializeLocation() async {
    bool serviceEnabled;
    loc.PermissionStatus permissionGranted;

    // Check if location services are enabled
    serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await location.requestService();
      if (!serviceEnabled) return;
    }

    // Check location permissions
    permissionGranted = await location.hasPermission();
    if (permissionGranted == loc.PermissionStatus.denied) {
      permissionGranted = await location.requestPermission();
      if (permissionGranted != loc.PermissionStatus.granted) return;
    }

    // Get current location
    getCurrentLocation();

    // Listen to location changes
    location.onLocationChanged.listen((loc.LocationData locationData) {
      if (locationData.latitude != null && locationData.longitude != null) {
        currentLocation.value = LatLng(
          locationData.latitude!,
          locationData.longitude!,
        );
        _updateAddress(currentLocation.value!);
      }
    });
  }

  // Get current location
  Future<void> getCurrentLocation() async {
    try {
      final loc.LocationData locationData = await location.getLocation();
      if (locationData.latitude != null && locationData.longitude != null) {
        currentLocation.value = LatLng(
          locationData.latitude!,
          locationData.longitude!,
        );
        
        // Animate camera to current location
        mapController.animateCamera(
          CameraUpdate.newCameraPosition(
            CameraPosition(
              target: currentLocation.value!,
              zoom: defaultZoom,
            ),
          ),
        );

        // Update address
        _updateAddress(currentLocation.value!);
      }
    } catch (e) {
      Get.snackbar(
        'Error',
        'Could not get current location',
        snackPosition: SnackPosition.BOTTOM,
      );
    }
  }

  // Update address based on coordinates
  Future<void> _updateAddress(LatLng position) async {
    try {
      List<Placemark> placemarks = await placemarkFromCoordinates(
        position.latitude,
        position.longitude,
      );

      if (placemarks.isNotEmpty) {
        Placemark place = placemarks[0];
        currentAddress.value = '${place.street}, ${place.locality}';
      }
    } catch (e) {
      currentAddress.value = 'Address not found';
    }
  }

  // Navigation functions
  void changeNavIndex(int index) {
    selectedNavIndex.value = index;
    // Add navigation logic here
  }

  // UI interaction functions
  void onMenuTap() {
    // Implement menu open logic
    Get.snackbar(
      'Menu',
      'Menu tapped',
      snackPosition: SnackPosition.BOTTOM,
    );
  }

  void onNotificationsTap() {
    // Implement notifications logic
    Get.snackbar(
      'Notifications',
      'Notifications tapped',
      snackPosition: SnackPosition.BOTTOM,
    );
  }

  void onSearchTap() {
    // Implement search logic
    Get.snackbar(
      'Search',
      'Search tapped',
      snackPosition: SnackPosition.BOTTOM,
    );
  }
} 