// lib/views/home/home_screen.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../../controllers/home_controller.dart';

class HomeScreen extends GetView<HomeController> {
  const HomeScreen({super.key});

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
                    controller.pickupPosition.value ?? const LatLng(0.0, 0.0),
                zoom: 15,
              ),
              onMapCreated: (GoogleMapController mapController) {
                controller.mapController = mapController;
              },
              markers: controller.markers,
              polylines: controller.polylines,
              myLocationEnabled: true,
              myLocationButtonEnabled: false,
            ),

            // Pickup Address
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
                    const Icon(Icons.location_on, color: Colors.green),
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

            // Destination Input
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
                          controller.updateDestination(value);
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Fare Box
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

extension on HomeController {
  void updateDestination(String value) {}
}
