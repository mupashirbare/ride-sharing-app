import 'dart:math';

import 'package:get/get.dart';
import 'package:mobile_app/auth/login_screen.dart';
import 'package:mobile_app/driver/arriving.dart';
import 'package:mobile_app/driver/end_trip.dart';
import 'package:mobile_app/driver/fare_collection.dart';
import 'package:mobile_app/driver/home.dart';
import 'package:mobile_app/driver/request_detail.dart';
import 'package:mobile_app/driver/starting_trip.dart';
import 'package:mobile_app/views/onboarding/splash_screen.dart';
import 'package:mobile_app/views/onboarding/welcome_screen.dart';
import 'package:mobile_app/views/home/home_screen.dart';
import '../bindings/home_binding.dart';

abstract class AppRoutes {
  static const String splash = '/';
  static const String welcome = '/welcome';
  static const String login = '/login';
  static const String otpverify = '/verifyPhone';
  static const String home = '/home';
  static const String driverHome = '/driverHome';
  static const String requestDetail ="/request_detail";
  static const String arriving ="/arriving";
  static const String startTrip ="/startTrip";
  static const String endTrip ="/endTrip";
  static const String fareCollection ="/fareCollection";



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
    // GetPage(
    //   name: login,
    //   page: () => const LoginScreen(),
    //   transition: Transition.fadeIn,
    // ),
    // GetPage(
    //   name: otpverify,
    //   page: () => const (),
    //   transition: Transition.fadeIn,
    // ),
    GetPage(
      name: home,
      page: () => const HomeScreen(),
      binding: HomeBinding(), // Optional: only if you're using GetX bindings
      transition: Transition.fadeIn,
    ),
    GetPage(
      name: driverHome,
      page: () => const DriverHome(),
      transition: Transition.fadeIn,
    ),
    GetPage(
      name: requestDetail,
      page: () => const RideDetailScreen(),
      transition: Transition.fadeIn,
    ),
    GetPage(
      name: arriving,
      page: () => const Arriving(),
      transition: Transition.fadeIn,
    ),
    GetPage(
      name: startTrip,
      page: () => const StartTripScreen(),
      transition: Transition.fadeIn,
    ),
    GetPage(
      name: endTrip,
      page: () => const EndTripScreen(),
      transition: Transition.fadeIn,
    ),
    GetPage(
      name: fareCollection,
      page: () => const FareCollectionScreen(),
      transition: Transition.fadeIn,
    ),
  ];
}
