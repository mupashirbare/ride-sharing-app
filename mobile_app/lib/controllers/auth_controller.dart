import 'package:http/http.dart' as http;
import 'dart:convert'; // ✅ required for jsonEncode and jsonDecode
import 'package:get/get.dart';
import 'package:country_picker/country_picker.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';
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

  void signInWithGoogle() async {
    final GoogleSignIn googleSignIn = GoogleSignIn();
    try {
      final result = await googleSignIn.signIn();
      if (result != null) {
        final googleAuth = await result.authentication;
        final idToken = googleAuth.idToken;

        final response = await http.post(
          Uri.parse("http://your-api-url.com/api/auth/google-login"),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({'idToken': idToken}),
        );

        print("Status: ${response.statusCode}");
        print("Body: ${response.body}");

        if (response.statusCode == 200) {
          try {
            final data = jsonDecode(response.body);
            final box = GetStorage();
            box.write('token', data['token']);
            box.write('user', data['user']);
            Get.snackbar("Success", "Welcome ${data['user']['name']}");
          } catch (e) {
            Get.snackbar("Error", "Invalid JSON response");
          }
        } else {
          Get.snackbar("Login Failed", "Status: ${response.statusCode}");
        }
      }
    } catch (e) {
      Get.snackbar("Error", e.toString());
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
