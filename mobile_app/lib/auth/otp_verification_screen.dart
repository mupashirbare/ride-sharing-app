import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:pin_code_fields/pin_code_fields.dart';
import '../../routes/app_routes.dart';

class OtpVerificationScreen extends StatelessWidget {
  final String phoneNumber;
  final TextEditingController otpController = TextEditingController();

  OtpVerificationScreen({super.key, required this.phoneNumber});

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
              // Back button
              IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: () => Get.back(),
              ),

              const SizedBox(height: 16),
              const Text(
                "Enter the code",
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
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
                onCompleted: (value) {
                  // Optional: auto-verify on full entry
                },
                onChanged: (value) {},
              ),

              const SizedBox(height: 12),

              // Resend Code
              TextButton(
                onPressed: () {
                  // TODO: Trigger resend API
                  Get.snackbar("Code resent", "A new SMS code was sent.");
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

              // Verify Button
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: () {
                    final otp = otpController.text.trim();
                    if (otp.length == 4) {
                      // TODO: Verify the OTP via API
                      Get.offAllNamed(AppRoutes.home);
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
