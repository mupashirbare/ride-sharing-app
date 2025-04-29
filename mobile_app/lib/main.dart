// lib/main.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter/services.dart';
import 'routes/app_routes.dart';
import 'routes/app_pages.dart';
import 'services/location_service.dart';
import 'controllers/home_controller.dart'; // <--- Important to add

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Set preferred orientations
  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);

  // Initialize essential controllers
  Get.put(LocationService(), permanent: true);
  Get.put(HomeController(), permanent: true); // <-- ADD this line ✅

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'SafarX',
      initialRoute: AppRoutes.splash,
      getPages: AppPages.pages, // <-- YOU FORGOT: Use AppPages.pages ✅
      defaultTransition: Transition.fadeIn,
      theme: ThemeData(
        primaryColor: const Color(0xFF0B3D2E),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0B3D2E),
          primary: const Color(0xFF0B3D2E),
          secondary: Colors.green,
        ),
        scaffoldBackgroundColor: Colors.white,
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          elevation: 0,
          systemOverlayStyle: SystemUiOverlayStyle.dark,
          iconTheme: IconThemeData(color: Colors.black),
          titleTextStyle: TextStyle(
            color: Colors.black,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF0B3D2E),
            foregroundColor: Colors.white,
            elevation: 0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          ),
        ),
        bottomSheetTheme: const BottomSheetThemeData(
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
          ),
        ),
      ),
    );
  }
}
