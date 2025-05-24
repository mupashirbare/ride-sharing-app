import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;
import '../../controllers/home_controller.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final HomeController controller = Get.find<HomeController>();

  @override
  void initState() {
    super.initState();
    getCurrentLocationAndAddress();
  }

  Future<void> getCurrentLocationAndAddress() async {
    try {
      final position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );

      controller.pickupPosition.value = LatLng(
        position.latitude,
        position.longitude,
      );

      final uri = Uri.parse(
        'https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.latitude}&lon=${position.longitude}',
      );

      final response = await http.get(
        uri,
        headers: {'User-Agent': 'safarx-app/1.0'},
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final address = data['address'];
        controller.pickupAddress.value =
            address['neighbourhood'] ??
            address['suburb'] ??
            address['city_district'] ??
            address['village'] ??
            address['town'] ??
            address['county'] ??
            'Unknown Location';
      } else {
        controller.pickupAddress.value = 'Unable to get location';
      }

      controller.markers.add(
        Marker(
          markerId: const MarkerId('pickup'),
          position: controller.pickupPosition.value!,
          icon: BitmapDescriptor.defaultMarkerWithHue(
            BitmapDescriptor.hueGreen,
          ),
        ),
      );
    } catch (e) {
      controller.pickupAddress.value = 'Location error';
      print('Error getting location: $e');
    }
  }

  void _onTabTapped(int index) {
    controller.currentTabIndex.value = index;
    switch (index) {
      case 0:
        Get.offNamedUntil('/home', (route) => false);
        break;
      case 1:
        Get.toNamed('/ride-history');
        break;
      case 2:
        Get.toNamed('/profile');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: Drawer(
        child: Container(
          color: Colors.white,
          child: ListView(
            padding: EdgeInsets.zero,
            children: const [
              DrawerHeader(
                decoration: BoxDecoration(color: Colors.white),
                child: Text(
                  'User',
                  style: TextStyle(color: Colors.black, fontSize: 24),
                ),
              ),
              ListTile(leading: Icon(Icons.person), title: Text('Profile')),
              ListTile(
                leading: Icon(Icons.history),
                title: Text('Ride History'),
              ),
              ListTile(
                leading: Icon(Icons.notifications_none),
                title: Text('Notification'),
              ),
              ListTile(leading: Icon(Icons.help_outline), title: Text('Help')),
              Divider(),
              ListTile(leading: Icon(Icons.settings), title: Text('Settings')),
              ListTile(leading: Icon(Icons.logout), title: Text('Logout')),
            ],
          ),
        ),
      ),
      body: Obx(
        () => Stack(
          children: [
            GoogleMap(
              initialCameraPosition: CameraPosition(
                target:
                    controller.pickupPosition.value ??
                    const LatLng(2.0469, 45.3182),
                zoom: 15,
              ),
              onMapCreated:
                  (mapController) => controller.mapController = mapController,
              myLocationEnabled: true,
              myLocationButtonEnabled: true,
              markers: controller.markers.toSet(),
            ),
            Positioned(
              top: 40,
              left: 20,
              right: 20,
              child: Row(
                children: [
                  Container(
                    decoration: const BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(color: Colors.black26, blurRadius: 4),
                      ],
                    ),
                    child: Builder(
                      builder:
                          (context) => IconButton(
                            icon: const Icon(Icons.menu, color: Colors.green),
                            onPressed: () => Scaffold.of(context).openDrawer(),
                          ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 10,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(30),
                        boxShadow: [
                          BoxShadow(color: Colors.black12, blurRadius: 5),
                        ],
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.location_pin, color: Colors.green),
                          const SizedBox(width: 6),
                          Expanded(
                            child: Text(
                              controller.pickupAddress.value,
                              textAlign: TextAlign.center,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: Container(
                padding: const EdgeInsets.fromLTRB(20, 12, 20, 10),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                  boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 10)],
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      width: 40,
                      height: 4,
                      margin: const EdgeInsets.only(bottom: 12),
                      decoration: BoxDecoration(
                        color: Colors.grey[300],
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                    const Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        'Where are you going?',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    GestureDetector(
                      onTap: () => Get.toNamed('/destination'),
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 14,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(12),
                          boxShadow: const [
                            BoxShadow(color: Colors.black12, blurRadius: 4),
                          ],
                        ),
                        child: Row(
                          children: const [
                            Icon(Icons.search, color: Colors.green),
                            SizedBox(width: 10),
                            Text(
                              'Search destination',
                              style: TextStyle(
                                color: Colors.black54,
                                fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Obx(
                      () => BottomNavigationBar(
                        currentIndex: controller.currentTabIndex.value,
                        onTap: _onTabTapped,
                        selectedItemColor: Colors.green,
                        backgroundColor: Colors.white,
                        items: const [
                          BottomNavigationBarItem(
                            icon: Icon(Icons.home),
                            label: 'Home',
                          ),
                          BottomNavigationBarItem(
                            icon: Icon(Icons.history),
                            label: 'History',
                          ),
                          BottomNavigationBarItem(
                            icon: Icon(Icons.person),
                            label: 'Profile',
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
