// lib/views/onboarding/welcome_screen.dart
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:get/get.dart'; // Add this import
import '../../routes/app_routes.dart'; // Add this import

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  final PageController _pageController = PageController();
  int _currentIndex = 0;
  Timer? _autoSlideTimer;

  final List<String> images = [
    'image/ChatGPT Image Apr 3, 2025, 03_37_56 PM.png',
    'image/ChatGPT Image Apr 3, 2025, 03_43_15 PM.png',
    'image/track.png',
  ];

  void _startAutoSlide() {
    _autoSlideTimer = Timer.periodic(const Duration(seconds: 4), (timer) {
      if (_currentIndex < images.length - 1) {
        setState(() {
          _currentIndex++;
        });
        _pageController.animateToPage(
          _currentIndex,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
        );
      } else {
        _autoSlideTimer?.cancel(); // Stop auto sliding on last image
      }
    });
  }

  @override
  void initState() {
    super.initState();
    _startAutoSlide();
  }

  @override
  void dispose() {
    _pageController.dispose();
    _autoSlideTimer?.cancel();
    super.dispose();
  }

  void _navigateToHome() {
    // Using Get.offAllNamed to remove all previous routes from the stack
    // This ensures user can't go back to welcome screen using back button
    Get.offAllNamed(AppRoutes.home);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          // PageView
          PageView.builder(
            controller: _pageController,
            itemCount: images.length,
            onPageChanged: (index) {
              setState(() => _currentIndex = index);
            },
            itemBuilder: (context, index) {
              return Stack(
                children: [
                  Center(
                    child: Image.asset(
                      images[index],
                      width: MediaQuery.of(context).size.width * 0.85,
                      fit: BoxFit.contain,
                    ),
                  ),

                  // Show Get Started only on last image
                  if (index == images.length - 1)
                    Positioned(
                      bottom: 80,
                      left: 24,
                      right: 24,
                      child: ElevatedButton(
                        onPressed:
                            _navigateToHome, // Updated to use navigation function
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF0B3D2E),
                          minimumSize: const Size(double.infinity, 50),
                        ),
                        child: const Text(
                          "Get Started",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                ],
              );
            },
          ),

          // Skip button (top right)
          if (_currentIndex < images.length - 1)
            Positioned(
              top: 40,
              right: 20,
              child: ElevatedButton(
                onPressed: () {
                  _pageController.jumpToPage(images.length - 1);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF0B3D2E),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 20,
                    vertical: 10,
                  ),
                ),
                child: const Text(
                  "Skip",
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),

          // Dot indicators (bottom)
          Positioned(
            bottom: 40,
            left: 0,
            right: 0,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(images.length, (index) {
                return AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  height: 10,
                  width: _currentIndex == index ? 12 : 8,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color:
                        _currentIndex == index
                            ? const Color(0xFF0B3D2E)
                            : Colors.grey.shade300,
                  ),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }
}
