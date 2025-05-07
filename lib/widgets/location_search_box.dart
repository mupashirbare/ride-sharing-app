import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class LocationSearchBox extends StatefulWidget {
  final Function() onFocus;
  final Function(LatLng) onLocationSelected;

  const LocationSearchBox({
    super.key,
    required this.onFocus,
    required this.onLocationSelected,
  });

  @override
  State<LocationSearchBox> createState() => _LocationSearchBoxState();
}

class _LocationSearchBoxState extends State<LocationSearchBox> {
  final _searchController = TextEditingController();
  bool _isFocused = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.3),
            spreadRadius: 2,
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Focus(
        onFocusChange: (focused) {
          setState(() => _isFocused = focused);
          if (focused) {
            widget.onFocus();
          }
        },
        child: TextField(
          controller: _searchController,
          decoration: InputDecoration(
            hintText: 'Where are you going?',
            prefixIcon: const Icon(Icons.search, color: Colors.grey),
            suffixIcon: _isFocused && _searchController.text.isNotEmpty
                ? IconButton(
                    icon: const Icon(Icons.clear, color: Colors.grey),
                    onPressed: () {
                      _searchController.clear();
                      setState(() {});
                    },
                  )
                : null,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: BorderSide.none,
            ),
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 14,
            ),
          ),
          onChanged: (value) {
            // TODO: Implement location search/autocomplete
            setState(() {});
          },
        ),
      ),
    );
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
} 