import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../../controllers/home_controller.dart';

class HomeScreen extends GetView<HomeController> {
  const HomeScreen({super.key});

  LatLng _parseLatLng(String input) {
    try {
      final parts = input.split(',');
      final lat = double.parse(parts[0].trim());
      final lng = double.parse(parts[1].trim());
      return LatLng(lat, lng);
    } catch (e) {
      return const LatLng(2.0469, 45.3182); // Default: Mogadishu
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Obx(
        () => Stack(
          children: [
            // Google Map
            GoogleMap(
              initialCameraPosition: CameraPosition(
                target:
                    controller.pickupPosition.value ??
                    const LatLng(2.0469, 45.3182),
                zoom: 15,
              ),
              onMapCreated: (GoogleMapController mapController) {
                controller.mapController = mapController;
              },
              markers: controller.markers,
              polylines: controller.polylines,
              myLocationEnabled: true,
              myLocationButtonEnabled: false,
              zoomControlsEnabled: false,
            ),

            // Current location info
            Positioned(
              top: 60,
              left: 20,
              right: 20,
              child: Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 5)],
                ),
                child: Row(
                  children: [
                    const Icon(Icons.my_location, color: Colors.green),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        controller.pickupAddress.value.isNotEmpty
                            ? controller.pickupAddress.value
                            : 'Locating you...',
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Destination input
            Positioned(
              bottom: 20,
              left: 20,
              right: 20,
              child: Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 14,
                ),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 5)],
                ),
                child: Row(
                  children: [
                    const Icon(Icons.search, color: Colors.green),
                    const SizedBox(width: 10),
                    Expanded(
                      child: TextField(
                        controller: controller.destinationController,
                        decoration: const InputDecoration(
                          hintText: 'Where are you going? (lat,lng)',
                          border: InputBorder.none,
                        ),
                        onSubmitted: (value) {
                          final LatLng dest = _parseLatLng(value);
                          controller.setDestinationFromPlace('Custom', dest);
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Fare info box
            if (controller.estimatedFare.value > 0)
              Positioned(
                bottom: 100,
                left: 20,
                right: 20,
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.green.shade700,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    'Estimated Fare: \$${controller.estimatedFare.value.toStringAsFixed(2)}',
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
