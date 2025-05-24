import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'dart:async';

import 'package:mobile_app/driver/end_trip.dart';

class StartTripScreen extends StatefulWidget {
  const StartTripScreen({Key? key}) : super(key: key);

  @override
  State<StartTripScreen> createState() => _StartTripScreenState();
}

class _StartTripScreenState extends State<StartTripScreen> {
  final Completer<GoogleMapController> _controller = Completer();

  // Sample coordinates for Mogadishu area
  static const LatLng _pickupLocation = LatLng(2.0469, 45.3182);
  static const LatLng _dropoffLocation = LatLng(2.0550, 45.3250);
  static const LatLng _center = LatLng(2.0510, 45.3215);

  final Set<Marker> _markers = {};
  final Set<Polyline> _polylines = {};

  late BitmapDescriptor _carIcon;

  @override
  void initState() {
    super.initState();
    // _setMarkersAndRoute();
    // _addNearbyVehicles();
    _setPolylines();
    _loadCustomMarker();
  }

  // void _setMarkersAndRoute() {
  //   // Pickup marker
  //   _markers.add(
  //     Marker(
  //       markerId: const MarkerId('pickup'),
  //       position: _pickupLocation,
  //       icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueBlue),
  //       infoWindow: const InfoWindow(title: 'Pickup Location'),
  //     ),
  //   );
  //
  //   // Dropoff marker
  //   _markers.add(
  //     Marker(
  //       markerId: const MarkerId('dropoff'),
  //       position: _dropoffLocation,
  //       icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen),
  //       infoWindow: const InfoWindow(title: 'Dropoff Location'),
  //     ),
  //   );


  void _loadCustomMarker() async {
    _carIcon = await BitmapDescriptor.fromAssetImage(
      const ImageConfiguration(size: Size(10, 10)), // adjust size if needed
      'image/car-3.png',
    );

    setState(() {
      _markers.add(
        Marker(
          markerId: const MarkerId('pickup'),
          position: _pickupLocation,
          icon: _carIcon,
          infoWindow: const InfoWindow(title: 'Pickup Location'),
        ),
      );

      _markers.add(
        Marker(
          markerId: const MarkerId('dropoff'),
          position: _dropoffLocation,
          icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
          infoWindow: const InfoWindow(title: 'Dropoff Location'),
        ),
      );
    });

    void _addNearbyVehicles() {
      // Add nearby vehicle markers
      final List<LatLng> vehicleLocations = [
        LatLng(2.0450, 45.3150),
        LatLng(2.0480, 45.3200),
        LatLng(2.0520, 45.3180),
        LatLng(2.0560, 45.3220),
        LatLng(2.0490, 45.3240),
      ];

      for (int i = 0; i < vehicleLocations.length; i++) {
        _markers.add(
          Marker(
            markerId: MarkerId('vehicle_$i'),
            position: vehicleLocations[i],
            icon: _carIcon,
            infoWindow: InfoWindow(title: 'Vehicle ${i + 1}'),
          ),
        );
      }
    }
  }
    // Route polyline
  void _setPolylines() {
    _polylines.add(
      Polyline(
        polylineId: const PolylineId('route'),
        points: [
          _pickupLocation,
          LatLng(2.0500, 45.3200),
          LatLng(2.0530, 45.3230),
          _dropoffLocation,
        ],
        color: Colors.blue,
        width: 4,
      ),
    );
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Google Map
          GoogleMap(
            initialCameraPosition: const CameraPosition(
              target: _center,
              zoom: 14,
            ),
            markers: _markers,
            polylines: _polylines,
            myLocationEnabled: true,
            myLocationButtonEnabled: false,
            zoomControlsEnabled: false,
            mapType: MapType.normal,
            onMapCreated: (GoogleMapController controller) {
              _controller.complete(controller);
            },
          ),

          // Bottom Panel
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    blurRadius: 10,
                    offset: const Offset(0, -5),
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Pickup Location
                  Row(
                    children: [
                      Container(
                        width: 10,
                        height: 10,
                        decoration: const BoxDecoration(
                          color: Colors.green,
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 16),
                      const Expanded(
                        child: Text(
                          'Howiwadaag street 5',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 16),

                  // Dropoff Location
                  Row(
                    children: [
                      const Icon(
                        Icons.location_on,
                        size: 16,
                        color: Colors.green,
                      ),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Text(
                          'Jamhuuriya University',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                      // Call Button
                      GestureDetector(
                        onTap: () {
                          // Handle call action
                        },
                        child: Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: Colors.black,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Icon(
                            Icons.phone,
                            color: Colors.white,
                            size: 20,
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 20),

                  // Start Trip Button
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {
                        // Handle start trip
                        _startTrip();
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF00C853),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        elevation: 2,
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Text(
                            'Start Trip',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          SizedBox(width: 8),
                          Icon(
                            Icons.arrow_forward,
                            size: 20,
                          ),
                        ],
                      ),
                    ),
                  ),

                  // Safe area padding for bottom
                  SizedBox(height: MediaQuery.of(context).padding.bottom),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _startTrip() {
    // Show confirmation dialog or navigate to trip in progress screen
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Start Trip'),
          content: const Text('Are you ready to start the trip?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
                // Navigate to trip in progress screen
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Trip started!'),
                    backgroundColor: Colors.green,
                  ),
                );
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const EndTripScreen()),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF00C853),
              ),
              child: const Text('Start'),
            ),
          ],
        );
      },
    );
  }
}