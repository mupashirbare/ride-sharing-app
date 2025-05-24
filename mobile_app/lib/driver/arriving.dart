import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'dart:async';

import 'package:mobile_app/driver/starting_trip.dart';


class Arriving extends StatefulWidget {
  const Arriving({super.key});

  @override
  State<Arriving> createState() => _MapScreenState();
}

class _MapScreenState extends State<Arriving> {
  final Completer<GoogleMapController> _controller = Completer();


  // Sample coordinates - these would be replaced with actual coordinates
  static const LatLng _pickupLocation = LatLng(2.03271, 45.30956); // KM4, Mogadishu
  static const LatLng _dropoffLocation = LatLng(2.03250, 45.30444); // Zoobe (KM5), Mogadishu
  static const LatLng _center = LatLng(2.03260, 45.30700); // Center point between KM4 and Zoobe


  final Set<Marker> _markers = {};
  final Set<Polyline> _polylines = {};

  late BitmapDescriptor _carIcon;

  @override
  void initState() {
    super.initState();
    // _setMarkers();
    _setPolylines();
    _loadCustomMarker();
  }



  // void _setMarkers() {
  //   _markers.add(
  //     Marker(
  //       markerId: const MarkerId('pickup'),
  //       position: _pickupLocation,
  //       icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen),
  //       infoWindow: const InfoWindow(title: 'Pickup Location'),
  //     ),
  //   );
  //
  //   _markers.add(
  //     Marker(
  //       markerId: const MarkerId('dropoff'),
  //       position: _dropoffLocation,
  //       icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
  //       infoWindow: const InfoWindow(title: 'Dropoff Location'),
  //     ),
  //   );
  // }

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
  }

  void _setPolylines() {
    _polylines.add(
      Polyline(
        polylineId: const PolylineId('route'),
        points: [_pickupLocation, _dropoffLocation],
        color: Colors.blue,
        width: 5,
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
              zoom: 15,
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
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
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
                      const Text(
                        'Km4, Mogadishu',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
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
                      const Text(
                        'Zoobe, Mogadishu',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const Spacer(),
                      // Call Button
                      Container(
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
                    ],
                  ),

                  const SizedBox(height: 16),

                  // Arrived Button
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => const StartTripScreen()),
                        );
                      },
                      icon: const Icon(Icons.directions_car),
                      label: const Text('Arrived'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF00C853),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}