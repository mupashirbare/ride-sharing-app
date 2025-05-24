import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:country_picker/country_picker.dart';
import 'package:http/http.dart' as http;

import '../controllers/auth_controller.dart';
import 'package:mobile_app/routes/app_routes.dart';
import '../views/home/widgets/custom_button.dart';

class LoginScreen extends StatelessWidget {
  final AuthController authController = Get.put(AuthController());

  LoginScreen({super.key});

  // ✅ Send OTP API Call
  Future<void> sendOtp(String fullPhoneNumber) async {
    final url = Uri.parse("http://10.0.2.2:5000/api/auth/send-otp"); //server api

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({"phone": fullPhoneNumber}),
      );

      if (response.statusCode == 200) {
        Get.toNamed(AppRoutes.otpverify, arguments: {"phone": fullPhoneNumber});
      } else {
        final error = jsonDecode(response.body);
        Get.snackbar("Error", error["error"] ?? "Failed to send OTP");
      }
    } catch (e) {
      Get.snackbar("Network Error", "Could not connect to server");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      extendBodyBehindAppBar: true,
      body: Stack(
        clipBehavior: Clip.none,
        children: [
          // 🎨 Decorative Circles
          Positioned(
            top: -40,
            right: -30,
            child: Container(
              height: 160,
              width: 160,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                color: Color.fromARGB(255, 122, 166, 149),
              ),
            ),
          ),
          Positioned(
            top: -20,
            right: -20,
            child: Container(
              height: 130,
              width: 130,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                color: Color(0xFF24815E),
              ),
            ),
          ),

          SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(height: 35),
                  Image.asset(
                    'image/Blue and White Modern Illustrative Car Rent Logo (1).png',
                    height: 220,
                  ),
                  const Text(
                    "Enter your number",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 24),

                  // 📞 Phone Input
                  Obx(
                    () => Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(12),
                        color: const Color(0xFFF5F5F5),
                      ),
                      child: Row(
                        children: [
                          GestureDetector(
                            onTap: () {
                              showCountryPicker(
                                context: context,
                                onSelect: (Country country) {
                                  authController.selectedCountry.value = country;
                                },
                              );
                            },
                            child: Row(
                              children: [
                                Text(
                                  authController.selectedCountry.value.flagEmoji,
                                  style: const TextStyle(fontSize: 18),
                                ),
                                const SizedBox(width: 4),
                                Text('+${authController.selectedCountry.value.phoneCode}'),
                                const Icon(Icons.arrow_drop_down),
                              ],
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: TextField(
                              onChanged: authController.setPhoneNumber,
                              keyboardType: TextInputType.phone,
                              decoration: const InputDecoration(
                                border: InputBorder.none,
                                hintText: 'Phone number',
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 34),

                  // ✅ Continue Button
                  ElevatedButton(
                    onPressed: () {
                      final phone = authController.phoneNumber.value;
                      final code = authController.selectedCountry.value.phoneCode;

                      if (phone.isNotEmpty) {
                        final fullPhone = "$code$phone"; // ➕ Combine
                        sendOtp(fullPhone);
                      } else {
                        Get.snackbar("Invalid", "Please enter your phone number");
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF0C8A4B),
                      minimumSize: const Size.fromHeight(50),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30),
                      ),
                    ),
                    child: const Text("Continue", style: TextStyle(color: Colors.white)),
                  ),

                  const SizedBox(height: 34),

                  // OR Divider
                  Row(
                    children: const [
                      Expanded(child: Divider(thickness: 1)),
                      Padding(
                        padding: EdgeInsets.symmetric(horizontal: 8.0),
                        child: Text("OR"),
                      ),
                      Expanded(child: Divider(thickness: 1)),
                    ],
                  ),

                  const SizedBox(height: 34),

                  // 🌐 Google Sign-In
                  CustomButton(
                    iconWidget: Image.asset('image/google.png', height: 24),
                    text: "Sign in with Google",
                    onTap: authController.signInWithGoogle,
                  ),

                  const SizedBox(height: 12),

                  // 📘 Facebook Sign-In
                  CustomButton(
                    iconData: Icons.facebook,
                    text: "Sign in with Facebook",
                    onTap: authController.signInWithFacebook,
                  ),

                  const SizedBox(height: 16),

                  // Terms
                  Text.rich(
                    TextSpan(
                      text: "By signing up, you agree to our ",
                      children: [
                        TextSpan(
                          text: "Terms & Conditions",
                          style: TextStyle(
                            decoration: TextDecoration.underline,
                            color: Colors.blueAccent,
                          ),
                        ),
                        const TextSpan(text: ", acknowledge our "),
                        TextSpan(
                          text: "Privacy Policy",
                          style: TextStyle(
                            decoration: TextDecoration.underline,
                            color: Colors.blueAccent,
                          ),
                        ),
                        const TextSpan(text: ", and confirm you're over 18."),
                      ],
                    ),
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
