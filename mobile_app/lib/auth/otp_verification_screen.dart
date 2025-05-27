import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:pin_code_fields/pin_code_fields.dart';
import '../../routes/app_routes.dart';
import 'package:get_storage/get_storage.dart';

class OtpVerificationScreen extends StatelessWidget {
  final String phoneNumber;
  final TextEditingController otpController = TextEditingController();

  OtpVerificationScreen({super.key, required this.phoneNumber});

  // ✅ Function to verify OTP with backend
  Future<void> verifyOtp(String phone, String otp) async {
    final url = Uri.parse("http://10.0.2.2:5000/api/auth/verify-otp");

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({"phone": phone, "otp": otp}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final token = data['token'];
        final user = data['user'];

        // ✅ If name is missing → go to register screen
        if (user['name'] == null || user['name'].toString().isEmpty) {
          Get.offAllNamed(AppRoutes.register, arguments: {"token": token});
          return;
        }

        // ✅ Else, save token + user
        final storage = GetStorage();
        storage.write("token", token);
        storage.write("user", user);

        // ✅ Navigate based on user type
        if (user['isDriver'] == true || user['userType'] == 'driver') {
          Get.offAllNamed(AppRoutes.driverHome);
        } else {
          Get.offAllNamed(AppRoutes.home);
        }
      } else {
        final error = jsonDecode(response.body);
        Get.snackbar("Verification Failed", error["error"] ?? "Invalid OTP");
      }
    } catch (e) {
      Get.snackbar("Error", "Failed to connect to server");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: () => Get.back(),
              ),

              const SizedBox(height: 16),
              const Text(
                "Enter the code",
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              Text(
                "An SMS code was sent to $phoneNumber",
                style: TextStyle(color: Colors.grey[700]),
              ),
              const SizedBox(height: 24),

              // OTP input
              PinCodeTextField(
                length: 4,
                appContext: context,
                controller: otpController,
                keyboardType: TextInputType.number,
                animationType: AnimationType.fade,
                pinTheme: PinTheme(
                  shape: PinCodeFieldShape.box,
                  borderRadius: BorderRadius.circular(8),
                  fieldHeight: 55,
                  fieldWidth: 55,
                  activeFillColor: Colors.white,
                  selectedColor: Colors.green,
                  selectedFillColor: Colors.white,
                  inactiveColor: Colors.grey.shade300,
                  inactiveFillColor: Colors.white,
                  activeColor: Colors.green,
                ),
                animationDuration: const Duration(milliseconds: 300),
                enableActiveFill: true,
                onCompleted: (value) {},
                onChanged: (value) {},
              ),

              const SizedBox(height: 12),

              TextButton(
                onPressed: () {
                  Get.snackbar("Code resent", "A new SMS code was sent.");
                  // TODO: Trigger resend OTP API if needed
                },
                child: const Text(
                  "Resend Code",
                  style: TextStyle(
                    color: Colors.green,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),

              const Spacer(),

              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: () {
                    final otp = otpController.text.trim();
                    if (otp.length == 4) {
                      verifyOtp(phoneNumber, otp); // 🔁 Call backend
                    } else {
                      Get.snackbar("Invalid", "Please enter a 4-digit code");
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                  ),
                  child: const Text(
                    "Verify",
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
