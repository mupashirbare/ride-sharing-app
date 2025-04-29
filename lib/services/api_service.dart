import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiService {
  static final String baseUrl = dotenv.env['API_URL'] ?? 'http://localhost:5000/api';
  static String? _token;

  static void setToken(String token) {
    _token = token;
  }

  static Map<String, String> get _headers {
    return {
      'Content-Type': 'application/json',
      if (_token != null) 'Authorization': 'Bearer $_token',
    };
  }

  // Auth endpoints
  static Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: _headers,
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      _token = data['token'];
      return data;
    }
    throw _handleError(response);
  }

  static Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
    required String phone,
    required String role,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: _headers,
      body: jsonEncode({
        'name': name,
        'email': email,
        'password': password,
        'phone': phone,
        'role': role,
      }),
    );

    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    }
    throw _handleError(response);
  }

  // Ride endpoints
  static Future<Map<String, dynamic>> requestRide({
    required Map<String, double> pickup,
    required Map<String, double> destination,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/rides'),
      headers: _headers,
      body: jsonEncode({
        'pickup': pickup,
        'destination': destination,
      }),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw _handleError(response);
  }

  static Future<List<Map<String, dynamic>>> getNearbyDrivers(
    double latitude,
    double longitude,
  ) async {
    final response = await http.get(
      Uri.parse(
        '$baseUrl/drivers/nearby?latitude=$latitude&longitude=$longitude',
      ),
      headers: _headers,
    );

    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.cast<Map<String, dynamic>>();
    }
    throw _handleError(response);
  }

  static Future<Map<String, dynamic>> updateRideStatus(
    String rideId,
    String status,
  ) async {
    final response = await http.put(
      Uri.parse('$baseUrl/rides/$rideId/status'),
      headers: _headers,
      body: jsonEncode({'status': status}),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw _handleError(response);
  }

  // Profile endpoints
  static Future<Map<String, dynamic>> updateProfile(Map<String, dynamic> data) async {
    final response = await http.put(
      Uri.parse('$baseUrl/users/profile'),
      headers: _headers,
      body: jsonEncode(data),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw _handleError(response);
  }

  static Future<Map<String, dynamic>> getUserProfile() async {
    final response = await http.get(
      Uri.parse('$baseUrl/users/profile'),
      headers: _headers,
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw _handleError(response);
  }

  // Error handling
  static Exception _handleError(http.Response response) {
    try {
      final error = jsonDecode(response.body);
      return Exception(error['message'] ?? 'Unknown error occurred');
    } catch (e) {
      return Exception('Failed to process request');
    }
  }
} 