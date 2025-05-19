import 'package:get/get.dart';
import 'package:mobile_app/views/onboarding/splash_screen.dart';
import 'package:mobile_app/views/onboarding/welcome_screen.dart';
import 'package:mobile_app/views/home/home_screen.dart';
import 'package:mobile_app/auth/login_screen.dart';
import 'package:mobile_app/auth/otp_verification_screen.dart';
import '../bindings/home_binding.dart';

abstract class AppRoutes {
  static const String splash = '/';
  static const String welcome = '/welcome';
  static const String login = '/login';
  static const String otpverify = '/verifyPhone';
  static const String home = '/home';

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
      page: () => LoginScreen(), // ✅ Register login page
      transition: Transition.fadeIn,
    ),
    GetPage(
    name: otpverify, // ✅ Add this
    page: () => OtpVerificationScreen(phoneNumber: '+252612000000'), // temp number
    transition: Transition.fadeIn,
  ),
    GetPage(
      name: home,
      page: () => const HomeScreen(),
      binding: HomeBinding(), // Optional: only if you're using GetX bindings
      transition: Transition.fadeIn,
    ),
  ];
}
