import 'dart:async';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';

const String kGoogleMapApiKey = 'AIzaSyCE8udSg8rr4M9OC52tOFJSZ7JBoZ_QT60';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  GoogleMapController? _mapController;
  final Set<Marker> _markers = {};
  final Set<Polyline> _polylines = {};
  final List<LatLng> polylineCoordinates = [];
  final PolylinePoints polylinePoints = PolylinePoints();

  // ✅ Default to Mogadishu, Somalia
  LatLng _initialPosition = const LatLng(2.0469, 45.3182);

  final LatLng _destination = const LatLng(2.0283688, 45.311019); // KM4
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _setInitialLocation();
  }

  Future<void> _setInitialLocation() async {
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        await Geolocator.openLocationSettings();
        return;
      }

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied ||
            permission == LocationPermission.deniedForever) {
          return;
        }
      }

      Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );

      _initialPosition = LatLng(position.latitude, position.longitude);

      _addMarker(_initialPosition, "You are here", BitmapDescriptor.hueBlue);
      _addMarker(_destination, "KM4 Roundabout", BitmapDescriptor.hueRed);

      await _drawPolyline(from: _initialPosition, to: _destination);

      setState(() {
        _isLoading = false;
      });

      _mapController?.animateCamera(
        CameraUpdate.newLatLngZoom(_initialPosition, 14),
      );
    } catch (e) {
      print("Location error: $e");
      setState(() => _isLoading = false);
    }
  }

  Future<void> _drawPolyline({required LatLng from, required LatLng to}) async {
    polylineCoordinates.clear();
    _polylines.clear();

    try {
      PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
        googleApiKey: kGoogleMapApiKey,
        request: PolylineRequest(
          origin: PointLatLng(from.latitude, from.longitude),
          destination: PointLatLng(to.latitude, to.longitude),
          mode: TravelMode.driving,
        ),
      );

      if (result.points.isNotEmpty) {
        for (var point in result.points) {
          polylineCoordinates.add(LatLng(point.latitude, point.longitude));
        }

        setState(() {
          _polylines.add(
            Polyline(
              polylineId: const PolylineId("route"),
              points: polylineCoordinates,
              color: Colors.blue,
              width: 5,
            ),
          );
        });
      } else {
        print("Polyline error: ${result.errorMessage}");
      }
    } catch (e) {
      print("Polyline fetch failed: $e");
    }
  }

  void _addMarker(LatLng position, String title, double hue) {
    _markers.add(
      Marker(
        markerId: MarkerId(title),
        position: position,
        icon: BitmapDescriptor.defaultMarkerWithHue(hue),
        infoWindow: InfoWindow(title: title),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      body: GoogleMap(
        initialCameraPosition: CameraPosition(
          target: _initialPosition,
          zoom: 15,
        ),
        onMapCreated: (controller) {
          _mapController = controller;
        },
        markers: _markers,
        polylines: _polylines,
        myLocationEnabled: true,
        myLocationButtonEnabled: true,
      ),
    );
  }
}
