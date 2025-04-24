// import 'package:flutter/material.dart';
// import 'package:get/get.dart';
// import 'get_started_screen.dart';

// class OnboardingScreen extends StatefulWidget {
//   const OnboardingScreen({super.key});

//   @override
//   State<OnboardingScreen> createState() => _OnboardingScreenState();
// }

// class _OnboardingScreenState extends State<OnboardingScreen> {
//   final PageController _pageController = PageController();
//   int _currentPage = 0;

//   final List<String> onboardingImages = [
//     'image/ChatGPT Image Apr 3, 2025, 03_37_56 PM.png',
//     'image/ChatGPT Image Apr 3, 2025, 03_43_15 PM.png',
//     'image/Apr 3, 2025, 08_36_56 PM.png',
//   ];

//   void _onPageChanged(int index) {
//     setState(() {
//       _currentPage = index;
//     });

//     if (index == onboardingImages.length - 1) {
//       // Delay going to GetStarted screen
//       Future.delayed(const Duration(seconds: 2), () {
//         Get.off(() => const GetStartedScreen());
//       });
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Colors.white,
//       body: Stack(
//         alignment: Alignment.bottomCenter,
//         children: [
//           PageView.builder(
//             controller: _pageController,
//             itemCount: onboardingImages.length,
//             onPageChanged: _onPageChanged,
//             itemBuilder: (context, index) {
//               return Center(
//                 child: Image.asset(
//                   onboardingImages[index],
//                   width: MediaQuery.of(context).size.width * 0.85,
//                 ),
//               );
//             },
//           ),
//           // Page indicator dots
//           Positioned(
//             bottom: 40,
//             child: Row(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: List.generate(onboardingImages.length, (index) {
//                 return AnimatedContainer(
//                   duration: const Duration(milliseconds: 300),
//                   margin: const EdgeInsets.symmetric(horizontal: 4),
//                   height: 10,
//                   width: _currentPage == index ? 12 : 8,
//                   decoration: BoxDecoration(
//                     shape: BoxShape.circle,
//                     color:
//                         _currentPage == index
//                             ? const Color(0xFF0B3D2E)
//                             : Colors.grey.shade300,
//                   ),
//                 );
//               }),
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }
