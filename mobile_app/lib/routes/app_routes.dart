// lib/routes/app_routes.dart
import 'package:get/get.dart';
import 'package:mobile_app/auth/login_screen.dart';
import '../bindings/home_binding.dart';
import '../views/home/home_screen.dart'; // <-- Correct import
import '../views/onboarding/splash_screen.dart';
import '../views/onboarding/welcome_screen.dart';
abstract class AppRoutes {
  static const String splash = '/';
  static const String welcome = '/welcome';
  static const String login = '/login';
  static const String signup = '/signup';
  static const String otp = '/otp';
  static const String home = '/home';
  static const String locationSearch = '/location-search';
  static const String rideHistory = '/ride-history';
  static const String profile = '/profile';
  static const String menu = '/menu';
  static const String notifications = '/notifications';

  static final routes = <GetPage>[
    GetPage(
      name: splash,
      page: () => const SplashScreen(),
      transition: Transition.fadeIn,
    ),
    GetPage(
      name: welcome,
      page: () => const WelcomeScreen(),
      transition: Transition.fadeIn,
    ),
     GetPage(
        name: login,
        page: () => LoginScreen(), // 👈 Add this
        transition: Transition.rightToLeft,
      ),
    GetPage(
      name: home,
      page: () => const HomeScreen(), // <-- Correct: HomeScreen not HomeView
      binding: HomeBinding(),
      transition: Transition.fadeIn,
    ),
    // Other routes...
  ];
}
