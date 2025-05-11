import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class LocationSearchWidget extends StatefulWidget {
  final Function(String label, double lat, double lon) onSelected;

  const LocationSearchWidget({super.key, required this.onSelected});

  @override
  State<LocationSearchWidget> createState() => _LocationSearchWidgetState();
}

class _LocationSearchWidgetState extends State<LocationSearchWidget> {
  final TextEditingController _controller = TextEditingController();
  List<Map<String, dynamic>> _suggestions = [];

  Future<void> fetchSuggestions(String input) async {
    if (input.isEmpty) {
      setState(() => _suggestions = []);
      return;
    }

    final url = Uri.parse(
      'https://nominatim.openstreetmap.org/search?q=$input&format=json&addressdetails=1&limit=5&countrycodes=so',
    );

    final response = await http.get(
      url,
      headers: {'User-Agent': 'safarx-app/1.0 (contact@example.com)'},
    );

    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      setState(() {
        _suggestions =
            data
                .map<Map<String, dynamic>>(
                  (e) => {
                    'display': e['display_name'],
                    'lat': double.parse(e['lat']),
                    'lon': double.parse(e['lon']),
                  },
                )
                .toList();
      });
    } else {
      setState(() => _suggestions = []);
    }
  }

  void selectLocation(Map<String, dynamic> place) {
    widget.onSelected(place['display'], place['lat'], place['lon']);
    _controller.clear();
    setState(() => _suggestions = []);
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
            onChanged: fetchSuggestions,
            decoration: const InputDecoration(
              prefixIcon: Icon(Icons.search),
              hintText: 'Where are you going?',
              contentPadding: EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 14,
              ),
              border: InputBorder.none,
            ),
          ),
        ),
        if (_suggestions.isNotEmpty)
          Container(
            margin: const EdgeInsets.only(top: 6),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(10),
              boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 5)],
            ),
            child: ListView.builder(
              itemCount: _suggestions.length,
              shrinkWrap: true,
              itemBuilder: (context, index) {
                final place = _suggestions[index];
                return ListTile(
                  leading: const Icon(Icons.location_on),
                  title: Text(place['display']),
                  onTap: () => selectLocation(place),
                );
              },
            ),
          ),
      ],
    );
  }
}
