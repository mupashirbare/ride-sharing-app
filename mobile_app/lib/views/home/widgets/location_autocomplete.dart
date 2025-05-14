// import 'package:flutter/material.dart';
// import 'package:google_place/google_place.dart';

// class LocationAutocomplete extends StatefulWidget {
//   final Function(String description, double lat, double lng) onLocationSelected;

//   const LocationAutocomplete({super.key, required this.onLocationSelected});

//   @override
//   State<LocationAutocomplete> createState() => _LocationAutocompleteState();
// }

// class _LocationAutocompleteState extends State<LocationAutocomplete> {
//   late GooglePlace googlePlace;
//   List<AutocompletePrediction> predictions = [];

//   final searchController = TextEditingController();

//   @override
//   void initState() {
//     super.initState();
//     googlePlace = GooglePlace("YOUR_GOOGLE_API_KEY"); // Replace with actual key
//   }

//   void autoCompleteSearch(String value) async {
//     if (value.isNotEmpty) {
//       final result = await googlePlace.autocomplete.get(value);
//       if (result != null && result.predictions != null) {
//         setState(() => predictions = result.predictions!);
//       }
//     } else {
//       setState(() => predictions = []);
//     }
//   }

//   void getPlaceDetails(String placeId) async {
//     final result = await googlePlace.details.get(placeId);
//     if (result != null && result.result != null && result.result!.geometry != null) {
//       final location = result.result!.geometry!.location!;
//       widget.onLocationSelected(
//         result.result!.formattedAddress ?? "Selected",
//         location.lat!,
//         location.lng!,
//       );
//       setState(() => predictions.clear());
//       searchController.clear();
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       children: [
//         Material(
//           elevation: 4,
//           borderRadius: BorderRadius.circular(12),
//           child: TextField(
//             controller: searchController,
//             decoration: const InputDecoration(
//               hintText: 'Search location...',
//               prefixIcon: Icon(Icons.search),
//               border: InputBorder.none,
//               contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
//             ),
//             onChanged: autoCompleteSearch,
//           ),
//         ),
//         const SizedBox(height: 8),
//         ...predictions.map((p) => ListTile(
//               leading: const Icon(Icons.location_on),
