import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:country_picker/country_picker.dart';
import '../../../controllers/auth_controller.dart';
import '../views/home/widgets/custom_button.dart';
import '../views/widgets/top_circles.dart';

class LoginScreen extends StatelessWidget {
  final AuthController authController = Get.put(AuthController());

  LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        clipBehavior: Clip.none,
        children: [
          // ✅ Background Circles
          const TopCircles(),

          // 📱 Foreground Content
          SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(height: 35),

                  // 🚗 Logo
                  Image.asset(
                    'image/Blue and White Modern Illustrative Car Rent Logo (1).png',
                    height: 220,
                  ),

                  const SizedBox(height: 16),
                  const Text(
                    "Enter your number",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),

                  const SizedBox(height: 24),

                  // 📞 Phone Number Input
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
                                  authController.selectedCountry.value =
                                      country;
                                },
                              );
                            },
                            child: Row(
                              children: [
                                Text(
                                  authController
                                      .selectedCountry
                                      .value
                                      .flagEmoji,
                                  style: const TextStyle(fontSize: 18),
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  '+${authController.selectedCountry.value.phoneCode}',
                                ),
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

                  // Divider
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

                  const SizedBox(height: 60),

                  // 📝 Terms & Privacy
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
