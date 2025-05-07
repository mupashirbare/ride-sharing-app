import 'dart:async';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import '../widgets/location_search_box.dart';
import '../widgets/ride_bottom_sheet.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final Completer<GoogleMapController> _controller = Completer();
  final Set<Marker> _markers = {};
  final Set<Polyline> _polylines = {};
  
  LatLng? _currentLocation;
  LatLng? _pickupLocation;
  LatLng? _destinationLocation;
  bool _isLoading = true;
  bool _showLocationList = false;

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    try {
      final position = await Geolocator.getCurrentPosition();
      setState(() {
        _currentLocation = LatLng(position.latitude, position.longitude);
        _isLoading = false;
      });
      _addCurrentLocationMarker();
    } catch (e) {
      print('Error getting location: $e');
      setState(() => _isLoading = false);
    }
  }

  void _addCurrentLocationMarker() {
    if (_currentLocation == null) return;
    
    setState(() {
      _markers.add(
        Marker(
          markerId: const MarkerId('current_location'),
          position: _currentLocation!,
          icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueBlue),
        ),
      );
    });
  }

  void _onLocationSelected(LatLng location, bool isDestination) {
    setState(() {
      if (isDestination) {
        _destinationLocation = location;
        _markers.add(
          Marker(
            markerId: const MarkerId('destination'),
            position: location,
            icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
          ),
        );
      } else {
        _pickupLocation = location;
        _markers.add(
          Marker(
            markerId: const MarkerId('pickup'),
            position: location,
            icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen),
          ),
        );
      }
      _showLocationList = false;
    });

    if (_pickupLocation != null && _destinationLocation != null) {
      _showRideBottomSheet();
    }
  }

  void _showRideBottomSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => RideBottomSheet(
        pickup: _pickupLocation!,
        destination: _destinationLocation!,
        onRequest: _onRideRequested,
      ),
    );
  }

  void _onRideRequested() {
    // TODO: Implement ride request
    print('Ride requested');
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      body: Stack(
        children: [
          GoogleMap(
            initialCameraPosition: CameraPosition(
              target: _currentLocation ?? const LatLng(0, 0),
              zoom: 15,
            ),
            onMapCreated: (GoogleMapController controller) {
              _controller.complete(controller);
            },
            markers: _markers,
            polylines: _polylines,
            myLocationEnabled: true,
            myLocationButtonEnabled: false,
            zoomControlsEnabled: false,
            onTap: (LatLng location) {
              if (_showLocationList) {
                setState(() => _showLocationList = false);
              }
            },
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  LocationSearchBox(
                    onFocus: () => setState(() => _showLocationList = true),
                    onLocationSelected: (location) => 
                        _onLocationSelected(location, _pickupLocation == null),
                  ),
                  if (_showLocationList)
                    Expanded(
                      child: Card(
                        margin: const EdgeInsets.only(top: 8),
                        child: ListView(
                          children: [
                            ListTile(
                              leading: const Icon(Icons.location_on),
                              title: const Text('Current Location'),
                              onTap: () {
                                if (_currentLocation != null) {
                                  _onLocationSelected(_currentLocation!, _pickupLocation == null);
                                }
                              },
                            ),
                            // Add more suggested locations here
                          ],
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