// lib/routes/app_pages.dart
import 'package:get/get.dart';
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
    // Other routes...
  ];
}
