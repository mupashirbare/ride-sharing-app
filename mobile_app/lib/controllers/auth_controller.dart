import 'package:http/http.dart' as http;
import 'dart:convert'; // ✅ required for jsonEncode and jsonDecode
import 'package:get/get.dart';
import 'package:country_picker/country_picker.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:mobile_app/routes/app_routes.dart';
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';
import '../constant.dart';
import 'package:get_storage/get_storage.dart'; // if using local storage

class AuthController extends GetxController {
  var selectedCountry =
      Country(
        phoneCode: '252',
        countryCode: 'SO',
        e164Sc: 0,
        geographic: true,
        level: 1,
        name: 'Somalia',
        example: '612345678',
        displayName: 'Somalia',
        displayNameNoCountryCode: 'SO',
        e164Key: '',
      ).obs;

  var phoneNumber = ''.obs;

  void setPhoneNumber(String value) {
    phoneNumber.value = value;
  }

 Future<void> signInWithGoogle() async {
  final GoogleSignIn googleSignIn = GoogleSignIn(
    serverClientId: kGoogleClientId,
  );

  try {
    final result = await googleSignIn.signIn();
    if (result == null) {
      Get.snackbar("Cancelled", "Google Sign-In was cancelled.");
      return;
    }

    final googleAuth = await result.authentication;
    final idToken = googleAuth.idToken;

    if (idToken == null) {
      Get.snackbar("Error", "Google ID Token is null.");
      return;
    }

    final response = await http.post(
      Uri.parse("http://10.0.2.2:5000/api/auth/google-login"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'idToken': idToken}),
    );

    print('Backend Response: ${response.statusCode} ${response.body}');

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final box = GetStorage();
      box.write('token', data['token']);
      box.write('user', data['user']);

      Get.snackbar("Welcome", "Hi ${data['user']['name']}");
      Get.offAllNamed(AppRoutes.home);
    } else {
      Get.snackbar("Login Failed", "Server error: ${response.statusCode}");
    }
  } catch (e) {
    if (e.toString().contains('SocketException')) {
      Get.snackbar("Server Unreachable", "Backend server is not running.");
    } else {
      Get.snackbar("Error", e.toString());
    }
    print("Google Sign-In Error: $e");
  }
}

  void signInWithFacebook() async {
    try {
      final LoginResult result = await FacebookAuth.instance.login();
      if (result.status == LoginStatus.success) {
        final userData = await FacebookAuth.instance.getUserData();
        Get.snackbar("Success", "Signed in as ${userData['name']}");
      } else {
        Get.snackbar("Failed", result.message ?? "Something went wrong");
      }
    } catch (e) {
      Get.snackbar("Error", e.toString());
    }
  }
}
