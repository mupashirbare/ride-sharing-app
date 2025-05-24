// lib/routes/app_pages.dart
import 'package:get/get.dart';
import 'package:mobile_app/driver/arriving.dart';
import 'package:mobile_app/driver/end_trip.dart';
import 'package:mobile_app/driver/fare_collection.dart';
import 'package:mobile_app/driver/home.dart';
import 'package:mobile_app/driver/request_detail.dart';
import 'package:mobile_app/driver/starting_trip.dart';
import '../views/onboarding/splash_screen.dart';
import '../views/onboarding/welcome_screen.dart'; // Add this import
import '../views/home/home_screen.dart';
import '../controllers/home_controller.dart';
import 'app_routes.dart';

class AppPages {
  static final pages = [
    GetPage(name: AppRoutes.splash, page: () => const SplashScreen()),
    GetPage(name: AppRoutes.welcome, page: () => const WelcomeScreen()),
    GetPage(
      name: AppRoutes.home,
      page: () => HomeScreen(),
      binding: BindingsBuilder(() {
        Get.put(HomeController());
      }),
    ),
    GetPage(name: AppRoutes.driverHome, page: () => const DriverHome()),
    GetPage(name: AppRoutes.requestDetail, page: () => const RideDetailScreen()),
    GetPage(name: AppRoutes.arriving, page: () => const Arriving()),
    GetPage(name: AppRoutes.startTrip, page: () => const StartTripScreen()),
    GetPage(name: AppRoutes.endTrip, page: () => const EndTripScreen()),
    GetPage(name: AppRoutes.fareCollection, page: () => const FareCollectionScreen()),

    // Other routes...
  ];
}
