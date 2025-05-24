import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class LocationSearchBox extends StatefulWidget {
  final Function(String label, double lat, double lon) onSelected;

  const LocationSearchBox({super.key, required this.onSelected});

  @override
  State<LocationSearchBox> createState() => _LocationSearchBoxState();
}

class _LocationSearchBoxState extends State<LocationSearchBox> {
  final TextEditingController _controller = TextEditingController();
  List<dynamic> _results = [];
  bool _loading = false;

  Future<void> searchLocation(String query) async {
    if (query.length < 3) {
      setState(() => _results.clear());
      return;
    }

    setState(() => _loading = true);

    final url = Uri.parse(
      'https://nominatim.openstreetmap.org/search?q=$query&format=json&limit=5&countrycodes=so',
    );
    final response = await http.get(
      url,
      headers: {'User-Agent': 'Flutter App (Somalia Ride-Sharing App)'},
    );

    if (response.statusCode == 200) {
      setState(() {
        _results = json.decode(response.body);
        _loading = false;
      });
    } else {
      setState(() {
        _results.clear();
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Material(
          elevation: 4,
          borderRadius: BorderRadius.circular(12),
          child: TextField(
            controller: _controller,
            onChanged: searchLocation,
            decoration: const InputDecoration(
              hintText: 'Where are you going?',
              prefixIcon: Icon(Icons.search),
              border: InputBorder.none,
              contentPadding: EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 14,
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        if (_loading)
          const Padding(
            padding: EdgeInsets.all(8.0),
            child: CircularProgressIndicator(),
          ),
        ..._results.map((place) {
          return ListTile(
            leading: const Icon(Icons.location_on),
            title: Text(place['display_name']),
            onTap: () {
              widget.onSelected(
                place['display_name'],
                double.parse(place['lat']),
                double.parse(place['lon']),
              );
              setState(() {
                _results.clear();
                _controller.clear();
              });
            },
          );
        }),
      ],
    );
  }
}
