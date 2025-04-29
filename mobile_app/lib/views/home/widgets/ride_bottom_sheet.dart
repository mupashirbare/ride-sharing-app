// // lib/views/home/widgets/ride_bottom_sheet.dart
// import 'package:flutter/material.dart';
// import 'package:get/get.dart';
// import '../../../controllers/home_controller.dart';

// class RideBottomSheet extends GetView<HomeController> {
//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       decoration: const BoxDecoration(
//         color: Colors.white,
//         borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
//         boxShadow: [
//           BoxShadow(color: Colors.black12, blurRadius: 10, spreadRadius: 2),
//         ],
//       ),
//       child: Column(
//         mainAxisSize: MainAxisSize.min,
//         children: [
//           const SizedBox(height: 12),
//           Container(
//             width: 40,
//             height: 4,
//             decoration: BoxDecoration(
//               color: Colors.grey[300],
//               borderRadius: BorderRadius.circular(2),
//             ),
//           ),
//           const SizedBox(height: 20),
//           Obx(() {
//             if (controller.pickupLocation.value == null) {
//               return const Padding(
//                 padding: EdgeInsets.all(16),
//                 child: Text(
//                   'Select your pickup location',
//                   style: TextStyle(fontSize: 16),
//                 ),
//               );
//             }

//             return Padding(
//               padding: const EdgeInsets.all(16),
//               child: Column(
//                 crossAxisAlignment: CrossAxisAlignment.stretch,
//                 children: [
//                   // Locations
//                   LocationItem(
//                     icon: Icons.my_location,
//                     title: 'Pickup',
//                     address: controller.pickupAddress.value,
//                   ),
//                   if (controller.dropoffLocation.value != null) ...[
//                     const SizedBox(height: 12),
//                     LocationItem(
//                       icon: Icons.location_on,
//                       title: 'Dropoff',
//                       address: controller.dropoffAddress.value,
//                     ),
//                   ],

//                   const SizedBox(height: 20),

//                   // Request Ride Button
//                   ElevatedButton(
//                     onPressed:
//                         controller.isSearchingDriver.value
//                             ? null
//                             : controller.requestRide,
//                     style: ElevatedButton.styleFrom(
//                       backgroundColor: Colors.green,
//                       padding: const EdgeInsets.symmetric(vertical: 16),
//                       shape: RoundedRectangleBorder(
//                         borderRadius: BorderRadius.circular(8),
//                       ),
//                     ),
//                     child:
//                         controller.isSearchingDriver.value
//                             ? const CircularProgressIndicator(
//                               color: Colors.white,
//                             )
//                             : const Text(
//                               'Request Ride',
//                               style: TextStyle(fontSize: 16),
//                             ),
//                   ),
//                 ],
//               ),
//             );
//           }),
//           const SizedBox(height: 16),
//         ],
//       ),
//     );
//   }
// }

// class LocationItem extends StatelessWidget {
//   final IconData icon;
//   final String title;
//   final String address;

//   const LocationItem({
//     Key? key,
//     required this.icon,
//     required this.title,
//     required this.address,
//   }) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     return Row(
//       children: [
//         Icon(icon, color: Colors.grey),
//         const SizedBox(width: 12),
//         Expanded(
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.start,
//             children: [
//               Text(
//                 title,
//                 style: const TextStyle(color: Colors.grey, fontSize: 12),
//               ),
//               const SizedBox(height: 4),
//               Text(
//                 address,
//                 style: const TextStyle(fontSize: 16),
//                 maxLines: 1,
//                 overflow: TextOverflow.ellipsis,
//               ),
//             ],
//           ),
//         ),
//       ],
//     );
//   }
// }
